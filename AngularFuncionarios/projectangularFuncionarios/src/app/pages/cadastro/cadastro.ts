import { Component} from '@angular/core';
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
