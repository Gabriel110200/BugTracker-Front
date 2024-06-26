import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ProjectComponent } from './project/project.component';
import { TicketComponent } from './ticket/ticket.component';
import { CreateTicketComponent } from './ticket/create-ticket/create-ticket.component';
import { CreateProjectComponent } from './project/create-project/create-project/create-project.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { UpdateTicketComponent } from './ticket/update-ticket/update-ticket.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UpdateUserComponent } from './manage-user/update-user/update-user.component';
import { CreateUserComponent } from './manage-user/create-user/create-user.component';

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
      {path:'dashboard', component: DashboardComponent },
      {path:'project',component: ProjectComponent},
      {path:'ticket',component:TicketComponent},
      {path:'user',component:ManageUserComponent},
      {path:'create-ticket',component:CreateTicketComponent},
      {path:'edit-ticket',component:UpdateTicketComponent},
      {path:'create-project',component:CreateProjectComponent}, 
      {path:'edit-project',component:EditProjectComponent},
      {path:'create-user',component:CreateUserComponent},
    //  {path:'edit-user',component:UpdateUserComponent}

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
