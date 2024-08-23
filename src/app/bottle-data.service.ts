

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BottleDataService {
  private totalBottles: number = 0;
  private quantity: String = '';
  private brandName: String = '';

  setTotalBottles(count: number, quantity: String, brandName: String): void {
    this.totalBottles = count;
    this.brandName= brandName;
    this.quantity = quantity;
  }

  getTotalBottles(): number {
    return this.totalBottles;
  }
  getBrandName(): String {
    return this.brandName;
  }
  getQuantity(): String {
    return this.quantity;
  }

}
