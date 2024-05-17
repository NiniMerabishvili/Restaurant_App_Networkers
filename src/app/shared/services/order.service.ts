import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url='http://localhost:3333/api/orders';

  constructor(private http:HttpClient){ }

  public getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.url);
}

public addOrders(order:Order){
    return this.http.post<Order>(this.url, order);
}   

public updateOrders(order:Order){
    return this.http.put<Order>(`${this.url}/${order.id}`, order);
}

public deleteOrders(id:string){
    return this.http.delete(`${this.url}/${id}`);
}
}
