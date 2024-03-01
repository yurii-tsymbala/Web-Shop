import { Component, Input } from "@angular/core";
import { Product } from "../../models/Product";
import { CommonModule } from "@angular/common";

@Component({
    selector: "product",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./product.component.html",
    styleUrl: "./product.component.scss",
})
export class ProductComponent {
    @Input() product!: Product;
}
