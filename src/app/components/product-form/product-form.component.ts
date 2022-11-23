import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { urls } from 'src/shared/urls';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  isNewRecord = true
  routerList = urls.listProduct
  fb: FormGroup; // Form
  productId = this._route.snapshot.paramMap.get('id');
  product: Product = {
    name: '',
    description: '',
    imgUrl: '',
    price: 0
  }
  constructor(private productsService: ProductsService, private _formBuilder: FormBuilder, private _route: ActivatedRoute, private loader: LoaderService) {
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
      img: [
        undefined, [Validators.required]
      ]
    })
  }

  ngOnInit(): void {
    if (this.productId) {
      this.isNewRecord = false
    }
  }

  onSubmit() {
    if ( this.fb.valid ) {
      this.fb.markAllAsTouched();
      if (!this.isNewRecord && this.productId ) {
        this.loader.setLoading(true)
        this.productsService.update(this.productId, this.fb.value).subscribe( res => {return res})
        this.loader.setLoading(false)
      } else { console.log(this.productId)
        this.productsService.create(this.fb.value).subscribe(res => {return res})
      }
    }
  }


}
