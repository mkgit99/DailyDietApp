import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    foodListURL: string = 'http://localhost:3000/foodList/';

    constructor(private http: HttpClient) {}

    postFood(data: any) {
        return this.http.post<any>(this.foodListURL, data);
    }

    getFood() {
        return this.http.get<any>(this.foodListURL);
    }

    putFood(data: any, id: number) {
        return this.http.put<any>(this.foodListURL + id, data);
    }

    deleteFood(id: number) {
        return this.http.delete<any>(this.foodListURL + id);
    }
}
