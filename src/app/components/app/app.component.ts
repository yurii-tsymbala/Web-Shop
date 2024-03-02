import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { SortComponent } from "../sort/sort.component";
import { Sort } from "../../models/Sort";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "../product/product.component";
import { Observable, map, take, tap } from "rxjs";
import { Product } from "../../models/Product";
import { ProductService } from "../../services/product.service";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        HeaderComponent,
        FooterComponent,
        SortComponent,
        ProductComponent,
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

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.fetchProducts();
        this.observeProducts();
    }

    onProductClick(product: Product) {
        console.log(product);
    }

    onSortClick(sort: Sort): void {
        this.selectedIndex = sort.id;

        switch (sort.id) {
            case 0:
                this.products$ = this.productService.updatedProducts$;
                break;
            case 1:
                this.products$ = this.productService.updatedProducts$.pipe(
                    map((products) => [...products].sort((firstP, scndP) => firstP.price - scndP.price)));
                break;
            case 2:
                this.products$ = this.productService.updatedProducts$.pipe(
                    map((products) => [...products].sort((firstP, scndP) => firstP.date - scndP.date))); // need fix
                break;
            case 3:
                // need realisation
                break;    
            default:
                break;
        }
    }

    private fetchProducts(): void {
        this.productService.getProducts().pipe(take(1)).subscribe();
    }

    private observeProducts(): void {
        this.products$ = this.productService.updatedProducts$;
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
