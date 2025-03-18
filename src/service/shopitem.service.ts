import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface ShopItemRequest {
  name: string;
  price: number;
  stock: number;
  image: string;
}

export interface ShopItem {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShopItemService {
  private authUrl = `${environment.apiUrl}/api/shopitems`;

  constructor(private http: HttpClient) {}

  getShopItems(): Observable<ShopItem[]> {
    return this.http.get<ShopItem[]>(`${this.authUrl}`);
  }

  getShopItemById(id: number): Observable<ShopItem> {
    return this.http.get<ShopItem>(`${this.authUrl}/${id}`, { withCredentials: true });
  }

  createShopItem(shopItem: ShopItemRequest): Observable<ShopItem> {
    return this.http.post<ShopItem>(`${this.authUrl}`, shopItem, { withCredentials: true });
  }

  deleteShopItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.authUrl}/${id}`, { withCredentials: true });
  }
}