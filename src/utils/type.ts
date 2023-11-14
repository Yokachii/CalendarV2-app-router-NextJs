
type Activities = {
    color:string;
    displayName:string;
    subTaskList:object;
}

type Todaytask = {

}

type Dashboardwidget = {
    type:string;
    objName:string;
    name:string;
    description:string;
    areaX:number;
}

type Todaynote = {
    value:string;
}

type Day = {
    time:Record<string,any>;
    todayNote:Todaynote;
    objective:Record<string,string>;
}

type User = {
    id:string;
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    activities:Record<string,Activities>;
    dailytask:Record<string,string>;
    dashboardwidget:Record<string,Dashboardwidget>;
    day:Record;
    notification:string;
    objective:string;
    song:string;
    todaytask:string;
    widgettask:string;
}