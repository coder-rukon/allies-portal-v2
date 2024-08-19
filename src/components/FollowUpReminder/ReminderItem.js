import React, { Component } from 'react';
import Button from '../forms/button';
import Api from '@/inc/Api';
import Loading from '../widget/Loading';

class ReminderItem extends Component {
    constructor(props){
        super(props);
        this.state ={
            reminder:{},
            deleting:false,
            isDeleted:false,
        }
    }
    componentDidMount(){
        this.setState({
            reminder:this.props.reminder
        })
    }
    onDeleteHandler(event){
        let api = Api, that = this;
        this.setState({
            deleting:true
        })
        api.setUserToken();
        api.axios().post('/reminder/delete',{id:this.state.reminder.fr_id}).then(res => {
            that.setState({
                deleting:false,
                isDeleted:true
            })
        })
    }
    render() {
        let reminder = this.state.reminder;
        if(this.state.isDeleted){
            return<></>
        }
        return (
            <div className='reminder_single_item'>
                <div>
                    <h5 className='rm_date'>{reminder.reminder_date}</h5>
                    <div className='rm_details'>{reminder.details}</div>
                </div>
                <div>
                    {this.state.deleting ? <Loading/> : this.props.disable ? '' : <Button className="only_icon" icon="delete" onClick={this.onDeleteHandler.bind(this)}/>}
                </div>
                
            </div>
        );
    }
}

export default ReminderItem;