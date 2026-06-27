import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { ProductsService, ToastService } from '../../services';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private toastService = inject(ToastService);

  product = signal<Product | null>(null);
  error = '';

  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try {
      const p = await firstValueFrom(this.productsService.findOne(id));
      this.product.set(p);
    } catch {
      this.error = 'Producto no encontrado';
      this.mostrarMsjError();
    }
  }

  mostrarMsjError(){
  this.toastService.error({message: this.error})
  }
}
