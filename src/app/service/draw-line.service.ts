import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DrawLineService {
  private _drawLine = new BehaviorSubject<any>(false);
  drawLine$ = this._drawLine.asObservable();
  drawLine(item) {    
    this._drawLine.next(item);
  }

}