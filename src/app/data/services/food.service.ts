import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Food } from '../models/food';

@Injectable({
    providedIn: 'root',
})
export class FoodService {
    private url = 'Food';

    constructor(private http: HttpClient) {}

    public getFoods(): Observable<Food[]> {
        return this.http.get<Food[]>(`${environment.apiURL}/${this.url}`);
    }

    public createFood(food: Food): Observable<Food[]> {
        return this.http.post<Food[]>(`${environment.apiURL}/${this.url}`, food);
    }

    public updateFood(food: Food) {
        return this.http.put<Food[]>(`${environment.apiURL}/${this.url}`, food);
    }

    public deleteFood(id: number) {
        return this.http.delete<Food[]>(`${environment.apiURL}/${this.url}/${id}`);
    }
}
