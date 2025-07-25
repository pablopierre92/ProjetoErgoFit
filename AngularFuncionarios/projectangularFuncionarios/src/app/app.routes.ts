
import { RouterModule, Routes } from '@angular/router';
import { Cadastro } from './pages/cadastro/cadastro';
import { NgModule } from '@angular/core';
import { Home } from './pages/home/home';


export const routes: Routes = [
    {path:'cadastro' , component: Cadastro},
    {path: '', component: Home}
];

