import React, { Component } from 'react';

class TypeSubtypeDropdown extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedSubtypes:[
                {type_namme:'Industrial',subtype_name:'Distribution',subtype_id:1},
                {type_namme:'Office',subtype_name:'Abcd',subtype_id:2},
                {type_namme:'Hospitality',subtype_name:'Kye',subtype_id:3},
                {type_namme:'Retail',subtype_name:'Subtype',subtype_id:4}
            ]
        }
    }
    deleteItem(typesubtye){
        let selectedSubtypes = this.state.selectedSubtypes;
        let newSelectedItems = selectedSubtypes.filter(item => { return item.subtype_id == typesubtye.subtype_id ? null : item} );
        this.setState({
            selectedSubtypes:newSelectedItems
        })
    }
    render() {
        let selectedSubtypes = this.state.selectedSubtypes;
        return (
            <div className='type_subtype_dropdown_section'>
                <label className='controller_title'>Property Type/Subtype</label>
                <div className='selector_box'>
                    <div className='selector_input'>
                        {selectedSubtypes.length <=0 ? <p>Search property type/subtype</p> : ''}
                        {selectedSubtypes.map( (tysub,key) => {
                            return(
                                <div className='selected_item' key={key} >
                                    <strong className='t_name'>{tysub.type_namme}</strong>
                                    <span className='st_name'>- {tysub.type_namme}</span>
                                    <span className="material-symbols-outlined" onClick={e => this.deleteItem(tysub)}>close</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default TypeSubtypeDropdown;