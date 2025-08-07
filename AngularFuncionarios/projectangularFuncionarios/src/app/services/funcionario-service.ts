import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Funcionario } from '../models/Funcionarios';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  
  private apiUrl = `${environment.ApiUrl}/Funcionario`;
  
  // Signal para forçar refresh na lista
  private refreshTrigger = new BehaviorSubject<boolean>(true);
  
  // Signal para loading state
  loading = signal(false);

  constructor(private http: HttpClient) {}

  // Observable que os componentes podem se inscrever para auto-refresh
  get shouldRefresh$() {
    return this.refreshTrigger.asObservable();
  }

  GetFuncionarios(): Observable<Response<Funcionario[]>> {
    this.loading.set(true);
    return this.http.get<Response<Funcionario[]>>(this.apiUrl).pipe(
      tap(() => this.loading.set(false))
    );
  }

  GetFuncionario(id: number): Observable<Response<Funcionario>> {
    this.loading.set(true);
    return this.http.get<Response<Funcionario>>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loading.set(false))
    );
  }

  CreateFuncionario(funcionario: Funcionario): Observable<Response<Funcionario[]>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.loading.set(true);
    
    return this.http.post<Response<Funcionario[]>>(this.apiUrl, funcionario, { headers }).pipe(
      tap(() => {
        this.loading.set(false);
        this.triggerRefresh(); // Força refresh da lista
      })
    );
  }

  EditarFuncionario(funcionario: Funcionario): Observable<Response<Funcionario[]>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.loading.set(true);
    
    return this.http.put<Response<Funcionario[]>>(`${this.apiUrl}/editaFuncionario`, funcionario, { headers }).pipe(
      tap(() => {
        this.loading.set(false);
        this.triggerRefresh(); // Força refresh da lista
      })
    );
  }

  InativaFuncionario(id: number): Observable<Response<Funcionario[]>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.loading.set(true);
    
    return this.http.put<Response<Funcionario[]>>(`${this.apiUrl}/inativaFuncionario/${id}`, {}, { headers }).pipe(
      tap(() => {
        this.loading.set(false);
        this.triggerRefresh(); // Força refresh da lista
      })
    );
  }

  // Método para forçar refresh manual
  triggerRefresh(): void {
    this.refreshTrigger.next(true);
  }
}


/*import { Injectable } from '@angular/core';
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

InativaFuncionario(id : number) : Observable<Response<Funcionario[]>>{
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.put<Response<Funcionario[]>>(`${this.apiUrl}/inativaFuncionario/${id}`,id); //Falta arrumar
  
}
}
*/