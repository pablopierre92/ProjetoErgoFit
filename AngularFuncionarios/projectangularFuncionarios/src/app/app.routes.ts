
import { RouterModule, Routes } from '@angular/router';
import { Cadastro } from './pages/cadastro/cadastro';
import { NgModule } from '@angular/core';
import { Home } from './pages/home/home';
import { Editar } from './pages/editar/editar';



export const routes: Routes = [
    {path:'cadastro' , component: Cadastro},
    {path: '', component: Home},
    {path: 'editar/:id', component: Editar}

];

//novo
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes{

}

