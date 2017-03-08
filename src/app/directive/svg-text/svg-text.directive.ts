import { Directive, ElementRef, Input, Output, OnInit,OnChanges } from '@angular/core';

import { EventEmitter } from '@angular/core';

import {Subscription} from 'rxjs/Subscription';
import { DrawLineService } from '../../service/draw-line.service';
import { DragLineService } from '../../service/drag-line.service';
import { FromOrTo } from '../../class/from';
@Directive({ 
    selector: '[svgText]'
    // providers: [DrawLineService]
})


export class SvgTextDirective implements OnInit {
    subscription: Subscription;
    from: any;
    to: any;
    constructor(
        private el: ElementRef,
        private _drawLineService:DrawLineService,
        private _dragLineService:DragLineService
    ) {
        this.to = {
            x : undefined,
            y : undefined,
            id : undefined
        }
        this.from = {
            x : undefined,
            y : undefined,
            id : undefined
        }
    }

    @Input() svgTextClientWidth: number;
    @Input() svgTextClientHeight: number;
    @Input() svgToClientWidth: number;
    @Input() svgToClientHeight: number;
    @Input() svgTextToId: number;
    @Input() svgTextFromId: string;
    ngOnInit() {
        this._drawLineService.drawLine$
       .subscribe(obj => {  
           if (obj) {
                if (!this.from.id) {                     
                    if (this.svgTextToId === obj.item.id && this.svgTextFromId === obj.selectedItem.id) {
                        this.to.x = obj.item.left;
                        this.to.y = obj.item.top;
                        this.to.id = obj.item.id;
                        this.from.x = obj.selectedItem.left;
                        this.from.y = obj.selectedItem.top;
                        this.from.id = obj.selectedItem.id;                                         
                        this.drawLine();
                    };     
                };  
           }
                                                                     
       });
       this._dragLineService.dragLine$
       .subscribe(obj => {   
           if (obj) {
                if (this.from.id === obj.id || this.to.id === obj.id) {
                    if (this.from.id === obj.id) {
                        this.from.x = obj.left;
                        this.from.y = obj.top
                    }                    
                    else if(this.to.id === obj.id) {
                        this.to.x = obj.left;
                        this.to.y = obj.top;
                    }                
                    this.drawLine();
                }      
           }                            
                      
       })
    }    
    drawLine() {        
        this.el.nativeElement.style.top = (this.from.y + this.to.y)/2 + 'px'
        this.el.nativeElement.style.left = (this.from.x + this.to.x)/2 + 'px'
    }
}