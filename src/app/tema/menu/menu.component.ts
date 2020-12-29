import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];

  constructor() {}
  
  ngOnInit(): void {
    this.items = [
      {
        label: 'Sistema',
        icon:'pi pi-fw pi-file',
        items: [{
          label: 'Novo',
          icon: 'pi pi-fw pi-plus',
          items: [
            {label: 'Projeto'},
            {label: 'Outro'},
          ]
        },
          {label: 'Abrir'},
          {label: 'Sair'}
        ]
      },
      {
        label: 'Arquivo',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Apagar', icon: 'pi pi-fw pi-trash'},
          {label: 'Atualizar', icon: 'pi pi-fw pi-refresh'}
        ]
      }
    ];
  }

}
