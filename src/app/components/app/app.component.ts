import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { SortComponent } from "../sort/sort.component";
import { Sort } from "../../models/Sort";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "../product/product.component";
import { Observable, take } from "rxjs";
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
    sorts = this.getSorts();
    selectedIndex: number = 0;

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.fetchProducts();
        this.observeProducts();
    }

    onSortClick(sort: Sort): void {
        this.selectedIndex = sort.id;
        // update products by method from service
    }

    private fetchProducts(): void {
        this.productService.getProducts().pipe(take(1)).subscribe();
    }

    private observeProducts(): void {
        this.products$ = this.productService.updatedProducts$;
    }

    private getSorts(): Sort[] {
        return [
            new Sort(0, "Default"),
            new Sort(1, "Brand"),
            new Sort(2, "Category"),
        ];
    }
}
