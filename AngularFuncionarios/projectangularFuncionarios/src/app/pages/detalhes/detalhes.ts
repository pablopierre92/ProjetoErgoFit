import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Funcionario } from '../../models/Funcionarios';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-detalhes',
  imports: [CommonModule, RouterModule,  MatButtonModule, MatCardModule, MatInputModule, MatSelectModule],
  templateUrl: './detalhes.html',
  styleUrl: './detalhes.css'
})
export class Detalhes implements OnInit, OnDestroy {

  // Signals para estado
  funcionario = signal<Funcionario | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  inativando = signal(false);
  
  private destroy$ = new Subject<void>();

  constructor(
    private funcionarioService: FuncionarioService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // Escuta mudanças nos parâmetros da rota
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(params => {
          const id = Number(params['id']);
          this.loading.set(true);
          this.error.set(null);
          this.funcionario.set(null);
          
          return this.funcionarioService.GetFuncionario(id);
        })
      )
      .subscribe({
        next: (data) => {
          const dados = data.dados;
          
          // Formata as datas
          dados.dataCriacao = new Date(dados.dataCriacao!).toLocaleDateString('pt-BR');
          dados.dataAlteracao = new Date(dados.dataAlteracao!).toLocaleDateString('pt-BR');
          
          this.funcionario.set(dados);
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set('Erro ao carregar detalhes do funcionário');
          this.loading.set(false);
          console.error('Erro ao carregar funcionário:', error);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  InativaFuncionario(): void {
    const funcionarioAtual = this.funcionario();
    
    if (!funcionarioAtual?.id) {
      this.error.set('ID do funcionário não encontrado');
      return;
    }

    // Confirmação antes de inativar
    if (!confirm(`Tem certeza que deseja inativar ${funcionarioAtual.nome} ${funcionarioAtual.sobrenome}?`)) {
      return;
    }

    this.inativando.set(true);
    this.error.set(null);

    this.funcionarioService.InativaFuncionario(funcionarioAtual.id).subscribe({
      next: (data) => {
        this.inativando.set(false);
        
        // Mostra mensagem de sucesso e navega
        alert('Funcionário inativado com sucesso!');
        
        // O service já vai triggar refresh automático da lista
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.inativando.set(false);
        this.error.set('Erro ao inativar funcionário. Tente novamente.');
        console.error('Erro ao inativar:', error);
      }
    });
  }

  // Método para voltar
  voltar(): void {
    this.router.navigate(['/']);
  }

  // Método para editar
  editar(): void {
    const funcionarioAtual = this.funcionario();
    if (funcionarioAtual?.id) {
      this.router.navigate(['/editar', funcionarioAtual.id]);
    }
  }

  // Método para refresh manual
  refresh(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loading.set(true);
      this.error.set(null);
      
      this.funcionarioService.GetFuncionario(id).subscribe({
        next: (data) => {
          const dados = data.dados;
          dados.dataCriacao = new Date(dados.dataCriacao!).toLocaleDateString('pt-BR');
          dados.dataAlteracao = new Date(dados.dataAlteracao!).toLocaleDateString('pt-BR');
          
          this.funcionario.set(dados);
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set('Erro ao recarregar dados');
          this.loading.set(false);
        }
      });
    }
  }
}

/*
import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Funcionario } from '../../models/Funcionarios';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-detalhes',
  imports: [],
  templateUrl: './detalhes.html',
  styleUrl: './detalhes.css'
})
export class Detalhes implements OnInit {

funcionario? : Funcionario;
id!:number;

constructor(private funcionarioService : FuncionarioService, private route: ActivatedRoute, private router: Router){

}

ngOnInit(): void {
  this.id = Number(this.route.snapshot.paramMap.get('id'));

  this.funcionarioService.GetFuncionario(this.id).subscribe((data) =>{

    const dados = data.dados;

    dados.dataCriacao = new Date(dados.dataCriacao!).toLocaleDateString('pt-BR');
    dados.dataAlteracao = new Date(dados.dataAlteracao!).toLocaleDateString('pt-BR');

    this.funcionario = data.dados;

  })
}

InativaFuncionario(){
  this.funcionarioService.InativaFuncionario(this.id).subscribe((data) => {
    this.router.navigate(['']);
  });
}

}
*/