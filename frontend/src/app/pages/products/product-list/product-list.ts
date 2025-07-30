import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product';
import { RouterModule } from '@angular/router';
import { Product } from '../../../model/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit{
  private productService = inject(ProductService);
  searchName: string = '';
  filteredProducts: Product[] = []; 
   products: Product[] = [];
   


ngOnInit(): void {
  this.productService.getAll().subscribe({
    next: (data) => {
      this.products = data;
      this.filteredProducts = [...data]; // copia inicial
    },
    error: (err) => console.error('Error al cargar productos', err)
  });
}

filtrarProductos() {
  this.filteredProducts = this.products.filter(p => {
    const nameMatch =
      this.searchName.trim() === '' ||
      p.name.toLowerCase().includes(this.searchName.toLowerCase());
    return nameMatch 
  });
}


deleteProduct(id: number) {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    this.productService.delete(id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== id);
      this.filtrarProductos(); 
    });
  }
}



}
