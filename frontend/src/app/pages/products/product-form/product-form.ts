import { Component , OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product';
import { Product } from '../../../model/product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  form!: FormGroup;
  id?: number;
  isEdit = false;

    ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.id;

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0.00, [Validators.required, Validators.min(0.01)]],
      description: ['']
    });

    if (this.isEdit) {
      this.productService.getById(this.id!).subscribe({
        next: (product) => this.form.patchValue(product),
        error: () => alert('Producto no encontrado')
      });
    }
  }

    onSubmit(): void {
    if (this.form.invalid) return;

    const product: Product = this.form.value;

    const request = this.isEdit
      ? this.productService.update(this.id!, product)
      : this.productService.create(product);

    request.subscribe({
      next: () => this.router.navigate(['/products']),
      error: () => alert('Error al guardar el producto')
    });
  }
}
