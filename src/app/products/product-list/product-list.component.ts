import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service.service';
import { Product } from "../product.model";



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  product = {
    name: '',
    price: '$30',
    filters: ["high", "low"],
    id: null
  }

  filters:string;
  edit = true;
  add = false;
  products: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts()
  }

  private getProducts() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  addProduct() {
    const data = {
      name: this.product.name,
      id: this.product.id,
      price: this.product.price,
      filters: this.product.filters
    };
    this.productService.createProduct(data).subscribe(response => {
      console.log(response)
      this.getProducts();
    });
  }

  setProductEdit(product: Product) {
    this.product.name = product.name;
    this.product.id = product.id;
    this.product.filters = product.filters
    this.edit = false;
    this.add = true;
  }

  resetValues() {
    this.product.name = "";
    this.product.id = null;
    this.edit = true;
    this.add = false;
  }

  removeProduct(product: Product) {
    const id = product.id;
    console.log(product)
    this.productService.deleteProduct(id).subscribe(product => console.log(product));
    this.getProducts()
  }

  updateProduct(){
    console.log(this.product)
    console.log(this.product.filters)
    console.log(this.filters)
    if (!this.product.filters.includes(this.filters)) {
     this.product.filters.push(this.filters)
    } else {
      console.log("Filter Found")
      this.product.filters.splice(this.product.filters.indexOf(this.filters), 1)
    }
    let index = this.products.indexOf(this.product);
    this.productService.editProduct(this.product).subscribe(response => console.log(response));
    this.getProducts()
    this.resetValues()
  }
}
