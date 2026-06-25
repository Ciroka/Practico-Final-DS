import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CreateCategoryDto, UpdateCategoryDto, QueryProductsDto, PaginatedProducts } from '../interfaces';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/categories`;

  findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.api);
  }

  findOne(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.api}/${id}`);
  }

  findProducts(id: number, query?: QueryProductsDto) {
    return this.http.get<PaginatedProducts>(`${this.api}/${id}/products`, {
      params: this.buildParams(query)
    });
  }

  create(dto: CreateCategoryDto): Observable<Category> {
    return this.http.post<Category>(this.api, dto);
  }

  update(id: number, dto: UpdateCategoryDto): Observable<Category> {
    return this.http.put<Category>(`${this.api}/${id}`, dto);
  }

  remove(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.api}/${id}`);
  }

  private buildParams(query?: QueryProductsDto) {
    if (!query) return {};
    
    let params = new HttpParams();
    if (query.name) params = params.set('name', query.name);
    if (query.order) params = params.set('order', query.order);
    if (query.sortBy) params = params.set('sortBy', query.sortBy);
    if (query.page) params = params.set('page', query.page);
    if (query.limit) params = params.set('limit', query.limit);
    
    return params;
  }
}