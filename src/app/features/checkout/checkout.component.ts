import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { CartService } from '../../core/services/cart.service';
import { Order, OrderRequest } from '../../core/models/order.model';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);

  readonly items = this.cartService.items;
  readonly totalItems = this.cartService.totalItems;
  readonly totalPrice = this.cartService.totalPrice;

  readonly isCartEmpty = computed(() => this.items().length === 0);

  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);
  readonly createdOrder = signal<Order | null>(null);

  readonly today = this.getLocalDate();

  orderPreview: OrderRequest | null = null;

  // VALIDADOR DE FECHA
  private deliveryDateValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const selectedDate = control.value as string;

    if (!selectedDate) {
      return null;
    }

    const today = this.getLocalDate();

    if (selectedDate < today) {
      return { pastDate: true };
    }

    return null;
  }

  // FORMULARIO
  readonly checkoutForm = this.fb.nonNullable.group({
    clientName: ['', [Validators.required, Validators.maxLength(80)]],

    telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],

    deliveryDate: [
      '',
      [
        Validators.required,
        (control: AbstractControl): ValidationErrors | null =>
          this.deliveryDateValidator(control)
      ],
    ],

    comments: ['', [Validators.maxLength(500)]],
  });

  constructor() {
    this.checkoutForm.valueChanges.subscribe(() => {
      if (!this.createdOrder()) {
        this.orderPreview = null;
        this.submitError.set(null);
      }
    });
  }

  // FECHA LOCAL
  private getLocalDate(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  get controls() {
    return this.checkoutForm.controls;
  }

  // REVISAR PEDIDO
  reviewOrder(): void {
    if (this.isSubmitting() || this.createdOrder()) {
      return;
    }

    this.orderPreview = null;
    this.submitError.set(null);

    if (this.isCartEmpty()) {
      return;
    }

    // Revalidar la fecha por si cambió el día
    this.controls.deliveryDate.updateValueAndValidity();

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const form = this.checkoutForm.getRawValue();

    this.orderPreview = {
      clientName: form.clientName.trim(),
      telephone: form.telephone,
      orderType: 'STANDARD',
      deliveryDate: form.deliveryDate,
      comments: form.comments.trim() || null,
      items: this.items().map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };
  }

  // EDITAR PEDIDO
  editOrder(): void {
    if (this.isSubmitting() || this.createdOrder()) return;

    this.orderPreview = null;
    this.submitError.set(null);
  }

  confirmOrder(): void {
    if (
      this.isSubmitting() ||
      this.createdOrder() ||
      !this.orderPreview ||
      this.isCartEmpty()
    ) {
      return;
    }

    this.controls.deliveryDate.updateValueAndValidity({
      emitEvent: false,
    });

    if (this.checkoutForm.invalid) {
      this.orderPreview = null;
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const request = this.orderPreview;

    console.log('PEDIDO ANTES DE ENVIAR: ', request);
    console.log('JSON DEL PEDIDO: ', JSON.stringify(request));

    this.isSubmitting.set(true);
    this.submitError.set(null);

    this.orderService.createOrder(request)
      .pipe(
        finalize(() => this.isSubmitting.set(false))
      )
      .subscribe({
        next: (order) => {
          this.createdOrder.set(order);
          this.orderPreview = null;
          this.cartService.clearCart();
        },
        error: (error) => {
          console.error('Error creating order: ', error);

          this.submitError.set(
            'No pudimos confirmar el resultado del pedido. ' +
            'Verifica con Delicias Molina antes de intentar nuevamente'
          );
        }
      });
  }
}
