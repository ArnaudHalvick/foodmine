import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from '../shared/models/Food';
import { FoodService } from '../services/food/food.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [StarRatingComponent],
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css'],
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  formattedOrigins: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.foodService.loadFoods().subscribe(() => {
      this.activatedRoute.params.subscribe(params => {
        if (params['id']) {
          this.food = this.foodService.getFoodById(+params['id']);
          this.formattedOrigins = this.foodService.formatOrigin(
            this.food.origins.join(' ')
          );
        }
      });
    });
  }

  onRate(newRating: number): void {
    console.log(`New rating for ${this.food.name}: ${newRating}`);
    this.food.stars = newRating; // Update rating
  }

  toggleFavorite(): void {
    this.food.favorite = !this.food.favorite;
    console.log(`${this.food.name} favorite status: ${this.food.favorite}`);
  }
}
