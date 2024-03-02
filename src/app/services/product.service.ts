import { Injectable } from "@angular/core";
import { Product } from "../models/Product";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, map, tap } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ProductService {
    private readonly PRODUCTS_KEY = "products";
    private readonly API_LINK = "http://makeup-api.herokuapp.com/api/v1/products.json";
    // private readonly API_LINK = "http://localhost:8080/src/assets/products.json";
    private products = new BehaviorSubject<Product[]>([]);
    private cartProducts = new BehaviorSubject<Product[]>([]);
    readonly products$ = this.products.asObservable();
    readonly cartProducts$ = this.cartProducts.asObservable();

    constructor(private http: HttpClient) {}

    fetchProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.API_LINK).pipe(
            map((array) => array.slice(0, 100)),
            tap((products) => {
                this.products.next(products);
            })
        );
    }

    addCartProduct(product: Product): void {     
        const products = this.storedProducts;
        products.push(product);
        localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify({products}));
        this.fetchCartProducts();
    }

    fetchCartProducts(): void {
        const products = this.storedProducts;
        this.cartProducts.next(products);
    }

    private get storedProducts(): Product[] {
        return JSON.parse(
            localStorage.getItem(this.PRODUCTS_KEY) || '{"products":[]}'
        ).products as Product[];
    }
}
