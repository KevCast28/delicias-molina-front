import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { Order, OrderRequest } from "../models/order.model";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/orders`

  createOrder(orderRequest: OrderRequest): Observable<Order> {
    console.log('ORDER SERVICE RECIBE: ', orderRequest);

    return this.http.post<Order>(
      this.apiUrl,
      orderRequest
    );
  }
}
