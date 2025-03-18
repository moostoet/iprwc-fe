import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopItem, ShopItemService } from '../../../service/shopitem.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../../service/cart.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-item-display',
  templateUrl: './display.component.html',
  imports: [CommonModule, DataViewModule, TagModule, ButtonModule, Toast],
  providers: [ShopItemService, MessageService]
})
export class DisplayComponent implements OnInit {
  items = signal<ShopItem[]>([]);

  itemService = inject(ShopItemService);
  cartService = inject(CartService);
  authService = inject(AuthService);

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.itemService.getShopItems().subscribe(
      items => this.items.set(items)
    )
  }

  addToCart(product: ShopItem) {
    console.log("adding to cart...: ", product)
    this.cartService.addToCart({ productId: product.id, quantity: 1 })
      .subscribe({
        next: (response) => {
          if (!response) {
            this.messageService.add({
              severity: 'error',
              summary: 'Something went wrong',
              detail: 'There might not be enough stock. Please try again later.',
              key: 'br',
              life: 3000
            });
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Success!',
              detail: 'Item was successfully added to cart.',
              key: 'br',
              life: 3000
            });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err?.error?.message || 'An error occurred while adding the item to cart.',
            key: 'br',
            life: 3000
          });
        }
      });
  }
}