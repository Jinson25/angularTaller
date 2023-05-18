import { Component, OnInit } from '@angular/core';
import { CreateProductDto, ProductModel, UpdateProductDto } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ProductModel[] = [];
  selectedProduct: UpdateProductDto = {};

  constructor(private productService: ProductService) { }
  showUpdateForm: boolean = false;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAll().subscribe(response => {
      this.products = response;
      console.log(response);
    });
  }

  createProduct() {
    const data: CreateProductDto = {
      title: "Aditamentos de cocina",
      price: 25,
      description: "Cosinero, arrozera",
      images: ['http://api.lorem.space/image/furniture?w=640&h=480&r=8718'],
      categoryId: 1,
    };
    
    this.productService.store(data).subscribe(response => {
      console.log(response);
      // Llama a getProducts() nuevamente para obtener la lista actualizada después de crear el producto
      this.getProducts();
    });
  }

  editProduct(product: ProductModel) {
    this.selectedProduct = product;
  }

  updateProduct() {
    const data: UpdateProductDto = {
      title: "Pavilion",
      price: 1500,
      description: "Laptop Gaming / Jinson Medina",
      images: ['http://api.lorem.space/image/furniture?w=640&h=480&r=8718'],
      categoryId: 1
    };
    
    const productId = this.selectedProduct.id; // Obtén el ID del producto seleccionado
    this.productService.update(12, data).subscribe(response => {
      console.log(response);
      // Llama a getProducts() nuevamente para obtener la lista actualizada después de actualizar el producto
      this.getProducts();
    });
  }

  deleteProduct(id: ProductModel['id']) {
    this.productService.destroy(id).subscribe(response => {
      this.products = this.products.filter(product => product.id !== id);
      console.log(response);
    });
  }
}
