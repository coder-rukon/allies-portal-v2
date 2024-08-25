import React, { Component } from 'react';
import Button from '@/components/forms/button';
import Api from '@/inc/Api';
import TeamAccessItem from './TeamAccessItem';
import Input from '@/components/forms/Input';
import Dropdown from '@/components/forms/Dropdown';
import Loading from '@/components/widget/Loading';
import ErrorMessage from '@/components/widget/errormessage';
import AlertMessage from '@/components/widget/AlertMessage';
class TeamAccessExportable extends Component {
    constructor(props){
        super(props);
        this.state = {
            accessList:[],
            showForm:false,
            findingEmail:false,
            errors:null,
            formData:{
                email:'',
                role_id:''
            },
            roles:[]
        }
    }
    componentDidMount(){
        this.loadRoles()
        if(this.props.onReady){
            this.props.onReady(this);
        }
    }
    getData(){
        return this.state.accessList;
    }
    loadRoles(){
        let api = Api, that = this;
        that.setState({
            loadingRoles:true
        })
        api.setUserToken();
        api.axios().get('/cmp-access-role').then(res=>{
            that.setState({
                loadingRoles:false,
                roles:res.data.data
            })
        })
    }
    setData(data){
        this.setState(data);
    }
    onItemChange(item){
        
    }
    finUser(event){
        let formdata = this.state.formData;
        let api = Api,that = this;
        this.setState({
            errors:null,
            findingEmail:true
        })
        if(api.setUserToken()){
            api.axios().post('/user/search',{email:formdata.email}).then(res=>{
                if(res.data.type){
                    let allUsers = that.state.accessList;
                    allUsers.push({
                        ...res.data.data,
                        role_id:formdata.role_id
                    })
                    that.setState({
                        accessList:allUsers,
                        errors:null,
                        findingEmail:false
                    })
                }else{
                    that.setState({
                        errors:res.data.message,
                        findingEmail:false
                    })
                }
            })
        }
        
    }
    inputChangeHalder(event){
        let formData = this.state.formData;
        this.setState({
            errors:null,
            formData:{
                ...formData,
                [event.target.name]:event.target.value
            }
        })
    }
    getForm(){
        if(!this.state.showForm){
            return;
        }
        let access = this.state.access;
        let roles = this.state.roles ? this.state.roles : [];
        roles = roles.map( role => {
            return {
                label: role.role_name,
                value: role.company_access_role_id
            }
        })
        let formData = this.state.formData;
        return(
            <div className='row access_form'>
                <div className='col-xs-12 col-sm-6'>
                   <Input name="email" errors={this.state.errors} placeholder="Email address"  value={formData.email} onChange={this.inputChangeHalder.bind(this)} />
                    {this.state.errors ? <AlertMessage message={this.state.errors} type="text-danger"/> : ''}
                </div>
                <div className='col-xs-12 col-sm-3'>
                    <Dropdown name="role_id" value={formData.role_id} options={roles} onChange={this.inputChangeHalder.bind(this)}  />
                </div>
                
                <div className='col-xs-12 col-sm-3'>
                    <div className='d-flex gap-2 mt-2 justify-content-end' style={{paddingRight:'10px'}}>
                        {this.state.findingEmail ? <Loading/> : <Button icon="data_loss_prevention" label="Search" className="only_icon" onClick={ this.finUser.bind(this)} /> }
                    </div>
                </div>
            </div>
        )
        
    }
    render() {
       
        return (
            <div className='exportable_team_access'>
                <div className="new_team_access_list">
                    <div className='row access_form'>
                        <div className='col-xs-12 col-sm-5'>
                            Name
                        </div>
                        <div className='col-xs-12 col-sm-3'>
                            Access Level
                        </div>
                        <div className='col-xs-12 col-sm-4'>
                        </div>
                    </div>
                    {this.state.accessList.length <= 0 ? <p>No other user access</p> : ''}
                    {
                        this.state.accessList.map( (item,key) => {
                            return <TeamAccessItem roles ={this.state.roles} key ={key} access={item} onChange={ item => this.onItemChange(item)} />
                        })
                    }
                </div>
                {this.getForm()}
                <Button label="+ Team Member" onClick={ e => { this.setState({showForm:!this.state.showForm})}} roles = {this.state.roles}/>
            </div>
        );
    }
}

export default TeamAccessExportable;