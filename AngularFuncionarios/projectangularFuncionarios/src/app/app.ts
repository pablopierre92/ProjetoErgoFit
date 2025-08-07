import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
// Removido import de Home que não é usado no template
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

/* Angular Material */
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  standalone: true,
  // Removido Home dos imports pois não é usado no template
  imports: [
    RouterModule, 
    RouterOutlet, 
    ReactiveFormsModule, 
    FormsModule, 
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projectangularFuncionarios');
}

/*import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Home } from "./pages/home/home";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

/* Angular Material */
/*
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  imports: [RouterModule,RouterOutlet,Home,ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
  
})



export class App {
  protected readonly title = signal('projectangularFuncionarios');
}
*/