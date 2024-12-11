import { Component, OnInit } from '@angular/core';
import { Food } from '../shared/models/Food';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-food-page',
  standalone: true,
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css'], // Fix typo from styleUrl to styleUrls
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  formattedOrigins: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    // Load foods and ensure they're available before accessing them
    this.foodService.loadFoods().subscribe(() => {
      this.activatedRoute.params.subscribe(params => {
        if (params['id']) {
          this.food = this.foodService.getFoodById(+params['id']);
          this.formattedOrigins = this.foodService.formatOrigin(
            this.food.origins.join(' ')
          ); // Format origins
          console.log('Formatted Origins:', this.formattedOrigins); // Debug log
        }
      });
    });
  }
}
