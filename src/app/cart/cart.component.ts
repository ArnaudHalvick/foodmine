import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { CartItem } from '../shared/models/cartIem';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  updateQuantity(foodId: number, quantity: number): void {
    this.cartService.updateQuantity(foodId, quantity);
    this.calculateTotalPrice();
  }

  removeItem(foodId: number): void {
    this.cartService.removeFromCart(foodId);
    this.calculateTotalPrice();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }
}
