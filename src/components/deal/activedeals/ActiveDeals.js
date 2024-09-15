"use client"
import Button from '@/components/forms/button';
import Input from '@/components/forms/Input';
import ActiveDealGrid from '@/components/deal/activedeals/ActiveDealGrid';
import Panel from '@/components/widget/panel';
import React, { Component } from 'react';

class ActiveDeals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiableActiveDeals:{
                br_tr:true,
                sr_lr:true 
            }
        }
    }
    componentDidMount(){
        
        
    }
    onSearchChangeHandler(event){

    }
    onClickViewButton(pType,event){
        let visiableActiveDeals = this.state.visiableActiveDeals;
        visiableActiveDeals[pType] = !visiableActiveDeals[pType];
        this.setState({
            visiableActiveDeals:visiableActiveDeals
        })
    }
    getActiveGrid(gridId,pType,title){
        
        return(
            <ActiveDealGrid onPropertyClick={ this.props?.onPropertyClick } gridId={gridId} propertyType={pType} title={title}/>
        )
    }
    render() { 
        
        let visiableActiveDeals = this.state.visiableActiveDeals;
        return ( 
            <div className="property_list_page ative_deal_listing">
                <Panel>
                    <div className="topfilter_section">
                        <div className="left_items">
                            <div className="form_s">
                                <Input name="search" placeholder="Search deals" onChange={ this.onSearchChangeHandler.bind(this) }/>
                            </div>
                            <div>
                                <Button label="BR | TR" onClick={this.onClickViewButton.bind(this,'br_tr')} className={!visiableActiveDeals.br_tr ? "bordered" : ''}/>
                            </div>
                            <div>
                                <Button label="SR | LR"  onClick={this.onClickViewButton.bind(this,'sr_lr')} className={!visiableActiveDeals.sr_lr ? "bordered" : ''}/>
                            </div>
                        </div>
                        <div className="right_items">
                            <Button href="/deal/create" label="+ New Deal"/>
                        </div>
                    </div>
                    <div className='active_grids'>
                        {visiableActiveDeals.br_tr ? this.getActiveGrid('br_tr_grid','br_tr','BR | TR') : ''}
                        {visiableActiveDeals.sr_lr ? this.getActiveGrid('sr_lr_grid','br_tr','SR | LR') : ''}
                    </div>
                </Panel>
            </div>
        );
    }
}

export default ActiveDeals;