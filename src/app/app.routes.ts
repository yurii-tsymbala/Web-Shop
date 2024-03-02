import { Routes } from "@angular/router";
import { CartShopComponent } from "./components/cart-shop/cart-shop.component";
import { MainComponent } from "./components/main/main.component";

export const routes: Routes = [
    { path: "home", component: MainComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "shopcart", component: CartShopComponent }
];
