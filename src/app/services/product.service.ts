import { Injectable } from "@angular/core";
import { Product } from "../models/Product";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, map, tap } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ProductService {
    private readonly API_LINK = "http://makeup-api.herokuapp.com/api/v1/products.json";
    // private readonly API_LINK = "http://localhost:8080/src/assets/products.json";
    private products$ = new BehaviorSubject<Product[]>([]);
    readonly updatedProducts$ = this.products$.asObservable();

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.API_LINK).pipe(
            map(array => array.slice(0, 100)),
            tap((products) => {
                this.products$.next(products);
            })
        );
    }
}
