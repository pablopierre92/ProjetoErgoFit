
import { Component, signal } from '@angular/core';
import { FuncionarioForm } from "../../componentes/funcionario-form/funcionario-form";
import { Funcionario } from '../../models/Funcionarios';
import { FuncionarioService } from '../../services/funcionario-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [FuncionarioForm, CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {

  btnAcao = "Cadastrar!"
  btnTitulo = "Cadastrar Funcionário"
  
  // Signals para controle de estado
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal(false);

  constructor(
    private funcionarioService: FuncionarioService, 
    private router: Router
  ) {}

  createFuncionario(funcionario: Funcionario): void {
    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);

    this.funcionarioService.CreateFuncionario(funcionario).subscribe({
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
        this.error.set('Erro ao cadastrar funcionário. Tente novamente.');
        console.error('Erro ao cadastrar:', error);
      }
    });
  }

  // Método para voltar sem salvar
  voltar(): void {
    this.router.navigate(['/']);
  }
}

/*import { Component} from '@angular/core';
import { FuncionarioForm } from "../../componentes/funcionario-form/funcionario-form";
import { Funcionario } from '../../models/Funcionarios';
import { FuncionarioService } from '../../services/funcionario-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [FuncionarioForm],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {

  btnAcao = "Cadastrar!"
  btnTitulo = "Cadastrar Funcionário"

  constructor(private funcionarioService : FuncionarioService, private router: Router){
    
  }

  createFuncionario(funcionario: Funcionario){
   // console.log('Payload enviado:', JSON.stringify(funcionario));
    this.funcionarioService.CreateFuncionario(funcionario).subscribe((data) => {
      this.router.navigate(['/'])
     // console.log(data)
    });
  }
}
*/