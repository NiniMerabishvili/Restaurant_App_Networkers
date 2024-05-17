import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from '../models/table.model';
import { BookingTable } from '../models/table.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private url='http://localhost:3333/api/tables';

  constructor(private http:HttpClient){ }

  public getTables(): Observable<Table[]>{
    return this.http.get<Table[]>(this.url);
  }
  public getBookingTables(): Observable<BookingTable[]>{
    return this.http.get<BookingTable[]>(this.url);
  }

public addTables(table:Table){
    return this.http.post<Table>(this.url, table);
}

public updateTables(table:Table){
    return this.http.put<Table>(`${this.url}/${table.id}`, table);
}

public deleteTables(id:string){
    return this.http.delete(`${this.url}/${id}`);
}

}
