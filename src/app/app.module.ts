import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AlertModule } from 'ng2-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { DndModule } from 'ng2-dnd';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent } from './app.component';
import { DetailListComponent,DialogResultDialog }  from './detail-list/detail-list.component';
import { DetailUsersComponent } from './detail-users/detail-users.component';


import { DetailListService }    from './detail-list/detail-list.service';
import { DrawLineService } from './service/draw-line.service';
import { DragLineService } from './service/drag-line.service';

import { HighlightDirective } from './directive/svg-line/svg-line.directive';
import { SvgTextDirective } from './directive/svg-text/svg-text.directive';
/*
  注入自定义模块
*/
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    DetailListComponent,
    DetailUsersComponent,
    HighlightDirective,
    SvgTextDirective,
    DialogResultDialog
  ],
  entryComponents:[
    DialogResultDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Angular2FontawesomeModule,
    AppRoutingModule,    
    MaterialModule.forRoot(),
    DndModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers:  [ DetailListService,DrawLineService,CookieService,DragLineService ],
  bootstrap: [AppComponent]  
})
export class AppModule { }
