
export type PaginatedResult<T>  = {
    data: T[],
    meta: {
        page: number, // lo  tengo
        limit: number, // lo tengo
        total: number, // cantidad de objetos, todos no lo que devuelvo
        totalPages: number // total division entera() limite
    } 
}