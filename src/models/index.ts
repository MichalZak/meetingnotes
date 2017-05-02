import * as moment from 'moment';

export class Doc {
    public _id?:string;
    public _rev?:string;
    public _deleted?:boolean;
    public type?:string; //this is to distinguish different doc types

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}


export class Note extends Doc {
    // _id// note/string/
    public meeting?: string; //midweek/weekend
    public date?: string;
    public theme?: string;
    public body?:string;

    getPrintDate(){
        if(!this.date) return '';
        return moment(this.date).format('dddd, MMM Do YYYY');
    }

}