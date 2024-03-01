import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { SortComponent } from "../sort/sort.component";
import { Sort } from "../../models/Sort";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "../product/product.component";
import { Observable } from "rxjs";
import { Product } from "../../models/Product";

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
    products$ = new Observable<Product[]>();
    sorts = this.getSorts();
    selectedIndex: number = 0;

    ngOnInit(): void {
      
    }

    onSortClick(sort: Sort) {
        this.selectedIndex = sort.id;
        // update products by method from service
    }

    private getSorts(): Sort[] {
        return [
            new Sort(0, "Default"),
            new Sort(1, "Brand"),
            new Sort(2, "Category"),
        ];
    }
}
