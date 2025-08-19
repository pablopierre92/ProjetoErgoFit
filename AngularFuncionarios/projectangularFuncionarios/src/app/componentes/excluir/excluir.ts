import { Component, Inject, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario-service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Funcionario } from '../../models/Funcionarios';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';

@Component({
  selector: 'app-excluir',
  imports: [],
  templateUrl: './excluir.html',
  styleUrl: './excluir.css'
})
export class Excluir implements OnInit {

  inputdata: any;
  funcionario!: Funcionario

  constructor(
    private FuncionarioService : FuncionarioService,
    private router : Router,
    @Inject(MAT_DIALOG_DATA) public data: any

  ){}

  ngOnInit(): void {
    this.inputdata = this.data;

    this.FuncionarioService.GetFuncionario(this.inputdata.id).subscribe((data) =>{
      this.funcionario = data.dados;

      
    });
  }

}
