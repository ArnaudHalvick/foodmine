import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  getAll(): string[] {
    const images: string[] = [];
    for (let i = 1; i <= 6; i++) {
      images.push(`/foods/food-${i}.jpg`);
    }
    return images;
  }
}
