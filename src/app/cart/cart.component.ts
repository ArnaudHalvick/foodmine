import { Component, OnInit } from '@angular/core';

import { Food } from '../shared/models/Food';
import { CartService } from '../services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Food[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  removeItem(foodId: number): void {
    this.cartService.removeFromCart(foodId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
