import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'cart-shop',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './cart-shop.component.html',
  styleUrl: './cart-shop.component.scss'
})
export class CartShopComponent {

}
