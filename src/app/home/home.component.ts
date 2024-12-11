import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/Food';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StarRatingComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foods = this.foodService.getAll();
  }

  onRate(newRating: number, food: Food) {
    console.log(`New rating for ${food.name}: ${newRating}`);
    food.stars = newRating; // Update the rating in the data model
  }
}
