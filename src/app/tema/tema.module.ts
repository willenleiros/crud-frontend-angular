import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenubarModule, Menubar } from 'primeng/menubar';



@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MenubarModule,
  ],
  exports: [
    MenuComponent,
  ]
})
export class TemaModule { }
