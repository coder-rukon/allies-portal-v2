import Helper from '@/inc/Helper';
import React, { Component } from 'react';

class DealStageTopBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            deal:null
        }
    }
    componentDidMount(){
        if(this.props.deal){
            this.setState({
                deal:this.props.deal
            })
        }
        if(this.props.onReady){
            this.props.onReady(this)
        }
    }
    getData(){
        return this.state.deal
    }
    onClickHanlder(step){
        this.setState({
            deal:{
                ...this.state.deal,
                deal_stage:step.id
            }
        })
        if(this.props.onChange){
            this.props.onChange(step.id)
        }
    }
    render() {
        let deal = this.state.deal;
        if(!deal){
            return;
        }
        let stages = Helper.getDealStage();
        let currentStage = Helper.getDealStageById(deal.deal_stage)
        return (
            <div className='deal_edit_top_bar'>
                <ul>
                    {
                        stages.map( (step,key)  => {
                            return <li key={key} className={currentStage.sn >= step.sn ? 'active' : ''} onClick={this.onClickHanlder.bind(this,step)}><span>{step.name}</span><img src="/images/icons/step-arrow.png"/></li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default DealStageTopBar;