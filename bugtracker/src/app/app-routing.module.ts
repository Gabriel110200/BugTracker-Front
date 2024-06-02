import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ProjectComponent } from './project/project.component';
import { TicketComponent } from './ticket/ticket.component';
import { CreateTicketComponent } from './ticket/create-ticket/create-ticket.component';

const routes: Routes = [
  { path: 'login', 
    component: LoginComponent 
  },
  { path: 'register', 
    component: RegisterComponent 
  },
  { path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  {
    path: '',
    component: LayoutComponent, 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {path: 'project',component: ProjectComponent},
      { path:'ticket',component:TicketComponent},
      {path:'create-ticket',component:CreateTicketComponent}


    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
