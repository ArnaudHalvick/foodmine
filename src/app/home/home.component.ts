import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/Food';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { TagsComponent } from "../tags/tags.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StarRatingComponent, SearchComponent, TagsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const searchTerm = params['searchTerm']; // Access using bracket notation
      if (searchTerm) {
        this.foods = this.foodService
          .getAll()
          .filter(food =>
            food.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
      } else if (params['tag']) {
        this.foods = this.foodService.getAllFoodsByTag(params['tag']);
      } else {
        this.foods = this.foodService.getAll(); // Default behavior
      }
    });
  }

  onRate(newRating: number, food: Food) {
    console.log(`New rating for ${food.name}: ${newRating}`);
    food.stars = newRating; // Update the rating in the data model
  }

  formatOrigin(origin: string): string {
    return origin
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
