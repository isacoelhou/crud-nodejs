export class EntityTask{
    constructor(title, status, date, desc){
        this.id = Date.now();
        this.title = title;
        this.desc = desc;
        this.status = status;
        this.date = date;
    }
}