import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario-service';
import { Funcionario } from '../../models/Funcionarios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
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