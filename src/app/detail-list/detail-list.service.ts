import { Injectable } from '@angular/core';
import { Tools } from '../class/tools';


@Injectable()
export class DetailListService {
    getToolList(): Tools[] {
        return [
          {title: '开始',class:'startItem start--item--selected',clientWidth:35,clientHeight:35,type:'startPoint',toolClass:'tool-dragItem startpoint--bg--color',toolImg:'fa fa-info',itemImg:'',connectClass:'',status:'inToolBar'},
          {title: '工作节点',class:'dragItem',clientWidth:50,clientHeight:50,type:'工作节点',toolClass:'tool-dragItem dragpoint--bg--color',toolImg:'fa fa-cog',itemImg:'fa fa-cog',connectClass:'dragpoint--before--box',status:'inToolBar'},
          {title: '结束',class:'startItem start--item--selected',clientWidth:35,clientHeight:35,type:'endPoint',toolClass:'tool-dragItem endpoint--bg--color',toolImg:'fa fa-flag-checkered',itemImg:'',connectClass:'endpoint--before--box',status:'inToolBar'},
          {title: '判断',class:'ifItem',clientWidth:50,clientHeight:50,type:'判断',toolClass:'tool-dragItem ifpoint--bg--color',toolImg:'glyphicon-plus',itemImg:'glyphicon-plus',connectClass:'dragpoint--before--box',status:'inToolBar'}
        ]
    }
}