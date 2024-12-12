import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Food } from '../../shared/models/Food';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Food[] = [];
  private cartItemsSubject = new BehaviorSubject<Food[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  addToCart(food: Food): void {
    this.cartItems.push(food);
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }

  getCartItems(): Food[] {
    return [...this.cartItems];
  }

  removeFromCart(foodId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== foodId);
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }
}
