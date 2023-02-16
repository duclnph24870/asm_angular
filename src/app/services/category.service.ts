import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    baseUrl: string = 'http://localhost:3000';
    constructor(private httpClient: HttpClient) {}

    getCategory(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(this.baseUrl + '/category', {
            responseType: 'json',
        });
    }
}
