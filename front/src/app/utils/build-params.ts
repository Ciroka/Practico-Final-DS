import { HttpParams } from "@angular/common/http";
import { QueryProductsDto } from "../interfaces";

export function buildParams(query?: QueryProductsDto): HttpParams | {} {
    if (!query) return {};
    
    let params = new HttpParams();
    if (query.name) params = params.set('name', query.name);
    if (query.order) params = params.set('order', query.order);
    if (query.sortBy) params = params.set('sortBy', query.sortBy);
    if (query.page) params = params.set('page', query.page);
    if (query.limit) params = params.set('limit', query.limit);
    
    return params;
}