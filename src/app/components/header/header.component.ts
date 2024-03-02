import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Observable, map } from "rxjs";
import { CartItem } from "../../models/CartItem";
import { CommonModule } from "@angular/common";

@Component({
    selector: "header",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
    cartItems$!: Observable<CartItem[]>;

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.observeData();
    }

    get cartItemsCount$(): Observable<number> {
        return this.productService.cartProducts$.pipe(
            map((cartItems) =>
                [...cartItems]
                    .map((cartItem) => cartItem.counter)
                    .reduce((acc, item) => { return acc += item }, 0)
            )
        );
    }

    private observeData(): void {
        this.cartItems$ = this.productService.cartProducts$;
    }
}
