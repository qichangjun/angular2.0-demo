import { Component, OnInit, EventEmitter, Output, AfterViewInit,AfterViewChecked } from '@angular/core';
import { Tools } from '../class/tools'
import { DetailListService } from './detail-list.service';
import { DrawLineService } from '../service/draw-line.service';
import { DragLineService } from '../service/drag-line.service';
import {CookieService} from 'angular2-cookie/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
    // moduleId使用于CommonJs
    moduleId : module.id,
    selector : 'detail-list',
    templateUrl : './detail-list.component.html',
    styleUrls: ['./detail-list.component.css'],
    // providers: [DrawLineService]
})

export class DetailListComponent implements OnInit,AfterViewInit{

    message: string;
    list1 : Tools[] = [];    
    model: any;
    draggingItem: any;
    selectedItem: any;
    connectModel: any;
    fromId: any;
    toId: any;
    deleteTool: any;
    fa: any;
    constructor(
        private detailListService : DetailListService,
        private _drawLineService:DrawLineService,
        private _dragLineService:DragLineService,
        private _cookieService:CookieService,
        public dialog: MdDialog
    ) {
        this.connectModel = false;
        this.selectedItem = null;
        this.draggingItem = null;
        this.fromId = null;
        this.toId = null;
        this.model = {
            data:[],
            dragInitId:1
        };
        this.deleteTool = {}
    }
    onClick(info) {
        this.fromId = info.fromId;
        this.toId = info.toId;
        this.deleteTool.showTool = true;
        this.deleteTool.left = info.left;
        this.deleteTool.top = info.top;
    }
    getToolList(): void {
        this.list1 = this.detailListService.getToolList();
    }
    getModelData() {    
        this.model = this._cookieService.getObject('scope_data') || {data:[],dragInitId:1};       
        this.model.dragInitId ++ ;             
        if (this.model) {            
            for (var i = 0; i < this.model.data.length; i++) {
                for (var x = 0; x < this.model.data[i].to.length; x++) {
                    for (var y = 0; y < this.model.data.length;y++) {
                        if (this.model.data[i].to[x].id === this.model.data[y].id) {
                            let obj = {
                                selectedItem : this.model.data[i],
                                item : this.model.data[y]
                            };  
                            (function(_obj,a) {
                                setTimeout (function() {
                                    a._drawLineService.drawLine(_obj);
                                    a._dragLineService.dragLine(_obj.item);  
                                },y*100)
                            })(obj,this)                                                                                                             
                        }
                    }
                }
            }
        }    
    }
    dropCallback(obj): void{        
        if (this.draggingItem.status == 'inToolBar') {
            let newItem = {
                to : [],
                id : this.model.dragInitId,
                title : obj.dragData.title,
                left : obj.mouseEvent.offsetX - 15,
                top : obj.mouseEvent.offsetY - 15,
                class : obj.dragData.class,
                clientWidth:obj.dragData.clientWidth,
                clientHeight:obj.dragData.clientHeight,
                type:obj.dragData.type,
                toolImg:obj.dragData.toolImg,
                entity:[],
                itemImg:obj.dragData.itemImg,
                status:'inContainer',
                connectClass:obj.dragData.connectClass
            }
            this.model.dragInitId = this.model.dragInitId + 1;
            this.model.data.push(newItem);
        } 
        else if (this.draggingItem.status == 'inContainer') {
            this.draggingItem.left = obj.mouseEvent.offsetX - 15;
            this.draggingItem.top = obj.mouseEvent.offsetY - 15;
            // 传递连接事件
            this._dragLineService.dragLine(this.draggingItem);
        }
        this.deleteTool.showTool = false
        this.selectedItem = null
        
    }
    startDragFromTool(obj : Tools): void{
        if (obj) {               
            this.draggingItem = obj;            
        }
    }
    startDragFromContainer(obj): void{
        if (obj) {
            this.draggingItem = obj;
        }
    }
    clickItem(event,item): void{
        event.stopPropagation();
        if (!this.connectModel) {
            this.selectedItem = item           
        }
        if (this.connectModel && this.selectedItem !== item && item.type !== 'startPoint') {
            var connectAble = true;
            for ( let i of this.selectedItem.to) {
                if (this.selectedItem.to.id !== item.id) {
                    connectAble = true;
                } else {
                    connectAble = false;
                    break;
                }
            }
            if (connectAble) {
                let dialogRef = this.dialog.open(DialogResultDialog);
                    dialogRef.afterClosed().subscribe(result => {                    
                });

                this.selectedItem.to.push({id:item.id,text:'111',clientHeight:item.clientHeight,clientWidth:item.clientWidth})                
                // broadcast the event here
                let new_obj = {
                    selectedItem : this.selectedItem,
                    item : item
                }
                this._drawLineService.drawLine(new_obj);
            }
        }
        this.connectModel = false
    }
    connectLine(event): void{
        event.stopPropagation()
        this.connectModel = !this.connectModel
    }
    deleteItem(event,item): void{      
        console.log (item.id)          
        for ( var i=0; i<this.model.data.length;i++) {
            console.log (this.model.data,i)
            // console.log (item.id,this.model.data[i].id)
                if (this.model.data[i] && item.id === this.model.data[i].id) {
                    this.model.data[i] = {};
                    break;
                }
            }
        for ( var i=0; i<this.model.data.length;i++ ) {
            if (this.model.data[i] && this.model.data[i].to) {
                for ( var y=0; y < this.model.data[i].to.length;y++ ) {
                    if (this.model.data[i].to[y] && this.model.data[i].to[y].id === item.id) {
                        this.model.data[i].to[y] = {}
                    }
                }
            } 
        }
        this.deleteTool.showTools = false;
        event.stopPropagation();
    }
    deleteConnect(event) {
        for (let i = 0; i < this.model.data.length; i++) {
            if (this.model.data[i].id === this.fromId) {
                for (let x = 0; x < this.model.data[i].to.length; x ++) {
                    if (this.model.data[i].to[x] && (this.model.data[i].to[x].id === this.toId)) {
                        this.model.data[i].to.splice(x,1);
                        this.deleteTool.showTool = false;
                        break;
                    }
                }
            }
        }
        event.stopPropagation();
    }
    saveData(): void{        
        this._cookieService.putObject('scope_data',this.model);
        alert ('保存成功')
  
    }
    ngOnInit(): void {
        this.getToolList();
       
    }
    ngAfterViewInit() {        
        this.getModelData();
    }
}

@Component({
  selector: 'dialog-result-example-dialog',
  template: `12345`
})
export class DialogResultDialog {
  constructor(public dialogRef: MdDialogRef<DialogResultDialog>) {}
}