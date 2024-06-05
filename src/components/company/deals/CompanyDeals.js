import React, { Component } from 'react';
import Button from "@/components/forms/button";
class CompanyDeals extends Component {
    render() {
        let disable = this.props.disable  === true ? true : false;
        return (
            <div className="current_deals_demo">
                <p>No Current Deals</p>
                {disable ? "" : <Button label="+ Create Deal"/>}
            </div>
        );
    }
}

export default CompanyDeals;