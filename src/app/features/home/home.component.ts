import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Category } from '../../core/models/category.model';
import { Product } from '../../core/models/product.model';

import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';

import { getProductImage } from '../../shared/utils/product-image.util';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly categoryService = inject(CategoryService);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  getProductImage = getProductImage;

  categories: Category[] = [];
  products: Product[] = [];


  ngOnInit(): void {
    this.loadCategories()
    this.loadProducts()
  }

  private loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories: ', error)
      }
    })
  }

  private loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error loading products: ', error)
      }
    })
  }

  addToCart(product: Product): void {
    this.cartService.addProduct(product);
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    image.onerror = null;
    image.src = 'images/placeholder.jpg'
  }

  getDevelopmentImage(categoryName: string): string {
    switch (categoryName.toLowerCase()) {
      case 'brownies':
        return 'images/brownie.jpg';

      case 'muffins':
        return 'images/muffin.jpg';

      case 'pasteles':
        return 'images/pastel.jpg';

      default:
        return 'images/placeholder.jpg';
    }
  }
}
