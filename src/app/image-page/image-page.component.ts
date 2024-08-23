import { Component } from '@angular/core';
import { BottleDataService } from '../bottle-data.service';

@Component({
  selector: 'app-image-page',
  templateUrl: './image-page.component.html',
  styleUrls: ['./image-page.component.css']
})
export class ImagePageComponent {
  http: any;
  totalBottles: any;
  scannedBottles: any;
  selectedFile: any;
  uploadUrl: any;
  successMessage: string | undefined;
  errorMessage: string | undefined;
  brandName: String | undefined;
  quantity: String | undefined; 


  constructor(private bottleDataService: BottleDataService) {}

  ngOnInit(): void {
    this.totalBottles = this.bottleDataService.getTotalBottles();
    this.brandName  = this.bottleDataService.getBrandName();
    this.quantity = this.bottleDataService.getQuantity();
    // this.fetchBackendImage();
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
    debugger
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
          this.onUpload();
    }
  }

  // Upload the file
  onUpload(): void {
    debugger
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

    this.fetchBackendImage();
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

  fetchBackendImage(): void {
    this.http.get('/api/latest_image', { responseType: 'blob' }).subscribe((blob: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.backendImageSrc = reader.result;
      };
      reader.readAsDataURL(blob);
    }, (error: any) => {
      console.error('Error fetching last image', error);
    });
  }

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

  

}
