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
