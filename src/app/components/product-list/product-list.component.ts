import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { urls } from 'src/shared/urls';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  list: Product[] = [];
  routerAdd = urls.addProduct;
  routerEdit = urls.updateProduct;

  constructor(private productService: ProductsService) {}

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['name', 'description', 'img', 'price', 'actions'];


  getAll() {
    this.productService.getAll().subscribe(
      res => {this.list = [...res.products]}
    )
  }

  getOne(_id: string) {
    const el = this.productService.getOne(_id).subscribe(
      res => {return res}
    )
    console.log(el);
    return el
  }

  remove(_id: string) {
    const el = this.getOne(_id)
    this.productService.delete(_id)
  }

  ngOnInit(): void {
    this.getAll()

  }

}
