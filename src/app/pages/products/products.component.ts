import { Component, OnInit } from '@angular/core';
import { CreateProductDto, ProductModel, UpdateProductDto } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   products:ProductModel[] = [];

   selectedProduct: UpdateProductDto = {title:'', price:0, description:''};

  constructor(private productService:ProductService) {
   this.editProduct();
  }
  
  ngOnInit(): void {
    this.getProducts();
    //this.getProduct();
    //this.createProduct();
    //this.updateProduct();
    //this.deleteProduct();
  }

  getProducts(){
    const url = "https://api.escuelajs.co/api/v1/products";
    this.productService.getAll().subscribe(
      response =>{
        this.products = response;
        console.log(response);
      }
    )
  }
  getProduct(id: ProductModel['id'] ){
    const url = "https://api.escuelajs.co/api/v1/products/id";
    return this.productService.getOne(id).subscribe(
      response =>{
        console.log(response);
      }
    )
  }

  createProduct(product: CreateProductDto){
    const data = {
      title: 'Cocinas',
      price: 1100,
      description: '6 quemadores / Jinson Medina',
      images: [
        'https://norte.dico.com.mx/media/catalog/product/cache/ddfdab190e55251eefb307178e423bf7/s/a/sala-modular-capital-calabaza-moderno-decorado-sal20754s1-2_1.jpg',
      ],
      categoryId: 1,
    };
    this.productService.store(data).subscribe(
      response=>{
        console.log(response)})
   }
  editProduct(){
    this.selectedProduct = {title:'', price:0, description:''};
  }
  
  updateProduct(){
    const data = {
      title: 'pc gaming',
      price: 1800,
      description: 'rgba rtx / Jinson Medina',
    };
    this.productService.update(86,data).subscribe(
      response => {
        console.log(response)})
   }
   deleteProduct(id:ProductModel['id']){
    this.productService.destroy(id).subscribe(
      response => {
        this.products= this.products.filter(product => product.id != id);
        console.log(response)})
   }
}