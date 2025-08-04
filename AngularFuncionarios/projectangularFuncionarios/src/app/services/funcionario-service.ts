import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/Funcionarios';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  
private apiUrl = `${environment.ApiUrl}/Funcionario`

constructor( private http: HttpClient){ }

GetFuncionarios() : Observable<Response<Funcionario[]>>{
  return this.http.get<Response<Funcionario[]>>(this.apiUrl);
}

GetFuncionario(id : number) : Observable<Response<Funcionario>>{
  return this.http.get<Response<Funcionario>>(`${this.apiUrl}/${id}`);
}

CreateFuncionario(funcionario: Funcionario) : Observable<Response<Funcionario[]>> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<Response<Funcionario[]>>(`${this.apiUrl}`, funcionario);
}

EditarFuncionario(funcionario : Funcionario) : Observable<Response<Funcionario[]>>{
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.put<Response<Funcionario[]>>(`${this.apiUrl}/editaFuncionario`,funcionario);
}

}
