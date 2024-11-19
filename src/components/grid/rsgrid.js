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
    onRowClick:
    orCellClick:
    onGridReady: method,
    enableRowSelect:false, // single, multiple
    is
 */
class RsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            selected_rows:[]
        }
        this.id = this.props.id ? this.props.id : 'grid';
        this.enableRowSelect = this.props.enableRowSelect ? this.props.enableRowSelect : false;// single, multiple
        this.grid = null;
        
    }
    componentDidMount(){
        this.initGrid()
        this.updateData(this.props.data ? this.props.data : [])
    }
    updateData(data){
        this.setState({
            data:data,
            selected_rows:[]
        })
    }

    initGrid(){
        if(this.props.onGridReady){
            this.props.onGridReady(this)
        }
    }
    refresh(){
        this.setState({
            selected_rows:[]
        })
    }
    onHeaderItemClick(hItem,hKey){
        if(hItem.onClick && typeof hItem.onClick == 'function'){
            hItem.onClick(hItem,hKey);
        }
    }
    onCellClickHandler(itemData,hItem,key,hKey,event){
        if(this.props.onCellClick){
            this.props.onCellClick(itemData,hItem,key,hKey)
        }
    } 
    onRowClickHanlder(itemData,rowKey,event){
        if(this.enableRowSelect){
            let selected_rows = this.state.selected_rows;
            
            if(selected_rows.includes(rowKey)){
                if(this.enableRowSelect == 'single'){
                    selected_rows = [];
                }else{
                    selected_rows = selected_rows.filter( keyItem => { return keyItem != rowKey})
                }

            }else{
                if(this.enableRowSelect == 'single'){
                    selected_rows = [rowKey]
                }else{
                    selected_rows.push(rowKey)
                }
                
            }
            
            this.setState({
                selected_rows:selected_rows
            })
        }
        
        if(this.props.onRowClick){
            this.props.onRowClick(itemData,rowKey,event)
        }
    }
    getRowActiveClass(rowKey){
        if(!this.enableRowSelect){
            return ""
        }
        if(rowKey){
            if(this.state.selected_rows.includes(rowKey)){
                return 'selected_row';
            }
        }
        return '';
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
                                        <th key={hKey} onClick={ this.onHeaderItemClick.bind(this,hItem,hKey) } className={hItem.className ? hItem.className : ''} style={hItem.style ? hItem.style : {}}>
                                            {
                                                hItem.headerCelRender ? hItem.headerCelRender(hItem,hKey) : <div className="header_item">
                                                <div dangerouslySetInnerHTML={{__html:hItem.title}}></div><span className="material-symbols-outlined">unfold_more</span>
                                            </div>
                                            }
                                            
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((itemData,key) => {
                                    return(
                                        <tr key={key} className={ this.getRowActiveClass(key + 1 ,itemData) } onClick={ this.onRowClickHanlder.bind(this,itemData,key + 1)}>
                                            {
                                                header.map( (hItem,hKey) => {
                                                    if(hItem.hide){
                                                        return <></>
                                                    }
                                                    return(
                                                        <td key={hKey} onClick={this.onCellClickHandler.bind(this,itemData,hItem,key,hKey)}>
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