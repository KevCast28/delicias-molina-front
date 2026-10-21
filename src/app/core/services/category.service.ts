import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { Category, CategoryRequest } from "../models/category.model";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/categories`;

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`)
  }

  create(category: CategoryRequest): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category)
  }

  update(id: number, category: CategoryRequest): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}

