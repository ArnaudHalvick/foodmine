import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  foods: string[] = [];

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foods = this.foodService.getAll();
  }
}
