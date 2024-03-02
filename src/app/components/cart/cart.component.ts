import { EventEmitter, Input, Output } from "@angular/core";
import { Component } from "@angular/core";
import { CartItem } from "../../models/CartItem";
import { ProductService } from "../../services/product.service";

@Component({
    selector: "cart",
    standalone: true,
    imports: [],
    templateUrl: "./cart.component.html",
    styleUrl: "./cart.component.scss",
})
export class CartComponent {
    @Input() cartItem!: CartItem;

    constructor(private productService: ProductService) {}

    get formattedPrice(): string {
        return `${this.cartItem.product.price}${this.cartItem.product.price_sign} ${this.cartItem.product.currency}`;
    }

    get formattedUrl(): string {
        return `http:${this.cartItem.product.api_featured_image}`;
    }

    incrementCartItem() {
        this.productService.addCartItem(this.cartItem.product);
    }

    decrementCartItem() {
        this.productService.decrementCartItem(this.cartItem.product);
    }

    removeCartItem() {
        this.productService.deleteCartItem(this.cartItem);
    }
}
