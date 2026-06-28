import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { buildParams } from '../utils/build-params';
import { environment } from '../../environments/environment';
import { CreateProductDto, PaginatedProducts, QueryProductsDto, UpdateProductDto } from '../interfaces';
import { Product } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly api = `${environment.apiUrl}/products`;
  private readonly http = inject(HttpClient);

  findAll(query?: QueryProductsDto): Observable<PaginatedProducts> {
    return this.http.get<PaginatedProducts>(this.api, {
      params: buildParams(query)
    });
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