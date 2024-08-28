import { Component } from '@angular/core';
import { BottleDataService } from '../bottle-data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { WebcamImage } from 'ngx-webcam';



@Injectable({
  providedIn: 'root',
})



@Component({
  selector: 'app-image-page',
  templateUrl: './image-page.component.html',
  styleUrls: ['./image-page.component.css']
})
export class ImagePageComponent {

  totalBottles: any;
  scannedBottles: any;
  selectedFile: any;
  uploadUrl: any;
  successMessage: string | undefined;
  errorMessage: string | undefined;
  brandName: String | undefined;
  quantity: String | undefined; 
  lastIndex!: Number;
  videoRef: any;


  constructor(private bottleDataService: BottleDataService,private http: HttpClient) {}
   

  ngOnInit(): void {
    this.totalBottles = this.bottleDataService.getTotalBottles();
    this.brandName  = this.bottleDataService.getBrandName();
    this.quantity = this.bottleDataService.getQuantity();
    // this.fetchBackendImage();

    this.videoRef = document.getElementById('video-cam');
    this.setUpCamera();
    console.log(this.videoRef)
  }


  setUpCamera(){
    navigator.mediaDevices.getUserMedia({
      video:{width:300 , height:300},
      audio:false
    }).then(stram=>{
      this.videoRef.srcObject = stram;
      console.log(stram)
      
    })
  }


  
  imageSrc: string | ArrayBuffer | null = null; // To store the image source
  backendImageSrc: string | ArrayBuffer | null = null;

  // onFileSelected(event: any): void {
  //   const file = event.target.files[0]; // Get the selected file
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.imageSrc = e.target.result; // Set image source
  //       // Optionally, store the file path or name
  //       console.log('File Path:', file.name);
  //     };
  //     reader.readAsDataURL(file); // Convert file to base64
  //   }
  // }



  onFileSelected(event: any): void {
    // debugger
    const file = event.target.files[0];
    
    
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageSrc = e.target.result; // Set image source
            // Optionally, store the file path or name
            console.log('File Path:', file.name);
          };
          reader.readAsDataURL(file); // Convert file to 
          // this.onUpload();
          console.log(this.http)
      const data = {
        "file": file
      }
      const formData = new FormData();
      formData.append('file', file, file.name);

       // Create form data to send the file
       // Send the file to the backend
       this.http.post('http://127.0.0.1:5000/readQRs', formData).subscribe(
         (response: any) => {
            let uri = 'data:application/octet-stream;base64,' + response.image;

            const base64Data = response.image; // Your Base64 image data
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/png' });

            const downloadLink = document.createElement("a");
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = file.name; // Use file.name to name the downloaded file
            downloadLink.click();
            this.backendImageSrc = uri;

            // Clean up after download
            URL.revokeObjectURL(url);

           console.log('QR Code Data:', response);
           
           
          this.totalBottles = response.data[0].Bottles;
          var len = response.data.length
          this.scannedBottles = len;
           // Log total bottles and last indices
           console.log('Total Bottles:', this.totalBottles);
           console.log('Last Indices of Data:', this.lastIndex);
         },
         (error: any) => {
           console.error('Error:', error);
         }
       );
    }
  }

  // Upload the file
  onUpload(): void {
    // debugger
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post(this.uploadUrl, formData).subscribe(
        (response: any) => {
          console.log('Image uploaded successfully', response);
          this.successMessage = 'Image uploaded successfully';
        },
        (error: any) => {
          console.error('Image upload failed', error);
          // Handle error response here
          this.errorMessage = "Image upload failed";
        }
      );
    }

    // this.fetchBackendImage();
  }



  // fetchBackendImage(): void {
  //   // Replace with your backend image URL
  //   const backendImageUrl = 'https://example.com/path/to/your/image.jpg';
    
  //   this.http.get(backendImageUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.backendImageSrc = reader.result;
  //     };
  //     reader.readAsDataURL(blob);
  //   }, (error: any) => {
  //     console.error('Error fetching backend image', error);
  //   });
  // }

  // fetchBackendImage(): void {

  //   this.backendImageSrc = "C:/Users/lenovo/Desktop/integrationpy/IntegrationSoftware/IntegrationSoftware/annotated_image.png"

  //   // this.http.get('/api/latest_image', { responseType: 'blob' }).subscribe((blob: Blob) => {
  //   //   const reader = new FileReader();
  //   //   reader.onload = () => {
  //   //     this.backendImageSrc = reader.result;
  //   //   };
  //   //   reader.readAsDataURL(blob);
  //   // }, (error: any) => {
  //   //   console.error('Error fetching last image', error);
  //   // });
  // }

  fetchBottleCounts(): void {
    // Replace with your backend API URL to get bottle counts
    const bottleCountsUrl = 'https://example.com/api/bottle-counts';

    this.http.get(bottleCountsUrl).subscribe((data: any) => {
      this.totalBottles = data.totalBottles;
      this.scannedBottles = data.scannedBottles;
    }, (error: any) => {
      console.error('Error fetching bottle counts', error);
    });
  }

  rescan(){}
  reset(): void {
    this.imageSrc = null;
    this.backendImageSrc = null;
    this.totalBottles = null;
    this.scannedBottles = null;
    this.selectedFile = null;
    this.backendImageSrc=null;
    
  }




  
  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  btnLabel: string = 'Capture image';

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  snapshot(event: WebcamImage) {
    console.log(event);
    this.previewImage = event.imageAsDataUrl;
    
    this.btnLabel = 'Re capture image'
  }
  checkPermissions() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 500,
        height: 500
      }
    }).then((res) => {
      console.log("response", res);
      this.stream = res;
      this.status = 'My camera is accessing';
      this.btnLabel = 'Capture image';
    }).catch(err => {
      console.log(err);
      if(err?.message === 'Permission denied') {
        this.status = 'Permission denied please try again by approving the access';
      } else {
        this.status = 'You may not having camera system, Please try again ...';
      }
    })
  }

  captureImage() {
    this.trigger.next();
  }

  proceed() {
    console.log(this.previewImage);
  }


  

}
