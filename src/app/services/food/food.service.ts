import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../../shared/models/Food';
import { Tag } from '../../shared/models/Tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private foods: Food[] = [];

  constructor(private http: HttpClient) {}

  loadFoods(): Observable<Food[]> {
    return this.http.get<Food[]>('/assets/foods.json').pipe(
      map(foods => {
        this.foods = foods;
        return foods;
      })
    );
  }

  getFoodById(id: number): Food {
    return this.getAll().find(food => food.id === id)!;
  }

  getAllTags(): Tag[] {
    const tagCounts: { [key: string]: number } = {};

    this.foods.forEach(food => {
      food.tags?.forEach(tag => {
        tagCounts[tag.toLowerCase()] = (tagCounts[tag.toLowerCase()] || 0) + 1;
      });
    });

    const tags: Tag[] = Object.entries(tagCounts).map(([tag, count]) => ({
      name: tag,
      count,
    }));

    tags.unshift({ name: 'all', count: this.foods.length });

    return tags;
  }

  getAllFoodsByTag(tag: string): Food[] {
    return tag.toLowerCase() === 'all'
      ? this.foods
      : this.foods.filter(food =>
          food.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
        );
  }

  getAllFoodsBySearchTerm(searchTerm: string): Food[] {
    return this.foods.filter(food =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getAll(): Food[] {
    return this.foods;
  }

  formatOrigin(origin: string): string {
    return origin
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
