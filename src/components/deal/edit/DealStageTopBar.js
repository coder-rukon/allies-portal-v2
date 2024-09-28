import Helper from '@/inc/Helper';
import React, { Component } from 'react';

class DealStageTopBar extends Component {
    render() {
        let stages = Helper.getDealStage()
        return (
            <div className='deal_edit_top_bar'>
                <ul>
                    {
                        stages.map( (step,key)  => {
                            return <li key={key}><span>{step.name}</span><img src="/images/icons/step-arrow.png"/></li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default DealStageTopBar;