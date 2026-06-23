import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { BottomSheet } from '../../shared/bottom-sheet/bottom-sheet';
import { CreateProductDto, UpdateProductDto } from '../../interfaces';
import { CategoriesService, ProductsService, AuthService } from '../../services';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { SortEnum } from '../../types/sort.enum';
import { OrderEnum } from '../../types/order.enum';

@Component({
  selector: 'app-products',
  imports: [FormsModule, RouterLink, BottomSheet],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsPage implements OnInit {
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);
  auth = inject(AuthService);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  editingProduct = signal<Product | null>(null);
  showForm = signal(false);
  error = '';
  formError = '';
  loading = signal(false);

  formName = '';
  formPrice = 0;
  formStock = 0;
  formCategoryId: number | null = null;

  filterName = '';
  sortBy: SortEnum = SortEnum.ID;
  order: OrderEnum = OrderEnum.ASC;
  page = 1;
  limit = 10;
  total = 0;

  async ngOnInit(): Promise<void> {
    this.loadProducts();
    try {
      const cats = await firstValueFrom(this.categoriesService.findAll());
      this.categories.set(cats.items);
    } catch { }
  }

  async loadProducts(): Promise<void> {
    this.loading.set(true);
    this.error = '';
    try {
      const res = await firstValueFrom(this.productsService.findAll({
        name: this.filterName || undefined,
        sortBy: this.sortBy,
        order: this.order,
        page: this.page,
        limit: this.limit,
      }));
      this.products.set(res.items);
      this.total = res.total;
    } catch (err) {
      this.error = 'Error al cargar productos';
    } finally {
      this.loading.set(false);
    }
  }

  search(): void {
    this.page = 1;
    this.loadProducts();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages()) {
      this.page++;
      this.loadProducts();
    }
  }

  totalPages(): number {
    return Math.ceil(this.total / this.limit);
  }

  openNew(): void {
    this.editingProduct.set(null);
    this.formName = '';
    this.formPrice = 0;
    this.formStock = 0;
    this.formCategoryId = null;
    this.formError = '';
    this.showForm.set(true);
  }

  openEdit(product: Product): void {
    this.editingProduct.set(product);
    this.formName = product.name;
    this.formPrice = product.price;
    this.formStock = product.stock;
    this.formCategoryId = product.categoryId;
    this.formError = '';
    this.showForm.set(true);
  }

  cancelForm(): void {
    this.showForm.set(false);
    this.editingProduct.set(null);
    this.formError = '';
  }

  async save(): Promise<void> {
    this.formError = '';
    try {
      if (this.editingProduct()) {
        const dto: UpdateProductDto = {
          name: this.formName,
          price: parseFloat(this.formPrice.toString()), // debería ser price: this.formPrice, no sé porque debo hacer toString y parseFloat
          stock: this.formStock,
          categoryId: this.formCategoryId,
        };
        await firstValueFrom(this.productsService.update(this.editingProduct()!.id, dto));
      } else {
        const dto: CreateProductDto = {
          name: this.formName,
          price: this.formPrice,
          stock: this.formStock,
          categoryId: this.formCategoryId,
        };
        await firstValueFrom(this.productsService.create(dto));
      }
      this.loadProducts();
      this.cancelForm();
    } catch (err: any) {
      this.formError = err.error?.message || 'Error al guardar';
    }
  }

  async deleteProduct(id: number): Promise<void> {
    if (!confirm('¿Eliminar producto?')) return;
    try {
      await firstValueFrom(this.productsService.remove(id));
      this.loadProducts();
    } catch (err: any) {
      this.error = err.error?.message || 'Error al eliminar';
    }
  }
}
