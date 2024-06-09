import Button from '@/components/forms/button';
import React, { Component } from 'react';
import TeamAccess from './TeamAccess';
import Api from '@/inc/Api';
class CompanyTeamAccess extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadingRoles:false,
            roles:[],
            loading:false,
            accessList:[]
        }
    }
    componentDidMount(){
        this.loadRoles();
        this.loadAccessList();
    }
    loadAccessList(){
        let api = Api, that = this;
        that.setState({
            loading:true
        })
        api.setUserToken();
        api.axios().get('/company-access/members/'+this.props.company.company_id).then(res=>{
            that.setState({
                loading:false,
                accessList:res.data.data
            })
        })
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
    addNewItem(event){
        let newItem = {};
        let accessList = this.state.accessList;
        accessList.push(newItem)
        this.setState({
            accessList:accessList
        })
    }
    render() {
        let accessList = this.state.accessList;
        let roles = this.state.roles;
        let disable = this.props.disable  === true ? true : false;
        return (
            <div>
                <div className="new_team_access_list">
                    <div className='row'>
                        <div className='col-xs-12 col-sm-7'>Name</div>
                        <div className='col-xs-12 col-sm-3'>Access Level</div>
                        <div className='col-xs-12 col-sm-2'></div>
                    </div>
                    {accessList.length <=0 ? <p>No members</p> : ''}

                    { accessList.map( (access,key) => { return <TeamAccess disable={disable} company={this.props.company} access={access} key={key} roles={roles} />}) }
                </div>
                {disable ? '' : <Button label="+ Team Member" onClick={this.addNewItem.bind(this)}/> }
                
            </div>
        );
    }
}

export default CompanyTeamAccess;