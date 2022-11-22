import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { urls } from 'src/shared/urls';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  isNewRecord = true
  routerList = urls.listProduct
  public fb: FormGroup; // Form
  product: Product = {
    name: '',
    description: '',
    imgUrl: '',
    price: 0
  }
  constructor(private productsService: ProductsService, private _formBuilder: FormBuilder) {
    this.fb = this._formBuilder.group({
      name: [
        undefined, [Validators.required]
      ],
      description: [
        undefined, [Validators.required]
      ],
      price: [
        undefined, [Validators.required]
      ],
      imgUrl: [
        undefined, [Validators.required]
      ]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.product = this.fb.value
    this.productsService.create(this.product)
    this.fb.reset
  }
}
