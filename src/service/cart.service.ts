import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface CartItemRequest {
  productId: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  shopItemId: number;
  itemName: string;
  totalPrice: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CartResponse {
  id: number;
  user: User;
  items: CartItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';

  private cartSubject = new BehaviorSubject<CartResponse | null>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getCart().subscribe();
  }


  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(this.apiUrl, { withCredentials: true }).pipe(
      tap(cart => {
        // Update the shared state when we get new data
        this.cartSubject.next(cart);
      })
    );
  }

  addToCart(request: CartItemRequest): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.apiUrl}/items`, request, { withCredentials: true }).pipe(
      tap(cart => {
        // Update the shared state when adding an item
        this.cartSubject.next(cart);
      })
    );
  }

  updateItemQuantity(id: number, quantity: number): Observable<CartResponse> {
    return this.http.patch<CartResponse>(
      `${this.apiUrl}/items/${id}/quantity/${quantity}`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(cart => {
        // Update the shared state when changing quantity
        this.cartSubject.next(cart);
      })
    );
  }

  removeItem(id: number): Observable<CartResponse> {
    return this.http.delete<CartResponse>(
      `${this.apiUrl}/items/${id}`,
      { withCredentials: true }
    ).pipe(
      tap(cart => {
        // Update the shared state when removing an item
        this.cartSubject.next(cart);
      })
    );
  }
}