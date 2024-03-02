import { Routes } from "@angular/router";
import { AppComponent } from "./components/app/app.component";
import { CartShopComponent } from "./components/cart-shop/cart-shop.component";

export const routes: Routes = [
    { path: "home", component: AppComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "main", component: CartShopComponent }
];
