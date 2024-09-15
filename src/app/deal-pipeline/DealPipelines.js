import Button from '@/components/forms/button';
import Panel from '@/components/widget/panel';
import React, { Component } from 'react';
import DealPipelineGrid from '@/components/deal/pipeline/DealPipelineGrid'
class DealPipelines extends Component {
    constructor(props){
        super(props);
        this.state = {
            activePipeline:'tr_br'
        }
    }
    actionBtnHandler(tab_active){
        this.setState({
            activePipeline:tab_active
        })
    }
    render() {
        let activePipeline = this.state.activePipeline;
        return (
            <div className='deal_pipeline_page'>
                <Panel>
                    <div className='dp_page_header'>
                        <div>
                            <div className='btn_actions'><span onClick={() => { this.actionBtnHandler('tr_br')}} className={activePipeline == 'tr_br' ? 'active' : '' }>TR | BR</span><span onClick={() => { this.actionBtnHandler('sr_lr')}} className={activePipeline == 'sr_lr' ? 'active' : '' }>SR | LR</span></div>
                        </div>
                        <div>
                            <Button href="/deal/create" label="+ New Deal"/>
                        </div>
                    </div>
                    {activePipeline == 'tr_br' ? <DealPipelineGrid className="style_2"/> : <DealPipelineGrid/> }
                </Panel>
            </div>
        );
    }
}

export default DealPipelines;