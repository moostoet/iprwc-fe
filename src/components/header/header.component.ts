import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import "primeicons/primeicons.css";
import { MenuItem } from 'primeng/api';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CartResponse, CartService } from '../../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [ButtonModule, MenuModule, CommonModule, RouterLink, OverlayBadgeModule]
})
export class HeaderComponent implements OnInit {
  cartItems = signal<CartResponse | null>(null);

  items = computed<MenuItem[]>(() => {
    const cItems = this.cartItems();

    const menuItems = cItems?.items.map(item => ({
      label: item.itemName || `Product ${item.id}`,
      price: item.totalPrice,
      quantity: item.quantity,
      itemId: item.id
    }));

    return [{
      label: 'Your Shopping Cart',
      items: menuItems
    }];
  });

  totalCost = computed(() => {
    let total = 0;
    const currentItems = this.items();
    currentItems.forEach(group => {
      if (group.items) {
        group.items.forEach(item => {
          total += item['price'] || 0;
        });
      }
    });
    return total;
  });

  cartService = inject(CartService);
  authService = inject(AuthService);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(
      cartData => {
        if (cartData) {
          this.cartItems.set(cartData);
        }
      }
    );

    this.cartService.getCart().subscribe();
  }

  getTotalItemsCount(): number {
    let count = 0;
    const cItems = this.cartItems()?.items || [];
    cItems.forEach(item => {
      count += item.quantity;
    });
    return count;
  }
  incrementQuantity(event: Event, item: any): void {
    event.stopPropagation();

    this.cartService.updateItemQuantity(item.itemId, item.quantity + 1).subscribe(
      updatedCart => this.cartItems.set(updatedCart)
    );
  }

  decrementQuantity(event: Event, item: any): void {
    event.stopPropagation();

    if (item.quantity > 1) {
      this.cartService.updateItemQuantity(item.itemId, item.quantity - 1).subscribe(
        updatedCart => this.cartItems.set(updatedCart)
      );
    } else {
      this.removeItem(event, item);
    }
  }

  removeItem(event: Event, item: any): void {
    event.stopPropagation();

    this.cartService.removeItem(item.itemId).subscribe(
      updatedCart => this.cartItems.set(updatedCart)
    );
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.currentUser$.next(null);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Logout failed', err);
        this.router.navigate(['/']);
      }
    });
  }
}