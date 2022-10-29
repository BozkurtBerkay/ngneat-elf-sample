import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductEditComponent } from './product-edit.component';
import { ProductRepository } from './store/product.repository';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price'];
  dataSource = this.productRepository.items$;

  constructor(
    public productRepository: ProductRepository,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openModal(product: Product): void {
    const dialogRef = this.dialog.open(ProductEditComponent, {
      width: '33%',
      data: {
        product,
        repository: this.productRepository
      },
    });
    dialogRef.afterClosed().subscribe(() => console.log('Closed'));
  }

}
