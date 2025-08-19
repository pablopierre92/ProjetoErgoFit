import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil, Subject, switchMap } from 'rxjs';
import { FuncionarioService } from '../../services/funcionario-service';
import { Funcionario } from '../../models/Funcionarios';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { Excluir } from '../../componentes/excluir/excluir';


@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

  // Usando Signals (Angular 20.1.1)
  funcionarios = signal<Funcionario[]>([]);
  funcionariosGeral = signal<Funcionario[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  colunas = ['Situação', 'Nome', 'Sobrenome', 'Departamento', 'Exercicio', 'Ações', 'Excluir']

  private destroy$ = new Subject<void>();

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Configura auto-refresh baseado no trigger do service
    this.funcionarioService.shouldRefresh$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          this.loading.set(true);
          this.error.set(null);
          return this.funcionarioService.GetFuncionarios();
        })
      )
      .subscribe({
        next: (data) => {
          const dados = data.dados.map((item: Funcionario) => ({
            ...item,
            dataCriacao: new Date(item.dataCriacao!).toLocaleDateString('pt-BR'),
            dataAlteracao: new Date(item.dataAlteracao!).toLocaleDateString('pt-BR')
          }));
          
          this.funcionarios.set(dados);
          this.funcionariosGeral.set(dados);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Erro ao carregar funcionários:', error);
          this.error.set('Erro ao carregar funcionários');
          this.loading.set(false);
        }
      });

    // Auto-refresh quando volta para a página home
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        // Se voltou para home, força refresh
        if (event.url === '/' || event.url === '/home') {
          this.funcionarioService.triggerRefresh();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Método para refresh manual
  refresh(): void {
    this.funcionarioService.triggerRefresh();
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    
    const funcionariosFiltrados = this.funcionariosGeral().filter(funcionario => 
      funcionario.nome.toLowerCase().includes(value)
    );
    
    this.funcionarios.set(funcionariosFiltrados);
  }

  OpenDialog(id : number){
    this.dialog.open(Excluir, {
      width: '350px',
      height: '350px',
      data: {
        id : id
      }
    });
  }

  // Método para navegação programática (se precisar)
  navigateTo(route: string, id?: number): void {
    const path = id ? [route, id] : [route];
    this.router.navigate(path);
  }
}

/*import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario-service';
import { Funcionario } from '../../models/Funcionarios';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{

  funcionarios: Funcionario[] = [];
  funcionariosGeral: Funcionario[] = [];

  constructor ( private funcionarioService : FuncionarioService){}

  ngOnInit(): void {
    
    this.funcionarioService.GetFuncionarios().subscribe(data => {
        const dados = data.dados;

        dados.map((item) => {
            item.dataCriacao = new Date(item.dataCriacao!).toLocaleDateString('pt-BR')
            item.dataAlteracao = new Date(item.dataAlteracao!).toLocaleDateString('pt-BR')
        })
        this.funcionarios = data.dados;
        this.funcionariosGeral = data.dados;
        
    });
  }

search(event : Event){
  
  const target = event.target as HTMLInputElement;
  const value = target.value.toLowerCase();
  
  this.funcionarios = this.funcionariosGeral.filter(funcionario => {
    return funcionario.nome.toLowerCase().includes(value);
  })
  
}
}
*/