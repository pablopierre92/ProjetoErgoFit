import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FuncionarioForm } from "../../componentes/funcionario-form/funcionario-form";
import { Funcionario } from '../../models/Funcionarios';
import { FuncionarioService } from '../../services/funcionario-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, switchMap } from 'rxjs';

@Component({
  selector: 'app-editar',
  imports: [FuncionarioForm, CommonModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css'
})
export class Editar implements OnInit, OnDestroy {

  btnAcao: string = 'Editar!'
  btnTitulo: string = 'Editar Funcionário'
  
  // Signals para estado
  funcionario = signal<Funcionario | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal(false);
  
  private destroy$ = new Subject<void>();

  constructor(
    private funcionarioService: FuncionarioService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // Escuta mudanças nos parâmetros da rota (importante para reutilização do componente)
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
          this.funcionario.set(data.dados);
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set('Erro ao carregar dados do funcionário');
          this.loading.set(false);
          console.error('Erro ao carregar funcionário:', error);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  editarFuncionario(funcionario: Funcionario): void {
    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);

    this.funcionarioService.EditarFuncionario(funcionario).subscribe({
      next: (data) => {
        this.loading.set(false);
        this.success.set(true);
        
        // Aguarda um momento para mostrar mensagem de sucesso
        setTimeout(() => {
          // O service já vai triggar refresh automático da lista
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        this.loading.set(false);
        this.error.set('Erro ao editar funcionário. Tente novamente.');
        console.error('Erro ao editar:', error);
      }
    });
  }

  // Método para voltar sem salvar
  voltar(): void {
    this.router.navigate(['/']);
  }

  // Método para ir para detalhes
  verDetalhes(): void {
    const funcionarioAtual = this.funcionario();
    if (funcionarioAtual?.id) {
      this.router.navigate(['/detalhes', funcionarioAtual.id]);
    }
  }
}

/*
import { Component, OnInit } from '@angular/core';
import { FuncionarioForm } from "../../componentes/funcionario-form/funcionario-form";
import { Funcionario } from '../../models/Funcionarios';
import { FuncionarioService } from '../../services/funcionario-service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  imports: [FuncionarioForm],
  templateUrl: './editar.html',
  styleUrl: './editar.css'
})
export class Editar implements OnInit{

  btnAcao: string = 'Editar!'
  btnTitulo: string = 'Editar Funcionário'
  funcionario!: Funcionario;

  constructor(private funcionarioService : FuncionarioService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const id = Number (this.route.snapshot.paramMap.get('id'));

    this.funcionarioService.GetFuncionario(id).subscribe((data)=>{
      this.funcionario = data.dados;
    })

  }

  editarFuncionario(funcionario : Funcionario){
    this.funcionarioService.EditarFuncionario(funcionario).subscribe((data) => {
      this.router.navigate(['/'])
    });
  }

}
*/