import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DragLineService {
  
  // Observable navItem source
  private _dragLine = new BehaviorSubject<any>(false);  
  // Observable navItem stream
  dragLine$ = this._dragLine.asObservable();
  // service command
  dragLine(item){
    this._dragLine.next(item);
  }
}