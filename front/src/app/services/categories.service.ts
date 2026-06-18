import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category, CreateCategoryDto, PaginatedCategories, QueryCategoriesDto, UpdateCategoryDto } from '../interfaces/category';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly api = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  findAll(query?: QueryCategoriesDto): Observable<PaginatedCategories> {
    let params = new HttpParams();
    if (query) {
      if (query.name) params = params.set('name', query.name);
      if (query.order) params = params.set('order', query.order);
      if (query.page) params = params.set('page', query.page);
      if (query.limit) params = params.set('limit', query.limit);
    }
    return this.http.get<PaginatedCategories>(this.api, { params });
  }

  findOne(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.api}/${id}`);
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
}
