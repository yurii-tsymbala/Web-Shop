import { Component, Input } from "@angular/core";
import { CartItem } from "../../models/CartItem";
import { ProductService } from "../../services/product.service";

@Component({
    selector: "shop",
    standalone: true,
    imports: [],
    templateUrl: "./shop.component.html",
    styleUrl: "./shop.component.scss",
})
export class ShopComponent {
    @Input() cartItem!: CartItem;

    constructor(private productService: ProductService) {}

    get formattedPrice(): string {
        return `${this.cartItem.product.price}${this.cartItem.product.price_sign} ${this.cartItem.product.currency}`;
    }

    get formattedUrl(): string {
        return `http:${this.cartItem.product.api_featured_image}`;
    }

    get formattedDesc(): string {
        if (this.cartItem.product.description) {
            return this.cartItem.product.description;
        } else {
            return "Soon will be added =)";
        }
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
