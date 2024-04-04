"use client"
import { Component } from "react";
import $ from 'jquery';
import dmUploader from 'dm-file-uploader';
class FileUploader extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
    }
    componentDidMount(){
            if(typeof document !== 'undefined'){
                return;
            }
            $("#"+this.id).dmUploader({
                url: '/path/to/backend/upload.asp',
                onDragEnter:()=>{
                    $("#"+this.id).addClass('file_drag');
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
            </div>
        );
    }
}
 
export default FileUploader;