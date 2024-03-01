import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { SortComponent } from "../sort/sort.component";
import { Sort } from "../../models/Sort";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [HeaderComponent, FooterComponent, SortComponent, RouterOutlet, CommonModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    sorts = this.getSorts();
    selectedIndex: number = 0;

    onSortClick(sort: Sort) {
      this.selectedIndex = sort.id;
      // update products by method from service
    }













    private getSorts(): Sort[] {
        return [
            new Sort(0, "Default"),
            new Sort(1, "Price"),
            new Sort(2, "Category"),
        ];
    }
}
