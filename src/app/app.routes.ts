import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/public-layout/public-layout.component').then(
        (m) => m.PublicLayoutComponent,
      ),

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'menu',
        loadComponent: () =>
          import('./features/menu/menu.component').then((m) => m.MenuComponent),
      },
      {
        path: 'custom-order',
        loadComponent: () =>
          import('./features/custom-order/custom-order.component').then(
            (m) => m.CustomOrderComponent,
          ),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then(
            (m) => m.CheckoutComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
