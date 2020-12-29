import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../modelo/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  backend: string;

  constructor(private http: HttpClient) { 
    this.backend = `${environment.apiUrl}/api/usuario`;
  }

  salvar(usuario: Usuario): Promise<Usuario> {
    return this.http.post<Usuario>(this.backend, usuario).toPromise();
  }

  atualizar(usuario: Usuario): Promise<Usuario> {
    return this.http.put(`${this.backend}/${usuario.codigo}`, usuario).toPromise();
  }

  deletar(usuario: Usuario): Promise<Usuario> {
    return this.http.delete(`${this.backend}/${usuario.codigo}`).toPromise();
  }

  buscarPorCodigo(usuario: Usuario){
    return this.http.get<Usuario>(`${this.backend}/${usuario.codigo}`).toPromise();
  }

  listarTodos(): Promise<Usuario[]> {
    return this.http.get<Usuario[]>(this.backend).toPromise();
  }

}
