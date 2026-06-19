import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CreateProductDto, UpdateProductDto } from '../interfaces/product.interface';
import { QueryProductsDto } from '../interfaces/query-params.interface';
import { PaginatedProducts } from '../interfaces/pagination.interface';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly api = `${environment.apiUrl}/products`;
  private readonly http = inject(HttpClient);

  findAll(query?: QueryProductsDto): Observable<PaginatedProducts> {
    let params = new HttpParams();
    if (query) {
      if (query.name) params = params.set('name', query.name);
      if (query.sortBy) params = params.set('orderBy', query.sortBy);
      if (query.order) params = params.set('order', query.order);
      if (query.page) params = params.set('page', query.page);
      if (query.limit) params = params.set('limit', query.limit);
    }
    return this.http.get<PaginatedProducts>(this.api, { params });
  }

  findOne(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  create(dto: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(this.api, dto);
  }

  update(id: number, dto: UpdateProductDto): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${id}`, dto);
  }

  remove(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.api}/${id}`);
  }
}