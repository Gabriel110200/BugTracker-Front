// dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  pieChartData: any[] = [{ data: [30, 30, 30], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], label: 'Tickets Status' }];
  pieChartLabels: string[] = ['Abertos', 'Em Andamento', 'Concluídos'];

  pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  pieChartLegend = true;
  pieChartPlugins = [];

  // New data for the second chart (you can customize it)
  barChartData: any[] = [{ data: [30, 30, 30], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], label: 'Tickets Status' }];
  barChartLabels: string[] = ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4'];

  barChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  barChartLegend = true;
  barChartPlugins = [];


  // New data and options for the line chart (Projects)
  lineChartData: any[] = [
    { data: [10, 20, 15, 25, 30], label: 'Bugs durante a semana' }
  ];
  lineChartLabels: string[] = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'];

  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
    // Add any additional options for the line chart here
  };

  lineChartLegend = true;
  lineChartPlugins = [];

}
