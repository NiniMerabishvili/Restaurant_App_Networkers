import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { Table } from 'src/app/shared/models/table.model';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'app-table-management',
  templateUrl: './table-management.component.html',
  styleUrls: ['./table-management.component.scss']
})
export class TableManagementComponent implements OnInit{

  public table:Table[]=[];

  public editingTable?: Table;

  constructor(private tableservice: TableService, private authService: AuthService, private router: Router) {} 
  
  showMenu = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  addForm=new FormGroup({
    number:new FormControl('',Validators.required),
    capacity:new FormControl('',Validators.required),
    type:new FormControl('',Validators.required)
  })
  
  editForm = new FormGroup({
    number: new FormControl('', Validators.required),
    capacity: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  });

  addTable(){
    this.tableservice.addTables({
      id:'',
      number:this.addForm.value.number!,
      capacity:this.addForm.value.capacity!,
      type:this.addForm.value.type!
    }).subscribe(()=>{
      this.loadTables();
    })
  }

  editTables(table: Table) {
    this.editingTable = table;
  
    this.editForm.setValue({
      number: this.editingTable.number,
      capacity: this.editingTable.capacity,
      type: this.editingTable.type
    });
  }
  /*editTables(table:Table){
    this.editingTable=table;

    this.editForm.setValue({
      number:this.editingTable?.number,
      capacity:this.editingTable?.capacity,
      type:this.editingTable?.type
    });
  }*/

  loadTables(){
    this.tableservice.getTables().subscribe(d=>{
      this.table=d;
    });
  }

  

  updateTable() {
    if (this.editingTable) {
      const updatedTable: Table = {
        id: this.editingTable.id,
        number: this.editForm.value.number || '', 
        capacity: this.editForm.value.capacity || '', 
        type: this.editForm.value.type || '' 
      };
  
      this.tableservice.updateTables(updatedTable).subscribe(() => {
        this.editingTable = undefined;
        this.loadTables();
      });
    }
  }
  
  
  /*updateTable(){
    this.tableservice.updateTables({
      id:this.editingTable!.id,
      number:this.editingTable!.number,
      capacity:this.editForm.value.capacity!,
      type:this.editForm.value.type!
    }).subscribe(d=>{
      this.editingTable=undefined;
      this.loadTables();
    })
  }*/

  cancelEditTables(){
    this.editingTable=undefined;
  }
  deleteTables(id:string){
    this.tableservice.deleteTables(id).subscribe(()=>{
      this.loadTables();
    })
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  
  ngOnInit(): void {
    this.loadTables();
}
}
