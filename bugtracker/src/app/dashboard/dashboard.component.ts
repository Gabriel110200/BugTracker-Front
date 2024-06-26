// dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  //projetos por status
  pieChartData: any[] = [{ data: [3, 1, 2, 0], backgroundColor: ['#3498db', '#e74c3c', '#f1c40f', '#2ecc71'], label: 'Project Status' }];
  pieChartLabels: string[] = ['Em desenvolvimento', 'Em produção', 'estável', 'Obsoleto'];

  pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  pieChartLegend = true;
  pieChartPlugins = [];


  //categorias
  barChartData: any[] = [{ data: [3, 5, 1], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], label: 'Tickets Status' }];
  barChartLabels: string[] = ['Front end', 'Back end', 'Suporte'];

  barChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  barChartLegend = true;
  barChartPlugins = [];


  //bugs durante meses

  // New data and options for the line chart (Projects)
  lineChartData: any[] = [
    { data: [1,5,0,0], label: 'Bugs durante os meses' }
  ];
  lineChartLabels: string[] = ['Maio', 'Junho','Julho','Agosto'];

  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
    // Add any additional options for the line chart here
  };

  lineChartLegend = true;
  lineChartPlugins = [];


  //ticket por status
  ticketChartData: any[] = [{ data: [1, 5, 2, 1], backgroundColor: ['#219C90', '#FFF455', '#FFC700', '#EE4E4E'], label: 'Ticket Status' }];
  ticketChartLabels: string[] = ['Pronto para desenvolver', 'Em Progresso', 'QA', 'Pronto Para Produção'];


  ticketChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  ticketChartLegend = true;
  ticketChartPlugins = [];

}
