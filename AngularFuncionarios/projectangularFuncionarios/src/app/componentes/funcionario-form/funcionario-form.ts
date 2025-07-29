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

  funcionarioForm!: FormGroup;

  constructor(){}

  ngOnInit(): void {
    this.funcionarioForm = new FormGroup({
        id: new FormControl(0),
        nome: new FormControl('', [Validators.required]),
        sobrenome: new FormControl('', [Validators.required]),
        departamento: new FormControl('', [Validators.required]),
        ativo: new FormControl(true),
        turno: new FormControl('', [Validators.required]),
        exercicio: new FormControl('', [Validators.required]),
        dataCriacao: new FormControl(new Date),
        dataAlteracao: new FormControl(new Date)

    });
  }

  submit(){
    console.log(this.funcionarioForm.value)

    this.onSubmit.emit(this.funcionarioForm.value);
  }
}
