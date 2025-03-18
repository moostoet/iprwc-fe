import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // For ngModel two-way binding
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ShopItem, ShopItemRequest, ShopItemService } from '../../../service/shopitem.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { DataViewModule } from 'primeng/dataview';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, FormsModule, ButtonModule, Dialog, InputTextModule, Toast, DataViewModule],
  providers: [MessageService],
})
export class DashboardComponent implements OnInit {
  items = signal<ShopItem[]>([]);

  createVisible: boolean = false;
  manageVisible: boolean = false;
  uploadedFiles: any[] = [];

  newName: string = '';
  newPrice: number = 0;
  newStock: number = 0;
  newImage: string = '';

  itemService = inject(ShopItemService);

  constructor(private shopItemService: ShopItemService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.itemService.getShopItems().subscribe(
      items => this.items.set(items)
    )
  }

  showCreateDialog() {
    this.createVisible = true;
  }

  showManageDialog() {
    this.manageVisible = true;
  }

  createNewProduct() {

    const newProduct: ShopItemRequest = {
      name: this.newName,
      price: this.newPrice,
      stock: this.newStock,
      image: this.newImage,
    };

    console.log("newProduct: ", newProduct)

    this.shopItemService.createShopItem(newProduct)
      .subscribe({
        next: (data) => {
          console.log('Product created successfully:', data);

          this.messageService.add({
            severity: 'success',
            summary: 'Success!',
            detail: 'Product was successfully created.',
            key: 'br',
            life: 3000
          });

          this.items.update(items => [...items, data]);

          this.resetForm();
        },
        error: (error) => {

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.message || 'An error occurred while creating the product.',
            key: 'br',
            life: 3000
          });
        }
      });

    this.createVisible = false;
  }

  deleteProduct(item: ShopItem) {

    this.shopItemService.deleteShopItem(item.id)
      .subscribe({
        next: (data) => {
          console.log('Product deleted successfully:', data);

          this.messageService.add({
            severity: 'success',
            summary: 'Success!',
            detail: 'Product was successfully deleted.',
            key: 'br',
            life: 3000
          });

          this.items.update(items => items.filter(i => i.id !== item.id));

          this.resetForm();
        },
        error: (error) => {

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.message || 'An error occurred while deleting the product.',
            key: 'br',
            life: 3000
          });
        }
      });
  }

  resetForm() {
    this.newName = '';
    this.newPrice = 0;
    this.newStock = 0;
    this.newImage = '';
  }
}