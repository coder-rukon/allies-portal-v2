import Dropdown from '@/components/forms/Dropdown';
import Input from '@/components/forms/Input';
import Button from '@/components/forms/button';
import Checkbox from '@/components/forms/checkbox';
import Loading from '@/components/widget/Loading';
import Panel from '@/components/widget/panel';
import Api from '@/inc/Api';
import React, { Component } from 'react';

class RoleDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            deleted:false,
            deleting:false,
            role: {
                company_access:''
            }
        }
    }
    componentDidMount(){
        this.setState({
            role:this.props.role
        })
    }
    onChnageHandler(event){
        let role = this.state.role;
        this.setState({
            role:{
                ...role,
                [event.target.name]:event.target.value
            }
        })
    }
    onInputChangeHandler(event){
        let role = this.state.role;
        this.setState({
            role:{
                ...role,
                [event.target.name]:event.target.value
            }
        })
    }
    onSaveHandler(){
        let role = this.state.role;
        let api = Api, that = this;
        this.setState({
            loading:true
        })
        api.axios().put('/cmp-access-role/'+role.company_access_role_id,role).then(res=>{
            that.setState({
                loading:false
            })
        })
    }
    onDeleteHandler(){
        let role = this.state.role;
        let api = Api, that = this;
        this.setState({
            deleting:true
        })
        api.axios().post('/cmp-access-role/delete/'+role.company_access_role_id).then(res=>{
            that.setState({
                deleting:false,
                delete:true
            })
        })
    }
    render() {
        let role = this.state.role;
        if(this.state.delete){
            return <></>
        }
        let options =[
            {label:'Full Access', value:'full'},
            {label:'Read only / View Only', value:'readonly'},
            {label:'No Access', value:'no_access'},
        ];
        return (
            <Panel title={role.role_name} className="borderd mb-3">
                <div className='role_item'>
                    <Input name="role_name" value={role.role_name} onChange={ this.onInputChangeHandler.bind(this)} lable="Role Name" />
                    <div className='d-flex gap-3'>
                        <Dropdown label="Company access" options={options} name="company_access" value={role.company_access} onChange = { this.onChnageHandler.bind(this)} />
                        <Dropdown label="Property Access" options={options} name="property_access" value={role.property_access} onChange = { this.onChnageHandler.bind(this)} />
                        <Dropdown label="Deal access" options={options} name="deals_access" value={role.deals_access} onChange = { this.onChnageHandler.bind(this)} />
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    { this.state.loading ? <Loading/> : <Button label="Save" onClick={this.onSaveHandler.bind(this)}/> }
                    { this.state.deleting ? <Loading/> : <Button label="Delete" className="danger"  onClick={this.onDeleteHandler.bind(this)}/>}
                    
                </div>
            </Panel>
            
        );
    }
}

export default RoleDetails;