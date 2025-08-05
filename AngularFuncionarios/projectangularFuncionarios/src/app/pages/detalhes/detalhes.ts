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
