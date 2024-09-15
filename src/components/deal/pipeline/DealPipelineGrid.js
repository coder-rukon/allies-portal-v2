import React, { Component } from 'react';
import DealPLWidget from './DealPLWidget';
class DealPipelineGrid extends Component {
    getHeader(){
        let headers = [
                {id:'initial_meeting',name:'Initial Meeting',items:10},
                {id:'initial_meeting',name:'Client Engagement',items:10},
                {id:'initial_meeting',name:'Marketing in Progress',items:10},
                {id:'initial_meeting',name:'Proposal/LOI',items:10},
                {id:'initial_meeting',name:'Purchase & Lease Agreement',items:10},
                {id:'initial_meeting',name:'Completed',items:10},
            ];
        return headers;
    }
    render() {

        return (
            <div className={this.props.className  ? 'deal_pipeline_grid '+ this.props.className : 'deal_pipeline_grid'}>
                <div className='table-responsive'>
                    <table class="table">
                        <thead>
                            <tr>
                                {
                                    this.getHeader().map( (item,key) => {
                                        return(
                                            <th scope="col" key={key}>
                                                <div className='dpg_header'>
                                                    <div className='name'><span>{item.name}</span></div>
                                                    <div className='count'>{item.items} Entries</div>
                                                </div>
                                            </th>
                                        )
                                    })
                                }
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {
                                        this.getHeader().map( (item,key) => {
                                        return(
                                            <td key={key}>
                                                <DealPLWidget/>
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