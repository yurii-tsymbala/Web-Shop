import { Component, OnInit } from "@angular/core";
import { FooterComponent } from "../footer/footer.component";
import { Observable } from "rxjs";
import { CartItem } from "../../models/CartItem";
import { ProductService } from "../../services/product.service";

@Component({
    selector: "cart-shop",
    standalone: true,
    imports: [FooterComponent],
    templateUrl: "./cart-shop.component.html",
    styleUrl: "./cart-shop.component.scss",
})
export class CartShopComponent implements OnInit {
    cartItems$!: Observable<CartItem[]>;

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.fetchCartItems();
        this.observeCartItems();
    }


    private fetchCartItems(): void {
      this.productService.fetchCartItems();
  }

  private observeCartItems(): void {
      this.cartItems$ = this.productService.cartProducts$;
  }
}
