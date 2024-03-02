import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "../../models/Product";
import { CommonModule } from "@angular/common";

@Component({
    selector: "product",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./product.component.html",
    styleUrl: "./product.component.scss",
})
export class ProductComponent {
    @Input() product!: Product;
    @Output() addToCart = new EventEmitter<Product>();

    get formattedPrice(): string {
        return `${this.product.price}${this.product.price_sign} ${this.product.currency}` 
    }
}
