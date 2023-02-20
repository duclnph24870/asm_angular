import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    baseUrl: string = 'http://localhost:3000';
    constructor(private httpClient: HttpClient) {}

    getBg() {
        return [
            'https://images.unsplash.com/photo-1676619487386-54adbabb8f3a',
            'https://images.unsplash.com/photo-1676641657719-17508c702a7d',
            'https://images.unsplash.com/photo-1676430535219-32115efb1e3c',
            'https://images.unsplash.com/photo-1659872680794-abe4dca1a44f',
        ];
    }
}
