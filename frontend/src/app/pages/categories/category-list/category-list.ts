import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category';
import { RouterModule } from '@angular/router';
import { Category } from '../../../model/category.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-category-list',
  imports: [CommonModule, RouterModule, FormsModule],
  standalone: true,
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList implements OnInit {
  private categoryService = inject(CategoryService);
    searchName: string = '';
    filteredCategories: Category[] = [];
  categories: Category[] = [];


ngOnInit(): void {
  this.categoryService.getAll().subscribe({
    next: (data) => {
      this.categories = data;
      this.filteredCategories = [...data]; 
    },
    error: (err) => console.error('Error al cargar productos', err)
  });
}

filtrarCategorias() {
  this.filteredCategories = this.categories.filter(c => {
    const nameMatch =
      this.searchName.trim() === '' ||
      c.name.toLowerCase().includes(this.searchName.toLowerCase());
    return nameMatch 
  });
}

deleteCategory(id: number) {
  if (confirm('¿Estás seguro de eliminar esta categoria?')) {
    this.categoryService.delete(id).subscribe(() => {
      this.categories = this.categories.filter(c => c.id !== id);
      this.filtrarCategorias(); 
    });
  }
}






}
