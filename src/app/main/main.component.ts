import { Component } from '@angular/core';
import { ImagePageComponent } from '../image-page/image-page.component';  
import { Router } from '@angular/router';
import { BottleDataService } from '../bottle-data.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {


  tableData = [
    { sno: 1, masterId: 1234, brandName: 'Brand A', quantity: '500 ml', type: 'Type1', number: '48' },
    { sno: 2, masterId: 5678, brandName: 'Brand B', quantity: '750 ml', type: 'Type2', number: '50' }
  ];
  totalBottles = 0;
  
  constructor(private route:Router , private bottleDataService: BottleDataService) {}

  ngOnInit(): void {
    
  }

  selectedRow: any = null; // To store the selected row

  selectRow(row: any) {
    this.selectedRow = row; // Set the selected row
    this.totalBottles = row.number;
    this.bottleDataService.setTotalBottles(row.number);
  }

  navigatetoImagePage(){
    this.route.navigate(['/image-page']);
  }

 
}