import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Menu } from 'src/app/shared/models/menu.model';
import { MenuService } from 'src/app/shared/services/menu.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.scss']
})
export class MenuManagementComponent implements OnInit {
  
  public menu:Menu[]=[];

  public editingMenu?:Menu;

  constructor(private menuservice:MenuService, private authService: AuthService, private router: Router){}
  showMenu = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  addForm=new FormGroup({
    type:new FormControl('',Validators.required),
    name:new FormControl('',Validators.required),
    summary:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required)
  })

  editForm=new FormGroup({
    type:new FormControl('',Validators.required),
    name:new FormControl('',Validators.required),
    summary:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required)
  })
  
  addMenu(){
    this.menuservice.addMenus({
      id:'',
      type:this.addForm.value.type!,
      name:this.addForm.value.name!,
      summary:this.addForm.value.summary!,
      description:this.addForm.value.description!,
      price:this.addForm.value.price!
    }).subscribe(()=>{
      this.loadMenus();
    })
  }

  editMenus(menu:Menu){
    this.editingMenu=menu;

    this.editForm.setValue({
      type:this.editingMenu.type,
      name:this.editingMenu.name,
      summary:this.editingMenu.summary,
      description:this.editingMenu.description,
      price:this.editingMenu.price
    });
  }

  loadMenus(){
    this.menuservice.getMenus().subscribe(d=>{
      this.menu=d;
    })
  }

  updateMenu(){
    if(this.editingMenu){
      const updatedMenu:Menu={
        id: this.editingMenu.id,
        name: this.editForm.value.name || '' ,
        summary: this.editForm.value.summary || '',
        description: this.editForm.value.description || '',
        price: this.editForm.value.price || '',
        type: this.editForm.value.type || ''
      };
      this.menuservice.updateMenus(updatedMenu).subscribe(()=>{
        this.editingMenu=undefined;
        this.loadMenus();
      });
    }
  }
  /*updateMenu(){
    this.menuservice.updateMenus({
      id:this.editingMenu!.id,
      type:this.editingMenu!.type,
      name:this.editingMenu!.name,
      summary:this.editingMenu!.summary,
      description:this.editingMenu!.description,
      price:this.editingMenu!.price
    }).subscribe(d=>{
      this.editingMenu=undefined;
      this.loadMenus();
    })
  }*/

  cancelEditMenus(){
    this.editingMenu=undefined;
  }
  deleteMenus(id:string){
    this.menuservice.deleteMenus(id).subscribe(()=>{
      this.loadMenus();
    })
  }
  onLogout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  
  ngOnInit(): void {
    this.loadMenus();
  }

}
