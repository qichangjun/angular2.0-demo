import { Directive, ElementRef, Input, Output, OnInit,OnChanges,HostListener } from '@angular/core';

import { EventEmitter } from '@angular/core';

import {Subscription} from 'rxjs/Subscription';
import { DrawLineService } from '../../service/draw-line.service';
import { DragLineService } from '../../service/drag-line.service';
import { FromOrTo } from '../../class/from';
@Directive({ 
    selector: '[svgLine]'
    // providers: [DrawLineService]
})


export class HighlightDirective implements OnInit {
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

    @Output() clickLine  = new EventEmitter();
    @HostListener('click', ['$event']) onclick(event) {
        // this.clickLine.emit('1234');
        event.stopPropagation()        
        let svgPath = document.getElementsByClassName('svgPath')
        for (let i = 0; i< svgPath.length;i++) {
            svgPath[i].setAttribute('stroke','#818181');
            svgPath[i].setAttribute('stroke-dasharray','');
        }        
        this.el.nativeElement.querySelector('.svgPath').setAttribute('stroke','red')
        this.el.nativeElement.querySelector('.svgPath').setAttribute('stroke-dasharray','5,5')
        let left = Math.abs(this.from.x + this.to.x)/2
        let top = Math.abs(this.from.y + this.to.y)/2
        this.clickLine.emit({
            fromId:this.from.id,
            toId:this.to.id,
            left:left,
            top:top
        })
    }
    @HostListener('mouseover',['$event']) mouseOn(event) {
        event.stopPropagation()           
        this.el.nativeElement.querySelector('.svgPath').setAttribute('stroke-width','3')
    }
    @HostListener('mouseout',['$event']) mouseLeft(event) {
        event.stopPropagation()           
        this.el.nativeElement.querySelector('.svgPath').setAttribute('stroke-width','2')
    }


    @Input() svgLineClientWidth: number;
    @Input() svgLineClientHeight: number;
    @Input() svgToClientWidth: number;
    @Input() svgToClientHeight: number;
    @Input() svgLineFromId: number;
    @Input() svgLineToId: number;
    @Input() svgLineId: string;
   
    ngOnInit() {
        this._drawLineService.drawLine$
       .subscribe(obj => {  
           if (obj) {
                if (!this.from.id) {                     
                    if (this.svgLineToId === obj.item.id && this.svgLineFromId === obj.selectedItem.id) {
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
                    this.el.nativeElement.querySelector('.svgPath').setAttribute('stroke','#818181')
                    this.el.nativeElement.querySelector('.svgPath').setAttribute('stroke-dasharray','')                
                    this.drawLine();
                }      
           }                            
                      
       })
    }    
    drawLine() {        
        var svgPath = this.el.nativeElement.querySelector('.svgPath')             
        var svgMarker = this.el.nativeElement.querySelector('.svgMarker') 
        var moveX = this.from.x + this.svgLineClientWidth/2 + ''
        var moveY = this.from.y + this.svgLineClientHeight/2 + ''
        var lineX = this.to.x + this.svgToClientWidth/2 + ''
        var lineY = this.to.y + this.svgToClientHeight/2 + ''
        var lineDistance = Math.sqrt(Math.pow(this.from.x - this.to.x,2) + Math.pow(this.from.y - this.to.y,2))
        var parameterX = Math.abs(this.from.x-this.from.y)
        var num = (50 * lineDistance)/parameterX
        svgPath.setAttribute('d',"M" + moveX + " " + moveY +  "L" + lineX + " " + lineY )
        svgPath.setAttribute('marker-end',"url(#" + this.svgLineId + "marker)" )
        svgMarker.setAttribute('refX',this.svgToClientWidth/2 + 6)
    }
}