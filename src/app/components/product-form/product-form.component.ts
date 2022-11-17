import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { urls } from 'src/shared/urls';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    price: 0,
    imgUrl: ''
  }
  constructor(private productsService: ProductsService, private _formBuilder: FormBuilder) {
    this.fb = this._formBuilder.group({
      name: [
        undefined, [Validators.required, Validators.minLength(3)]
      ],
      description: [
        undefined, [Validators.required, Validators.minLength(3)]
      ],
      price: [
        undefined, [Validators.required, Validators.minLength(3)]
      ],
      imgUrl: [
        undefined, [Validators.required, Validators.minLength(3)]
      ]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.product = this.fb.value
    console.log(this.fb.value);

    this.productsService.create(this.product)
    this.fb.reset
  }
}
