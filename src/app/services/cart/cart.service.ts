import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Food } from '../../shared/models/Food';

interface CartItem {
  food: Food;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  addToCart(food: Food): void {
    const existingItem = this.cartItems.find(item => item.food.id === food.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ food, quantity: 1 });
    }
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }

  updateQuantity(foodId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.food.id === foodId);
    if (item) {
      item.quantity = quantity > 0 ? quantity : 1; // Ensure quantity is at least 1
    }
    this.cartItemsSubject.next([...this.cartItems]);
  }

  removeFromCart(foodId: number): void {
    this.cartItems = this.cartItems.filter(item => item.food.id !== foodId);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next([...this.cartItems]);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.food.price * item.quantity,
      0
    );
  }
}
