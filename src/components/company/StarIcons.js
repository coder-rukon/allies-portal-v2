import Api from '@/inc/Api';
import Settings from '@/inc/Settings';
import React, { Component } from 'react';
import Loading from '../widget/Loading';

class StarIcons extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            isShowPopup:false,
            company:this.props.company
        }
    }
    componentDidUpdate(prevProps) {
        // Compare current props with previous props
        /*
        if (this.state.company?.color_status_id !== this.props.company?.color_status_id) {
          this.setState({
            company:this.props.company
          })
        }
        */
    }
    updateCompanyStatus(color){
        if(this.props.onItemClick){
            this.setState({
                company:{
                    ...this.state.company,
                    color_status_id:color.id
                },
                isShowPopup:false,
            })
            this.props.onItemClick(color)
            return;
        }
        this.setState({
            isLoading:true
        })
        let api = Api, that = this;
        api.setUserToken();
        let data = {
            company_id: this.state.company?.company_id,
            color_status: color.id,
        }
        api.axios().post('/company/update-color-status',data).then(res => {
            that.setState({
                company:{
                    ...res.data.data.company
                },
                isShowPopup:false,
                isLoading:false
            })
        })
    }
    
    showPopup(event){
        this.setState({
            isShowPopup: !this.state.isShowPopup
        })
    }
    getColorCodeById(color_status_id){
        let colorCode = "";
        Settings.companyColorStatus.forEach(color => {
            if(color.id == color_status_id){
                colorCode = color.color;
            }
        })
        return colorCode;
    }
    getPopup(){
        if(!this.state.isShowPopup){
            return;
        }
        let colorStatus = Settings.companyColorStatus;
        return(
            <div className='all_star'>
                {
                    colorStatus.map( (color,key) => {
                        return <span key={key} class="star_icon" onClick={ event => { this.updateCompanyStatus(color)}} ><img src={'/images/icons/star_color_'+color.id+'.png'}/></span>
                    })
                }
            </div>
        )
    }
    render() {
        let company = this.state.company;
        if(this.state.isLoading){
            return <Loading/>
        }

        return (
            <div className='grid_status_star'>
                <span class="material-symbols-outlined active" style={{color:this.getColorCodeById(company.color_status_id)}} onClick={ this.showPopup.bind(this) }>star_rate</span>
                { this.getPopup() }
            </div>
        );
    }
}

export default StarIcons;