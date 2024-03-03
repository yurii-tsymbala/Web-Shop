import { Injectable } from "@angular/core";
import { Product } from "../models/Product";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, map, tap } from "rxjs";
import { CartItem } from "../models/CartItem";

@Injectable({
    providedIn: "root",
})
export class ProductService {
    private readonly PRODUCTS_KEY = "cartItems";
    private readonly API_LINK = "http://makeup-api.herokuapp.com/api/v1/products.json";
    // private readonly API_LINK = "http://localhost:8080/src/assets/products.json";
    private products = new BehaviorSubject<Product[]>([]);
    private cartProducts = new BehaviorSubject<CartItem[]>([]);
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

    fetchCartItems(): void {
        const cartItems = this.storedCartItems;
        this.cartProducts.next(cartItems);
    }

    addCartItem(product: Product): void {
        const cartItems = this.storedCartItems;
        const id = product.id;
        const existingCartItem = cartItems.find((cartItem) => cartItem.product.id === id) as CartItem;

        if (existingCartItem) {
            existingCartItem.counter = existingCartItem.counter + 1;
            localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify({ cartItems }));
            this.fetchCartItems();
            return;
        }

        let newItem: CartItem = { product: product, counter: 1 };
        cartItems.push(newItem);
        localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify({ cartItems }));
        this.fetchCartItems();
    }

    decrementCartItem(product: Product): void {
        const cartItems = this.storedCartItems;
        const id = product.id;
        const existingCartItem = cartItems.find((cartItem) => cartItem.product.id === id) as CartItem;

        if (existingCartItem.counter >= 2) {
            existingCartItem.counter = existingCartItem.counter - 1;
            localStorage.setItem( this.PRODUCTS_KEY, JSON.stringify({ cartItems }));
            this.fetchCartItems();
            return;
        }
    }

    deleteCartItem(cartItem: CartItem): void {
        let cartItems = this.storedCartItems;
        const id = cartItem.product.id;
        cartItems = cartItems.filter((cartItem) => cartItem.product.id !== id);
        localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify({ cartItems }));
        this.fetchCartItems();
    }

    get sortedByFeatured$(): Observable<Product[]> {
        return this.products$;
    }


    get sortedByPrice$(): Observable<Product[]> {
        return this.products$.pipe(
            map((products) => [...products].sort((a, b) => a.price - b.price))
        );
    }

    get sortedByDate$(): Observable<Product[]> {
        return this.products$.pipe(
            map((products) => {
                return [...products].sort(
                    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
            })
        );
    }

    get sortedByCategory$(): Observable<Product[]> {
        return this.products$.pipe(
            map((products) => {
                return [...products].sort((a, b) => {
                    if (a.category < b.category) {
                        return -1;
                    }
                    if (a.category > b.category) {
                        return 1;
                    }
                    return 0;
                });
            })
        );
    }

    get cartItemsLength$(): Observable<number> {
        return this.cartProducts$.pipe(
            map((cartItems) =>
                [...cartItems]
                    .map((cartItem) => cartItem.counter)
                    .reduce((acc, item) => { return acc += item }, 0)
            )
        );
    }

    get cartItemsTotalPrice$(): Observable<number> {
        return this.cartProducts$.pipe(
            map((cartItems) =>
                [...cartItems]
                    .map((cartItem) => cartItem.product.price * cartItem.counter)
                    .reduce((acc, item) => { return acc += item }, 0)
            )
        );
    }

    private get storedCartItems(): CartItem[] {
        return JSON.parse(localStorage.getItem(this.PRODUCTS_KEY) || '{"cartItems":[]}')
        .cartItems as CartItem[];
    }
}
