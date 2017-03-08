import { NgModule }             from '@angular/core';
import { RouterModule,Routes }  from '@angular/router';
import { DetailListComponent }  from './detail-list/detail-list.component';
import { DetailUsersComponent } from './detail-users/detail-users.component';



const routes: Routes = [
    { path: '', redirectTo: '/detail-list', pathMatch: 'full'},
    { path: 'detail-list',  component: DetailListComponent},
    { path: 'detail-users', component: DetailUsersComponent}
]

@NgModule({
    imports:    [ RouterModule.forRoot(routes) ],
    exports:    [ RouterModule ]
   
})
export class AppRoutingModule {}
