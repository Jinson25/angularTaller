import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor( private HttpClient:HttpClient){

  }
  ngOnInit():void{
    this.getProducts();
  }
  getProducts(){
    const response = this.HttpClient.get('https://api.escuelajs.co/api/v1/products').subscribe (
      response => {console.log(response); }
    )

  }
}
