import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { environment } from '../../environments/environment';
import { Product, ProductRequest } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/products`;

    getAll(): Observable<Product[]> {
      return this.http.get<Product[]>(this.apiUrl);
    }

    getById(id: number): Observable<Product> {
      return this.http.get<Product>(`${this.apiUrl}/${id}`)
    }

    create(product: ProductRequest): Observable<Product> {
      return this.http.post<Product>(this.apiUrl, product);
    }

    update(id: number, product: ProductRequest): Observable<Product> {
      return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
    }

    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
}
