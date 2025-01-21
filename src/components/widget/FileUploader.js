"use client"
import React, { Component } from 'react';
import $ from 'jquery';
import dmUploader from 'dm-file-uploader';
import Settings from "@/inc/Settings";
import Helper from "@/inc/Helper";
import Api from "@/inc/Api";
class FileUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaList:[],
            exportableFiles:[],
        }
        this.id = this.props.id ? this.props.id : 'rs_media_upload';
        this.fileSize1Mb = 1000000;
    }
  
    componentDidMount(){
        this.initForSourceAndIntegrator();
        this.initForExportable();
        if(this.props.onReady){
            this.props.onReady(this)
        }
    }
    initForExportable(){
        if(!this.props.exportable ){
            return;
        }
        let options = {
            
            onDragEnter:()=>{
                $("#"+this.id).addClass('file_drag');
            },
            onNewFile:(id, file)=>{
                let exportableFiles = this.state.exportableFiles;
                if(this.props.isSingle){
                    exportableFiles = [
                        {
                            file_id: id,
                            file:file
                        }
                    ]
                }else{
                    exportableFiles.push({
                        file_id: id,
                        file:file
                    })
                }
                
                
                this.setState({
                    exportableFiles:exportableFiles
                })
            },
            onDragLeave:()=>{
                $("#"+this.id).removeClass('file_drag');
            },
            onInit: function(){
                console.log('Callback: Plugin initialized');
            },
            onUploadProgress: (id,percentage) => {
                //console.log(id)
            },
            onFileSizeError:() =>{
                alert("Maximum file size "+ this.props.maxFileSize+"MB")
            },
            onFileExtError:() =>{
                alert("We accept file types are  : "+ this.props.extFilter.toString())
            },

            // ... More callbacks
        };
        if(this.props.maxFileSize){
            options.maxFileSize = this.fileSize1Mb * this.props.maxFileSize;
        }
        if(this.props.extFilter){
            options.extFilter = this.props.extFilter;
        }
        $("#"+this.id).dmUploader(options);
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
            },
            onNewFile(id,file){
                console.log(file);
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
    deleteExportItem(file_item){
        let exportableFiles = this.state.exportableFiles;
        let newExportableFile = exportableFiles.filter( file => {
            return file.file_id != file_item.file_id ? file : null;
        })
        this.setState({
            exportableFiles:newExportableFile
        })
        return false;
    }
    hasExportableFile(){
        if(this.getExportableFiles().length >=1){
            return true;
        }
        return false;
    }
    getExportableFiles(){
        return this.state.exportableFiles;
    }
    uploadExportableFiles(source,integrator,callabck = null){
        let api = Api, that = this;
        if(api.setUserToken()){
            let data = {
                source:source,
                integrator:integrator,
                file: this.state.exportableFiles.map( file => { return file.file})
            }
            api.axios().post(Settings.apiUrl+'/media/upload',data,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            }).then(res => {
                if(callabck && typeof callabck =='function'){
                    callabck(res)
                }
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
        let wraperClass = 'rs_file_uploader';
        if(this.props.border === true){
            wraperClass+=' uploadsection_border'
        }
        return (
            <div className={wraperClass}>
                <div className="rs_file_upload" id={this.id}>
                    <label>
                        <span className="material-symbols-outlined">cloud_upload</span>
                        <h3>Drag and Drop Files Here</h3>
                        <input style={{display:'none'}} type="file" title="Click to add Files"/>
                    </label>
                </div>
                {
                    this.props.extFilter || this.props.maxFileSize ? <div className='file_size_and_type'>
                    {this.props.extFilter ? <span>Supported formats: {this.props.extFilter.toString()}</span> : ''}
                    {this.props.maxFileSize ? <span>Maximum size: {this.props.maxFileSize}MB</span> : ''}
                </div> : ''
                }
                
                <div className="media_list">
                    {
                        this.state.exportableFiles.map( (file_item, fileKey) => {
                            let thumbnail = <div className="media_item_thumbnail"><span className="material-symbols-outlined file_icon">description</span></div>;

                            return(
                                <div className="media_item" key={fileKey}>
                                    {thumbnail} 
                                    <div className="media_item_text">{file_item.file.name}</div> 
                                    <div className="media_item_action">
                                        <span  onClick={ () => { this.deleteExportItem(file_item) } }>
                                            <span className="material-symbols-outlined">close</span>
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
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