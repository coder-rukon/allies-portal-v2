import React, { Component } from 'react';
import DealPLWidget from './DealPLWidget';
import Helper from '@/inc/Helper';
class DealPipelineGrid extends Component {
    getHeader(){
        let headers = Helper.getDealStage();
        return headers;
    }
    render() {
        console.log('allData',this.props.data)
        let header = this.getHeader();
        return (
            <div className={this.props.className  ? 'deal_pipeline_grid '+ this.props.className : 'deal_pipeline_grid'}>
                <div className='table-responsive'>
                    <table className="table">
                        <thead>
                            <tr>
                                {
                                    header.map( (item,key) => {
                                        let thisStageItems = this.props.data.filter((stageItem) => stageItem.deal_stage  == item.id);
                                        return(
                                            <th scope="col" key={key}>
                                                <div className='dpg_header'>
                                                    <div className='name'><span>{item.name}</span></div>
                                                    <div className='count'>{thisStageItems.length} Deals</div>
                                                </div>
                                            </th>
                                        )
                                    })
                                }
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                {
                                        header.map( (bodyItem,bodyItemKey) => {
                                            let thisStageItems = this.props.data.filter((stageItem) => stageItem.deal_stage  == bodyItem.id);
                                        return(
                                            <td key={bodyItemKey}>
                                                {
                                                    thisStageItems.map( (stageItemData,siKey) => {
                                                        return <DealPLWidget key={siKey} deal={stageItemData}/>
                                                    })
                                                }
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
        );
    }
}

export default DealPipelineGrid;