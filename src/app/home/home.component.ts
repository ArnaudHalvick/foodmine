import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/Food';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { TagsComponent } from '../tags/tags.component';
import { Tag } from '../shared/models/Tag';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StarRatingComponent, SearchComponent, TagsComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  tags: Tag[] = [];

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.foodService.loadFoods().subscribe(foods => {
      this.foods = foods;
      this.tags = this.foodService.getAllTags(); // Populate tags after foods are loaded

      this.route.params.subscribe(params => {
        const searchTerm = params['searchTerm'];
        const tag = params['tag'];

        if (searchTerm) {
          this.foods = this.foodService.getAllFoodsBySearchTerm(searchTerm);
        } else if (tag) {
          this.foods = this.foodService.getAllFoodsByTag(tag);
        }
      });
    });
  }

  onRate(newRating: number, food: Food) {
    food.stars = newRating;
  }

  formatOrigin(origin: string): string {
    return this.foodService.formatOrigin(origin);
  }
}
