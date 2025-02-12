import Button from '@/components/forms/button';
import Panel from '@/components/widget/panel';
import React, { Component } from 'react';
import DealPipelineGrid from '@/components/deal/pipeline/DealPipelineGrid'
import Api from '@/inc/Api';
import Loading from '@/components/widget/Loading';
class DealPipelines extends Component {
    constructor(props){
        super(props);
        this.state = {
            activePipeline:'tr_br',
            isLoading:false,
            deals:{}
        }
    }
    componentDidMount(){
        this.loadDeals();
    }
    actionBtnHandler(tab_active){
        let that = this;
        this.setState({
            activePipeline:tab_active
        },function(){
            that.loadDeals()
        })
    }
    loadDeals(){
        let that = this, api = Api;
        api.setUserToken();
        that.setState({
            isLoading:true
        })
        let activePipeline = this.state.activePipeline;
        let data ={
            landlord_rep: activePipeline == 'sr_lr' ? 'yes' : 'no',
            seller_rep: activePipeline == 'sr_lr' ? 'yes' : 'no',
            tenant_rep: activePipeline == 'tr_br' ? 'yes' : 'no',
            buyer_rep: activePipeline == 'tr_br' ? 'yes' : 'no',
        }
        api.axios().post('/deal/pipeline',data).then(res => {
            
            if(res.data.type){
                that.setState({
                    isLoading:false,
                    deals:res.data.data.deal
                })
            }else{
                that.setState({
                    isLoading:false,
                    deals:{}
                })
            }
        })
    }
    render() {
        let activePipeline = this.state.activePipeline;
        let gridData = this.state.deals.data ? this.state.deals.data : []
        return (
            <div className='deal_pipeline_page'>
                <Panel>
                    <div className='dp_page_header'>
                        <div>
                            <div className='d-flex gap-2'>
                                <div><div className='btn_actions'><span onClick={() => { this.actionBtnHandler('tr_br')}} className={activePipeline == 'tr_br' ? 'active' : '' }>TR | BR</span><span onClick={() => { this.actionBtnHandler('sr_lr')}} className={activePipeline == 'sr_lr' ? 'active' : '' }>SR | LR</span></div></div>
                                <div>{this.state.isLoading ? <Loading/> : ''}</div>
                            </div>
                        </div>
                        <div>
                            <Button href="/deals/create" label="+ New Deal"/>
                        </div>
                    </div>
                    {activePipeline == 'tr_br' ? <DealPipelineGrid data={gridData} className="style_2"/> : <DealPipelineGrid data={gridData}/> }
                </Panel>
            </div>
        );
    }
}

export default DealPipelines;