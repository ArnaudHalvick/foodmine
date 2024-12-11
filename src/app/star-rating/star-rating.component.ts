import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  @Input() value = 0; // Current rating value
  @Input() totalStars = 5; // Total number of stars
  @Input() readonly = false; // If true, stars are not clickable
  @Output() rate = new EventEmitter<number>(); // Emits the new rating value

  // Generate an array of stars based on `totalStars`
  get starsArray() {
    return Array(this.totalStars).fill(0);
  }

  // Emit the rating value if the component is not readonly
  onRate(starIndex: number) {
    if (!this.readonly) {
      this.value = starIndex;
      this.rate.emit(this.value);
    }
  }
}
