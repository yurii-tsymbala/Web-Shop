import { Input } from "@angular/core";
import { Component } from "@angular/core";
import { CartItem } from "../../models/CartItem";

@Component({
    selector: "cart",
    standalone: true,
    imports: [],
    templateUrl: "./cart.component.html",
    styleUrl: "./cart.component.scss",
})
export class CartComponent {
    @Input() cartItem!: CartItem;

    get formattedPrice(): string {
        return `${this.cartItem.product.price}${this.cartItem.product.price_sign} ${this.cartItem.product.currency}`;
    }

    get formattedUrl(): string {
        return `http:${this.cartItem.product.api_featured_image}`;
    }
}
