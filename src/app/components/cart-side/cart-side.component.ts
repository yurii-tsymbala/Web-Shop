import { Component, EventEmitter, HostBinding, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../models/Product";
import { ProductService } from "../../services/product.service";
import { CommonModule } from "@angular/common";
import { CartComponent } from "../cart/cart.component";

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
    products$!: Observable<Product[]>;

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.fetchProducts();
        this.observeProducts();
    }
   
    onCloseClick(): void {
        this.isHiding = true;
        setTimeout(() => {
            this.closeCartSide.emit();
        }, 200);
    }

    private fetchProducts(): void {
        this.productService.fetchCartProducts();
    }

    private observeProducts(): void {
        this.products$ = this.productService.cartProducts$;
    }
}
