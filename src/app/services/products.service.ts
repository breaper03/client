import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/interfaces/product.interface';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { urls } from 'src/shared/urls';
// 6372fadc9d320c1c16f3f5d0
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private bases = 'http://localhost:3331'
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<{products: Product[]}>(`${this.bases}/products`)
  }

  getOne(_id: string): Observable<Product> {
    return this.http.get<Product>(`${this.bases}/products/${_id}`)
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.bases}/product/create`, product)
  }

  update(_id: string, product: Product) {
    return this.http.put<Product>(`${this.bases}/${_id}`, product)
  }

  delete(_id: string) {
    return this.http.delete(`${this.bases}/${_id}`)
  }
}
