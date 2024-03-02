import {
    Component,
    EventEmitter,
    HostBinding,
    OnInit,
    Output,
} from "@angular/core";
import { Observable, map, reduce } from "rxjs";
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
        this.fetchProducts();
        this.observeProducts();
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

    onCloseClick(): void {
        this.isHiding = true;
        setTimeout(() => {
            this.closeCartSide.emit();
        }, 200);
    }

    private fetchProducts(): void {
        this.productService.fetchCartItems();
    }

    private observeProducts(): void {
        this.cartItems$ = this.productService.cartProducts$;
    }
}
