import { Injectable, computed, signal } from "@angular/core";
import { Product } from "../models/product.model";
import { CartItem } from "../models/cart.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();

  readonly totalItems = computed (() =>
    this._items().reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  readonly totalPrice = computed(() =>
    this._items().reduce(
      (total, item) =>
      total + item.product.basePrice * item.quantity,
      0
    )
  );

  addProduct(product: Product): void {
    const currentItems = this._items();

    const existingItems = currentItems.find(
      item => item.product.id === product.id
    );

    if (existingItems) {
      this._items.update(items =>
        items.map(item =>
          item.product.id === product.id ? {
            ...item,
            quantity: item.quantity + 1
          }
          : item
        )
      );
      return;
    }
    this._items.update(items => [
      ...items,
      {
        product,
        quantity: 1
      }
    ]);
  }

  decreaseQuantity(productId: number): void {
    const item = this._items().find(
      item => item.product.id === productId
    );

    if (!item) {
      return;
    }

    if (item.quantity === 1) {
      this.removeProduct(productId);
      return;
    }

    this._items.update(items =>
      items.map(item =>
        item.product.id === productId
        ? {
          ...item,
          quantity: item.quantity - 1
        }
        : item
      )
    );
  }

  removeProduct(productId: number): void {
    this._items.update(items =>
      items.filter(item => item.product.id !== productId)
    );
  }

  clearCart(): void {
    this._items.set([]);
  }
}
