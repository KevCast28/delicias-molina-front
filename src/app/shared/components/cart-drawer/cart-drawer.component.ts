import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/product.model';
import { getProductImage } from '../../utils/product-image.util';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss'
})
export class CartDrawerComponent {

  private readonly cartService = inject(CartService);

  readonly items = this.cartService.items;
  readonly totalItems = this.cartService.totalItems;
  readonly totalPrice = this.cartService.totalPrice;
  readonly closed = output<void>();

  getProductImage = getProductImage;

  increaseQuantity(product: Product): void {
    this.cartService.addProduct(product);
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  removeProduct(productId: number): void {
    this.cartService.removeProduct(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  close(): void {
    this.closed.emit();
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    image.onerror = null;
    image.src = 'images/placeholder.jpg';
  }

}
