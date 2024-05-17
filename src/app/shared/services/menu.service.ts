import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private url='http://localhost:3333/api/dishes';

  constructor(private http:HttpClient){ }

  public getMenus(): Observable<Menu[]>{
    return this.http.get<Menu[]>(this.url);
}

public addMenus(menu:Menu){
    return this.http.post<Menu>(this.url, menu);
}   

public updateMenus(menu:Menu){
    return this.http.put<Menu>(`${this.url}/${menu.id}`, menu);
}

public deleteMenus(id:string){
    return this.http.delete(`${this.url}/${id}`);
}

}
