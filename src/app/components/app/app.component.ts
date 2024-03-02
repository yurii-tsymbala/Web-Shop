import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { SortComponent } from "../sort/sort.component";
import { Sort } from "../../models/Sort";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "../product/product.component";
import { Observable, map, take } from "rxjs";
import { Product } from "../../models/Product";
import { ProductService } from "../../services/product.service";
import { CartSideComponent } from "../cart-side/cart-side.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        HeaderComponent,
        FooterComponent,
        SortComponent,
        ProductComponent,
        CartSideComponent,
        RouterOutlet,
        CommonModule,
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
    products$!: Observable<Product[]>;
    sorts: Sort[] = this.getSorts();
    selectedIndex: number = 0;
    isCartOpened: boolean = false;

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.fetchProducts();
        this.observeProducts();
    }

    onProductClick(product: Product) {
        this.isCartOpened = true;
        console.log(product);
        this.productService.addCartProduct(product);
    }

    onSortClick(sort: Sort): void {
        this.selectedIndex = sort.id;

        switch (sort.id) {
            case 0:
                this.products$ = this.productService.products$;
                break;
            case 1:
                this.products$ = this.productService.products$.pipe(
                    map((products) => [...products].sort((a, b) => a.price - b.price)));
                break;
            case 2:
                this.products$ = this.productService.products$.pipe(
                    map((products) => {
                        return [...products].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                    }));
                break;
            case 3:
                this.products$ = this.productService.products$.pipe(
                    map((products) => {
                        return [...products].sort((a, b) => {
                            if (a.category < b.category) { return -1 }
                            if (a.category > b.category) { return 1 }
                            return 0;
                        })
                    }));
                break;
            default:
                break;
        }
    }

    onCartClose() {
        this.isCartOpened = false;
    }

    private fetchProducts(): void {
        this.productService.fetchProducts().pipe(take(1)).subscribe();
    }

    private observeProducts(): void {
        this.products$ = this.productService.products$;
    }

    private getSorts(): Sort[] {
        return [
            new Sort(0, "Featured"),
            new Sort(1, "Price"),
            new Sort(2, "Date"),
            new Sort(3, "Category"),
        ];
    }
}
