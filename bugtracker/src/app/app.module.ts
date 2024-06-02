import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ProjectComponent } from './project/project.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TicketComponent } from './ticket/ticket.component';
import { HeaderComponent } from './header/header.component';
import { HTTP_INTERCEPTORS,  HttpClientModule } from '@angular/common/http';
import { ItemsLayoutComponent } from './items-layout/items-layout.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './services/interceptors/auth-interceptor.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { CreateTicketComponent } from './ticket/create-ticket/create-ticket.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LayoutComponent,
    ProjectComponent,
    SidebarComponent,
    TicketComponent,
    HeaderComponent,
    ItemsLayoutComponent,
    CreateTicketComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgChartsModule,
    NgxSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatStepperModule,
    MatInputModule,
    MatPaginatorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,useClass:AuthInterceptorService, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
