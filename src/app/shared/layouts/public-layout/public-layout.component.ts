import { Component, Host, HostListener, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartDrawerComponent } from '../../components/cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    CartDrawerComponent
  ],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss'
})
export class PublicLayoutComponent {

  private readonly document = inject(DOCUMENT);

  isCartOpen = false;

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isCartOpen) {
      this.closeCart();
    }
  }

  openCart(): void {
    this.isCartOpen = true;
    this.document.body.style.overflow = 'hidden';
  }

  closeCart(): void {
    this.isCartOpen = false;
    this.document.body.style.overflow = '';
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }
}
