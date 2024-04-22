"use client"
import { Component } from "react";
import $ from 'jquery';
import dmUploader from 'dm-file-uploader';
import Settings from "@/inc/Settings";
import Helper from "@/inc/Helper";
import Api from "@/inc/Api";
class FileUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaList:[]
        }
        this.id = this.props.id ? this.props.id : 'rs_media_upload';
    }
  
    componentDidMount(){
        this.initForSourceAndIntegrator();
        this.initForExportable();
    }
    initForExportable(){
        if(!this.props.exportable ){
            return;
        }
        $("#"+this.id).dmUploader({
            
            onDragEnter:()=>{
                $("#"+this.id).addClass('file_drag');
            },
            onComplete:()=>{
                that.loadMediaList()
            },
            onDragLeave:()=>{
                $("#"+this.id).removeClass('file_drag');
            },
            onInit: function(){
                console.log('Callback: Plugin initialized');
            },
            onUploadProgress: (id,percentage) => {
                console.log(id)
            }

            // ... More callbacks
        });
    }
    initForSourceAndIntegrator(){
        if(this.props.exportable ){
            return;
        }
        let that = this;
        this.loadMediaList()
        $("#"+this.id).dmUploader({
            url: Settings.apiUrl+'/media/upload',
            headers: {
                Accept: 'application/json',
                withCredentials: true,
                Authorization: 'Bearer ' + Helper.getCookie(Settings.userTokenKey)
            },
            extraData:{
                source: this.props.source ? this.props.source : null,
                integrator: this.props.integrator ? this.props.integrator : null
            },
            onDragEnter:()=>{
                $("#"+this.id).addClass('file_drag');
            },
            onComplete:()=>{
                that.loadMediaList()
            },
            onDragLeave:()=>{
                $("#"+this.id).removeClass('file_drag');
            },
            onInit: function(){
                console.log('Callback: Plugin initialized');
            },
            onUploadProgress: (id,percentage) => {
                console.log(id)
            }

            // ... More callbacks
        });
    }
    loadMediaList(){
        let api = Api;
        let that = this;
        if(api.setUserToken()){
            api.axios().get('/media/'+this.props.source+'/'+this.props.integrator).then(res=>{
                that.setState({
                    mediaList: res.data.data
                })
            })
        }

    }
    deleteHandler(item){
        let that = this, api = Api;
        api.setUserToken();
        api.axios().get( '/media/delete/'+item.media_id ).then(function(res){
            that.loadMediaList();
        })

    }
    render() { 
        return (
            <div className="rs_file_uploader">
                <div className="rs_file_upload" id={this.id}>
                    <label>
                        <span className="material-symbols-outlined">cloud_upload</span>
                        <h3>Drag and Drop Files Here</h3>
                        <input style={{display:'none'}} type="file" title="Click to add Files"/>
                    </label>
                </div>
                <div className="media_list">
                    {
                        this.state.mediaList.map( (mediaItem, key) => {
                            let thumbnail = <div className="media_item_thumbnail"><span className="del_btn" onClick={ () => this.deleteHandler(mediaItem) }><span className="material-symbols-outlined">delete</span></span><span className="material-symbols-outlined file_icon">description</span></div>;
                            if(mediaItem.media_url.match(/\.(jpeg|jpg|gif|png)$/) != null){
                                thumbnail = <div className="media_item_thumbnail"><span className="del_btn"  onClick={ () => this.deleteHandler(mediaItem) }><span className="material-symbols-outlined">delete</span></span><img src={ mediaItem.media_url} /></div>
                            }
                            if(mediaItem.media_url.match(/\.(pdf)$/) != null){
                                thumbnail = <div className="media_item_thumbnail"><span className="del_btn"  onClick={ () => this.deleteHandler(mediaItem) }><span className="material-symbols-outlined">delete</span></span><span className="material-symbols-outlined file_icon">picture_as_pdf</span></div>
                            }
                            
                            return(
                                <div className="media_item" key={key}>
                                    {thumbnail} 
                                    <div className="media_item_text">{mediaItem.media_name}</div> 
                                    <div className="media_item_action">
                                        <a href={ mediaItem.media_url} target="_blank">View</a>
                                        <hr style={{margin:'4px 0'}}/>
                                        <a href={ Settings.apiAppUrl + '/download/?dl=' + mediaItem.media_uri  } target="_blank">Downlaod</a>
                                    </div>
                                </div>
                            )
                            
                        })
                    }
                </div>
            </div>
        );
    }
}
 
export default FileUploader;