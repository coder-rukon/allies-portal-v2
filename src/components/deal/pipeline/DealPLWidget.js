import Link from 'next/link';
import React, { Component } from 'react';

const DealPLWidget = (props) => {
    return (
        <div className='dp_widget'>
            <Link href="/deals/edit/1" className='dpw_title'>7568 S Washington St</Link>
            <div className='dpw_contents'>
                Asking Rate - $7.25 PSF NNN <br/>
                Building SF - 10,000 SF<br/>
                Size - 1.49 acres<br/>
                Zoning - I-4
            </div>
            <div className='dpw_footer'>
                <div className='arrow_left'>
                    <span className='btn'><img src="/images/icons/arrow-left.png"/></span>
                </div>
                <div className='repo_name'><span>Buyer Repo</span></div>
                <div className='arrow_right'>
                    <span className='btn'><img src="/images/icons/arrow-right.png"/></span>
                </div>
            </div>
        </div>
    )
}

export default DealPLWidget;