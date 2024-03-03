import { Component, EventEmitter, HostBinding, OnInit, Output } from "@angular/core";
import { Observable, map } from "rxjs";
import { ProductService } from "../../services/product.service";
import { CommonModule } from "@angular/common";
import { CartComponent } from "../cart/cart.component";
import { CartItem } from "../../models/CartItem";

@Component({
    selector: "cart-side",
    standalone: true,
    imports: [CartComponent, CommonModule],
    templateUrl: "./cart-side.component.html",
    styleUrl: "./cart-side.component.scss",
})
export class CartSideComponent implements OnInit {
    @Output() closeCartSide = new EventEmitter();
    @HostBinding("class.hiding")
    isHiding: boolean = false;
    cartItems$!: Observable<CartItem[]>;

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.fetchCartItems();
        this.observeCartItems();
    }

    onCloseClick(): void {
        this.isHiding = true;
        setTimeout(() => {
            this.closeCartSide.emit();
        }, 200);
    }

    get cartItemsCount$(): Observable<number> {
        return this.productService.cartItemsLength$;
     }

    get cartItemsSubtotal$(): Observable<number> {
        return this.productService.cartItemsTotalPrice$;
    }

    private fetchCartItems(): void {
        this.productService.fetchCartItems();
    }

    private observeCartItems(): void {
        this.cartItems$ = this.productService.cartProducts$;
    }
}
