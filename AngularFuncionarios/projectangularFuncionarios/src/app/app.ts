import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Home } from "./pages/home/home";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  imports: [RouterModule,RouterOutlet,Home,ReactiveFormsModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
  
})



export class App {
  protected readonly title = signal('projectangularFuncionarios');
}
