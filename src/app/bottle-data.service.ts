// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class BottleDataService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BottleDataService {
  private totalBottles: number = 0;

  setTotalBottles(count: number): void {
    this.totalBottles = count;
  }

  getTotalBottles(): number {
    return this.totalBottles;
  }
}
