import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'students-table', component: TableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppRoutingModule {}
