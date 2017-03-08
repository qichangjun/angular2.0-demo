import { Component,OnInit } from '@angular/core';

@Component({
    // moduleId使用于CommonJs
    moduleId : module.id,
    selector : 'detail-users',
    templateUrl : './detail-users.component.html',
})

export class DetailUsersComponent {
    title = 'detail-users';
}