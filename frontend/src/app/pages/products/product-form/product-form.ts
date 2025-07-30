import { Component , OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
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
  formErrors: { [key: string]: string } = {};


  form!: FormGroup;
  id?: number;
  isEdit = false;

    ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.id;

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3),noSoloEspaciosValidator()]],
      price: [0.00, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required,noSoloEspaciosValidator()]]
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
    error: (errorResponse) => {
      if (errorResponse.status === 400) {
        this.formErrors = errorResponse.error;
      } else {
        alert('Error inesperado al guardar el producto.');
      }
    }
  });
}


}
function noSoloEspaciosValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    return value.trim().length === 0 ? { soloEspacios: true } : null;
  };
}

