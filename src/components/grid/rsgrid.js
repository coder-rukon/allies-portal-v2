import { Component } from "react";
/**
 * 
 * Header: [
        {
            id:'star',
            hide:false,
            title:'<span class="material-symbols-outlined">star_rate</span>',
            style:{width:'50px'},
            cellRender:(rowData,HeaderItem,CellKey,HeaderKey) => { }
        },
        {id:'company_name',title:'COMPANY NAME',style:{width:'100px'}},
    ]
    onGridReady: method
 */
class RsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
        this.id = this.props.id ? this.props.id : 'grid';

        this.grid = null;
        
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
        if(this.props.onGridReady){
            this.props.onGridReady(this)
        }
    }
    onHeaderItemClick(hItem,hKey){
        if(hItem.onClick && typeof hItem.onClick == 'function'){
            hItem.onClick(hItem,hKey);
        }
    }
    render() {
        let data = this.props.data;
        let header = this.props.header;
        return (
            <div className="rs_grid">
                <table className="table rs_grid_table">
                    <thead>
                        <tr>
                            {
                                header.map( (hItem,hKey) => {
                                    if(hItem.hide){
                                        return <></>
                                    }
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
                                                header.map( (hItem,hKey) => {
                                                    if(hItem.hide){
                                                        return <></>
                                                    }
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