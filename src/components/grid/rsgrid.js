import { Component } from "react";
import Button from "@/components/forms/Button";
/**
 * 
 * [
        {
            id:'star',
            title:'<span class="material-symbols-outlined">star_rate</span>',
            style:{width:'50px'},
            cellRender:(rowData,HeaderItem,CellKey,HeaderKey) => { }
        },
        {id:'company_name',title:'COMPANY NAME',style:{width:'100px'}},
    ]
 */
class RsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
        this.id = this.props.id ? this.props.id : 'grid';

        this.grid = null;
        this.header = this.props.header ? this.props.header : [];
    }
    componentDidMount(){
        this.initGrid()
        this.updateData(this.props.data ? this.props.data : [])
    }
    updateData(data){
        this.setState({
            data:data
        })
    }
    initGrid(){
        
    }
    onHeaderItemClick(hItem,hKey){
        if(hItem.onClick && typeof hItem.onClick == 'function'){
            hItem.onClick(hItem,hKey);
        }
    }
    render() {
        let data = this.props.data;
        return (
            <div className="rs_grid">
                <table className="table rs_grid_table">
                    <thead>
                        <tr>
                            {
                                this.header.map( (hItem,hKey) => {
                                    return(
                                        <th key={hKey} onClick={ this.onHeaderItemClick.bind(this,hItem,hKey) } className={hItem.className ? hItem.className : ''} style={hItem.style ? hItem.style : {}}><div className="header_item"><div dangerouslySetInnerHTML={{__html:hItem.title}}></div><span className="material-symbols-outlined">unfold_more</span></div></th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((itemData,key) => {
                                    return(
                                        <tr key={key}>
                                            {
                                                this.header.map( (hItem,hKey) => {
                                                    return(
                                                        <td key={hKey}>
                                                            {
                                                                hItem.cellRender ? hItem.cellRender(itemData,hItem,key,hKey) : <div className="item_data">{itemData[hItem.id]}</div>
                                                            }
                                                            
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                        
                                    
                                })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default RsGrid;