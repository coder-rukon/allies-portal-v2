import { Component } from "react";
import Note from "@/components/notes/Note";
import Input from "@/components/forms/Input";
import Button from "../forms/Button";
import Api from "@/inc/Api";
import Loading from "../widget/Loading";
class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            integrator: this.props.integrator,
            source: this.props.source,
            newNote:'',
            isShowNewNote:false,
            notes:[],
            isCreating:false,
            loading:false
        }
    }
    componentDidMount(){
        this.loadNotes()
    }
    loadNotes(){
        if(!this.state.integrator){
            return;
        }
        this.setState({
            loading:true
        })
        let api = Api, that = this;
        if(api.setUserToken()){
            api.axios().get('/note/all/'+this.state.source+'/'+this.state.integrator+'/1').then(res=>{
                console.log(res);
                that.setState({
                    loading:false,
                    notes:res.data.data.notes.data
                })
            })
        }

    }
    onNewNoteChangeHandler(event){
        this.setState({
            newNote:event.target.value
        })
    }
    createNote(){
        let api = Api, that = this;
        if(api.setUserToken()){
            let data = {
                integrator: this.state.integrator,
                source: this.state.source,
                note: this.state.newNote
            }
            this.setState({
                isCreating:true
            })
            api.axios().post('/note/create',data).then(res=>{
                that.setState({
                    isCreating:false,
                    newNote:''
                })
                that.loadNotes()
            }).catch(error => {
                that.setState({
                    isCreating:false
                })
            })
        }
    }
    getNewNoteForm(){
        if(this.state.isShowNewNote){
            return(
                <div className="create_note_form">
                    <Input type="textarea" name="new_note" value={this.state.newNote} onChange={ this.onNewNoteChangeHandler.bind(this)}/>
                    <div className="form_btn_sec">
                        {this.state.isCreating ? <Loading/> : <Button label="Send" onClick={ this.createNote.bind(this) }/> }
                    </div>
                    
                </div>
            )
        }
        return(
            <div className="create_note_placeholder">
                <Input type="text" name="new_note" placeholder="Write a note...." onClick={ e=> { this.setState({isShowNewNote:true})}}/>
            </div>
        )
    }
    render() { 
        let notes = this.state.notes;
        return (
            <div className="notes_area">
                <div className="notes_items">
                    {
                        notes.map( (note , key) => {
                            return <Note note ={note} key={key}/>
                        })
                    }
                </div>
                {this.state.loading ? <Loading/> : ''}
                {this.getNewNoteForm()}
            </div>
         );
    }
}
 
export default Notes;