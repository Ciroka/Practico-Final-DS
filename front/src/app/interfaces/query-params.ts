export interface QueryDto {
  name?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}