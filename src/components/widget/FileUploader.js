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
    render() { 
        return (
            <div className="rs_file_uploader">
                <div className="rs_file_upload" id={this.id}>
                    <label>
                        <span class="material-symbols-outlined">cloud_upload</span>
                        <h3>Drag and Drop Files Here</h3>
                        <input style={{display:'none'}} type="file" title="Click to add Files"/>
                    </label>
                </div>
                <div className="media_list">
                    {
                        this.state.mediaList.map( (mediaItem, key) => {
                            return <div className="media_item"><img src={ Settings.apiUrl +'/public/'+ mediaItem.media_url} /></div>
                        })
                    }
                </div>
            </div>
        );
    }
}
 
export default FileUploader;