import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public list: Product[] = []

  constructor(private productService: ProductsService) {}

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Imagen', 'Precio', 'Acciones'];


  getAll() {
    this.productService.getAll().subscribe(
      res => {return res}
    )
  }

  getOne(_id: string) {
    this.productService.getOne(_id).subscribe(
      res => {return res}
    )
  }

  delete(_id: string) {
    this.productService.delete(_id).subscribe(
      res => {return res}
    )
  }

  ngOnInit(): void {
  }

}
