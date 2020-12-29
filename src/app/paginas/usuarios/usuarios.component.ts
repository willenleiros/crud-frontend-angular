import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../modelo/Usuario';
import {UsuarioService} from '../../servicos/usuario.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarioDialog: boolean = false;

  usuarios: Usuario[] = [];

  usuario: Usuario = {};

  selectedUsuarios: Usuario[] = [];

  editando: boolean = false;

  formulario: FormGroup = this.formBuilder.group({});

  ngOnInit(): void {

    this.listarTodos();
    this.configurarFormulario();

  }

  constructor(
    private usuarioService: UsuarioService, 
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) { }

  novo() {
      this.usuario = {};
      this.editando= false;
      this.usuarioDialog = true;
      this.formulario.reset();
  }

  deletarSelectedUsuarios() {
      this.confirmationService.confirm({
          message: 'Tem certeza que deseja apagar os usuários selecionados?',
          header: 'Confirmação',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Sim',
          rejectLabel: 'Não',
          accept: () => {
              this.usuarios = this.usuarios.filter(val => !this.selectedUsuarios.includes(val));
              this.selectedUsuarios = [];
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
          }
      });
  }

  editarUsuario(usuario: Usuario) {
      this.editando = true;
      this.formulario.get("codigo")?.setValue(usuario.codigo);
      this.formulario.get("nome")?.setValue(usuario.nome);
      this.formulario.get("apelido")?.setValue(usuario.apelido);
      this.usuarioDialog = true;
  }

  deletarUsuario(usuario: Usuario) {
      this.formulario.get("codigo")?.setValue(usuario.codigo);
      this.confirmationService.confirm({
          message: 'Tem certeza que deseja apagar ' + usuario.nome + '?',
          header: 'Confirmação',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Sim',
          rejectLabel: 'Não',
          accept: () => {
            this.usuarioService.deletar(this.formulario.value).then(data => {
              this.listarTodos();
              this.fecharDialog();
              this.usuario = {};
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Usuário apagado', life: 3000});
            })
            .catch(error => {
                console.log(error);
            });
          }
      });
  }

  fecharDialog() {
      this.usuarioDialog = false;
      this.editando = false;
  }
  
  salvarUsuario() {
      if(!this.editando){
        this.usuarioService.salvar(this.formulario.value).then(data => {
          this.listarTodos();
          this.fecharDialog();
          this.messageService.add({severity:'success', summary: 'Successful', 
            detail: 'Usuário salvo', life: 3000});
        })
        .catch(error => {
            console.log(error);
        });
      }
      else{
        this.usuarioService.atualizar(this.formulario.value).then(data => {
          this.listarTodos();
          this.fecharDialog();
          this.messageService.add({severity:'success', summary: 'Successful', 
            detail: 'Usuário atualizado', life: 3000});
        })
        .catch(error => {
            console.log(error);
        });
      }
      
  }

  listarTodos(){
    this.usuarioService.listarTodos().then(data => {
      this.usuarios = data;
    })
    .catch(error => {
        console.log(error);
    });

  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      codigo: new FormControl(),
      nome: new FormControl('', Validators.required),
      apelido: new FormControl('', Validators.required),
    });
  }

}
