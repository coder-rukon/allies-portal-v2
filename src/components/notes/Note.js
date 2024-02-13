import Helper from "@/inc/Helper";
import { Component } from "react";

class Note extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        let note = this.props.note;
        //let dateFormate = const d = new Date("2015-03-25");;
        return ( 
            <div className="note_item">
                <div className="note_header">
                    <strong>{note.first_name} { note.last_name} </strong> <span> { Helper.formateDate(note.updated_at) }</span>
                </div>
                <div className="note_contens">
                    {note.note_details}
                </div>
            </div>
         );
    }
}
 
export default Note;