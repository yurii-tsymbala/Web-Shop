import { Component, EventEmitter, HostBinding, Output } from "@angular/core";

@Component({
    selector: "cart-side",
    standalone: true,
    imports: [],
    templateUrl: "./cart-side.component.html",
    styleUrl: "./cart-side.component.scss",
})
export class CartSideComponent {
    @Output() closeCartSide = new EventEmitter();

    @HostBinding("class.hiding")
    isHiding: boolean = false;

    onCloseClick() {
        this.isHiding = true;
        setTimeout(() => {
            this.closeCartSide.emit();
        }, 200);
    }
}
