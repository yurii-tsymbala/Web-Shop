import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  @Input() product!: Product;
}
