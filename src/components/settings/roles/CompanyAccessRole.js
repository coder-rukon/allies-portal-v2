import Input from '@/components/forms/Input';
import Button from '@/components/forms/button';
import Loading from '@/components/widget/Loading';
import Api from '@/inc/Api';
import React, { Component } from 'react';
import RoleDetails from '@/components/settings/roles/RoleDetails'

class CompanyAccessRole extends Component {
    constructor(props){
        super(props);
        this.state = {
            message:null,
            isCreating:false,
            loading:false,
            roles:[]
        }
    }
    componentDidMount(){
        this.loadRoles()
    }
    loadRoles(){
        let api = Api, that = this;
        that.setState({
            loading:true
        })
        api.setUserToken();
        api.axios().get('/cmp-access-role').then(res=>{
            that.setState({
                loading:false,
                roles:res.data.data
            })
            
        })
    }
    onCreateHanlder(){
        let api = Api, that = this;
        that.setState({
            isCreating:true
        })
        let data = {
            role_name: document.getElementById('new_role_input').value
        }
        api.setUserToken();
        api.axios().post('/cmp-access-role',data).then(res => {
            document.getElementById('new_role_input').value = ""
            that.setState({
                message:res.data.message,
                isCreating:false
            })
            that.loadRoles()
        })
    }
    render() {
        return (
            <div>
                <div className='d-flex gap-3'>
                    <div>
                        <Input name="name" id="new_role_input" placeholder="Role name" />
                    </div>
                    <div>
                        { this.state.isCreating ? <Loading/> : <Button label="Create" onClick = { this.onCreateHanlder.bind(this)} /> }
                        
                    </div>
                </div>
                <div className='all_roles'>
                    {this.state.roles.map( (role , key) => {
                        return <RoleDetails  key={ key} role ={role}/>
                    })}
                </div>
            </div>
        );
    }
}

export default CompanyAccessRole;