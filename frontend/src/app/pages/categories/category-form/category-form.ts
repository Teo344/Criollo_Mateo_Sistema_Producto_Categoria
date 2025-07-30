import { Component , OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category';
import { Category } from '../../../model/category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})
export class CategoryForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private categoryService = inject(CategoryService);
  formErrors: { [key: string]: string } = {};


  form!: FormGroup;
  id?: number;
  isEdit = false;


    ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.id;

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(255)]],
    });

    if (this.isEdit) {
      this.categoryService.getById(this.id!).subscribe({
        next: (category) => this.form.patchValue(category),
        error: () => alert('Categoria no encontrado')
      });
    }
  }


onSubmit(): void {
  if (this.form.invalid) return;

  const category: Category = this.form.value;

  const request = this.isEdit
    ? this.categoryService.update(this.id!, category)
    : this.categoryService.create(category);

  request.subscribe({
    next: () => this.router.navigate(['/categories']),
    error: (errorResponse) => {
      if (errorResponse.status === 400 || errorResponse.status === 409) {
        this.formErrors = errorResponse.error;
      } else {
        alert('Error inesperado al guardar la categoría.');
      }
    }
  });
}

}
