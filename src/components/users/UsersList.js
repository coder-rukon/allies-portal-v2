import React, { Component } from 'react';
import { connect } from "react-redux";
import RsGrid from "@/components/grid/rsgrid";
import Loading from "@/components/widget/Loading";
import Panel from "@/components/widget/panel";
import ActionsTypes from "@/inc/ActionTypes";
import Button from "@/components/forms/button";
import Helper from '@/inc/Helper';
import Api from '@/inc/Api';
class UsersList extends Component {
    constructor(props){
        super(props);
        this.state = {
            serverData:{},
            loading:false
        }
    }
    componentDidMount(){
        Helper.setPageData({
            title:"Users",
            pageTitle:"Users",
        })
        this.laodUsers();
    }
    laodUsers(){
        let that = this, api = Api;
        that.setState({
            loading:true
        })
        if(api.setUserToken()){
            api.axios().get('/user/list').then(res=>{
                that.setState({
                    loading:false,
                    serverData:res.data.data
                })
            }).catch(error => {
                that.setState({
                    loading:false
                })
            })
        }
    }
    render() {
        let gridheader = [
            {
                id:'full_name',
                hide:false,
                title:'Full name',
                cellRender:(rowData,HeaderItem,CellKey,HeaderKey) => { return rowData.first_name + ' ' + rowData.last_name }
            },
            {
                id:'email',
                hide:false,
                title:'Email'
            },
            
            {
                id:'user_role',
                hide:false,
                title:'Role',
            },
            {
                id:'status',
                hide:false,
                title:'Status',
            },
            {
                id:'actions',
                hide:false,
                title:'Actions',
            },
        ]
        let serverData = this.state.serverData;
        let gridData = serverData.data ? serverData.data : []
        return (
            <div className='user_listing_page'>
                
                <Panel>
                    <div className='d-flex justify-content-space-between mb-3'>
                        <div>
                        </div>
                        <div>
                            <Button label="+ Add User" href="/users/create"/>
                        </div>
                    </div>
                    {
                        this.state.loading ? <Loading/> : ''
                    }
                    <RsGrid header={gridheader} data={gridData}/>
                </Panel>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    
});
const mapDispatchToProps = (dispatch) => ({
    setOptions: (data) => dispatch({type:ActionsTypes.SET_OPTION,data:data}), // Map your state to props
});
export default connect(mapStateToProps,mapDispatchToProps) (UsersList)