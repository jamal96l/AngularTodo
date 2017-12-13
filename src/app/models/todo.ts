export class Todo {
    constructor(
        public _id: string,
        public name: string,
        public completed: Boolean,
        public created_Date: Date
    ) { }
}
