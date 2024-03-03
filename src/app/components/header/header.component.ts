import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Observable } from "rxjs";
import { CartItem } from "../../models/CartItem";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterModule } from "@angular/router";

@Component({
    selector: "header",
    standalone: true,
    imports: [CommonModule, RouterLink, RouterModule],
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
       return this.productService.cartItemsLength$;
    }

    private observeData(): void {
        this.cartItems$ = this.productService.cartProducts$;
    }
}
