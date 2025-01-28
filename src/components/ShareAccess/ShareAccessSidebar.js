import React, { Component } from 'react';
import Button from '../forms/button';
import BorderBox from "@/components/widget/borderbox";
import Input from '../forms/Input';
import Api from '@/inc/Api';
import Checkbox from '../forms/checkbox';
import Dropdown from '../forms/Dropdown';
import Helper from '@/inc/Helper';
import Loading from '../widget/Loading';
class ShareAccessSidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isHide:true,
            loadingRoles:false,
            sBy:null,
            roles:[],
            selectedItem:[],
            searchResult:{
                
                data:{
                    data:[]
                }
            },
            accessList:[]
        }
        this.searchTimeout = null;
    }
    componentDidMount(){
        this.loadRoles();
        this.loadUsers();
        if(this.props.onReady){
            this.props.onReady(this);
        }
    }
    getData(){
        return this.state.accessList
    }
    showSidebar(){
        this.setState({isHide:false});
    }
    onSearchHander(event){
        this.setState({
            sBy: Helper.getNullableValue(event.target.value)
        })
        clearTimeout(this.searchTimeout);
        let that = this;
        this.searchTimeout = setTimeout(() => {
            that.loadUsers();
        }, 500);
    }
    loadUsers(){
        let that = this,api = Api;
        api.setUserToken();
        api.axios().get('/user/list?ppp=5&s='+this.state.sBy).then((response) => {
            that.setState({searchResult:response.data});
        }).catch((error) => {
        });
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
    onAddClickHandler(item,event){
        let accessList = this.state.accessList;
        if(accessList.find(x => x.user.id == item.id)){
            Helper.alert('User already added',{className:'error'});
            return;
        }
        accessList.push({
            user:item,
            role_id:null
        });
        this.setState({accessList:accessList});
    }
    onDeleteHandler(){
        let selectedItem = this.state.selectedItem;
        let accessList = this.state.accessList.filter(item => {
            return !selectedItem.includes(String(item.user.id) );
        });
        this.setState({accessList:accessList,selectedItem:[]});
    }
    onCancelClickHandler(){
        //Helper.alert('Cancel successful. No updates were made.',{className:'error'});
        this.setState({isHide:true});
    }
    onSaveHanlder(){
        //Helper.alert('Cancel saved.');
        this.setState({isHide:true});
    }
    onCheckboxClickedHanlder(event,value){
        let selectedItem = this.state.selectedItem;
        if(value == 'no'){
            selectedItem = selectedItem.filter(item => item != event.target.name);
            this.setState({selectedItem:selectedItem});
            return;
        }
        selectedItem.push(event.target.name);
        this.setState({selectedItem:selectedItem});
        //console.log(event,name)
    }
    onRoleChangeHanlder(item,value){
        let accessList = this.state.accessList;
        accessList = accessList.map( access => {
            if(access.user.id == item.user.id){
                access.role_id = value;
            }
            return access;
        })
        this.setState({accessList:accessList});
    }
    render() {
        if(this.state.isHide){
            return <></>;
        }
        let searchResult = this.state.searchResult;
        let accessOptions =  this.state.roles.map( item => {
            return {
                label:item.role_name,
                value:item.company_access_role_id
            }
        })
        if(this.state.loadingRoles){
            return <div className='share_access_sidebar text-center'><Loading/></div>
        }
        return (
            <div className='share_access_sidebar'>
                <div className='top_section'>
                    <BorderBox title="Add Users">
                        <Input icon="search" placeholder="Search User" onChange={ this.onSearchHander.bind(this)}/>
                        <div className='search_results mt-3'>
                            {
                                searchResult.data.data.map((item, key) => {
                                    return(
                                        <div className='d-flex justify-content-between align-items-center sr_item' key={key}>
                                            <div className='d-flex align-items-center'>
                                                <div><div className='sr_image' style={{backgroundImage:'url(http://localhost:3000/images/profile.png)'}}></div></div>
                                                <div className='sr_name'>{item.first_name} {item.last_name}</div>
                                            </div>
                                            <span className="material-symbols-outlined pls_icon" onClick={ this.onAddClickHandler.bind(this, item)}>add</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </BorderBox>
                    <BorderBox title={this.state.selectedItem.length >= 1 ? <><span>Manage Access </span> <span className='remove_items' onClick={this.onDeleteHandler.bind(this)}> <span className='material-symbols-outlined'>delete</span> Remove {this.state.selectedItem.length} user</span></>: "Manage Access"}>
                        <div className='search_results access_list_area'>
                            {
                                this.state.accessList.map((item, key) => {
                                        return(
                                            <div className='d-flex justify-content-between align-items-center sr_item access_list_item' key={key}>
                                                
                                                <div className='d-flex align-items-center justify-content-center'>
                                                    <div style={{width:'22px'}}><Checkbox id={'au_'+item.user.id} cb_style="simple" name={item.user.id} onChange={ this.onCheckboxClickedHanlder.bind(this)}/></div>
                                                    <div><div className='sr_image' style={{backgroundImage:'url(http://localhost:3000/images/profile.png)'}}></div></div>
                                                    <div className='sr_name'>{item.user.first_name} {item.user.last_name}</div>
                                                </div>
                                                <div className="actions">
                                                    <Dropdown options={accessOptions} value={item.role_id} onChange= { e => {this.onRoleChangeHanlder(item,e.target.value) }}/>
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                    </BorderBox>
                </div>
                
                <div className='sac_sidebar_footer d-flex justify-content-end'>
                    <Button className="no_bg" label="Cancel" onClick={this.onCancelClickHandler.bind(this)}/>
                    <Button label="Save" onClick= { this.onSaveHanlder.bind(this)} />
                </div>
            </div>
        );
    }
}

export default ShareAccessSidebar;