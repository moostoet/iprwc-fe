import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ShopItem {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShopItemService {
  private authUrl = 'http://localhost:8080/api/shopitems';

  constructor(private http: HttpClient) {}

  getShopItems(): Observable<ShopItem[]> {
    return this.http.get<ShopItem[]>(`${this.authUrl}`);
  }

  getShopItemById(id: number): Observable<ShopItem> {
    return this.http.get<ShopItem>(`${this.authUrl}/${id}`, { withCredentials: true });
  }
}