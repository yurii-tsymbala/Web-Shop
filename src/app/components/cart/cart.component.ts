import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { CartItem } from '../../models/CartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  @Input() cartItem!: CartItem;
}
