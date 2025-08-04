import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Funcionario } from '../../models/Funcionarios';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-funcionario-form',
  imports: [RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './funcionario-form.html',
  styleUrl: './funcionario-form.css'
})
export class FuncionarioForm implements OnInit {

  @Output() onSubmit = new EventEmitter<Funcionario>();
  @Input() btnAcao!: string;
  @Input() btnTitulo!: string;
  @Input() dadosFuncionario: Funcionario | null = null;

  funcionarioForm!: FormGroup;

  constructor(){}

  ngOnInit(): void {
    this.funcionarioForm = new FormGroup({
        id: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.id : 0),
        nome: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.nome : '', [Validators.required]),
        sobrenome: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.sobrenome :'', [Validators.required]),
        departamento: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.departamento :'', [Validators.required]),
        ativo: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.ativo : true),
        turno: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.turno :'', [Validators.required]),
        exercicio: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.exercicio :'', [Validators.required]),
        dataCriacao: new FormControl(new Date),
        dataAlteracao: new FormControl(new Date)

    });
  }

  submit(){
    this.onSubmit.emit(this.funcionarioForm.value);
  }
}
