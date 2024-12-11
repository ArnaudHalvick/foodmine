import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../shared/models/Tag';
import { FoodService } from '../services/food/food.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tags',
  imports: [RouterModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
})
export class TagsComponent implements OnInit {
  @Input() tags: Tag[] = [];

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.tags = this.foodService.getAllTags();
  }
}
