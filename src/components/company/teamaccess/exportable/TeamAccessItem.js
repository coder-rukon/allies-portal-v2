import React, { Component } from 'react';
import Button from '@/components/forms/button';
class TeamAccessItem extends Component {
    constructor(props){
        super(props);
        this.state ={
            isDeleted:false,
            email:''
        }
    }
    onDeleteHandler(event){
        this.setState({
            isDeleted:true
        })
    }
    render() {
        let access = this.props.access;
        let roles = this.props.roles;
        if(this.state.isDeleted){
            return<></>
        }
        let selectedRole = roles.find( item => item.company_access_role_id == access.role_id)
        return(
            <div className='row access_form'>
                <div className='col-xs-12 col-sm-6'>
                    {access.first_name +' ' + access.last_name}
                </div>
                <div className='col-xs-12 col-sm-3'>
                    {selectedRole?.role_name}
                </div>
                <div className='col-xs-12 col-sm-3'>
                    <div className='d-flex gap-2 mt-2 justify-content-end' style={{paddingRight:'10px'}}>
                        <Button icon="delete" className="only_icon" onClick={this.onDeleteHandler.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
}

export default TeamAccessItem;