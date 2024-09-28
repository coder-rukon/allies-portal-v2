import React, { Component } from 'react';

class VoiceRecorder extends Component {
    constructor(props){
        super(props);
        this.state = {
            isRecording:false
        }
        this.recognition = null;
        this.voiceTextResult = '';
    }
    componentDidMount(){
        if(window){
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition){
                this.recognition = new SpeechRecognition();
                this.recognition.lang = 'en-US';  // Set language, can be changed as needed
                this.recognition.interimResults = false;  // Get final results only
                this.recognition.continuous = true; 
            }
        }
        
    }
    onMicClickHander(event){
        let that = this;
        if(this.state.isRecording){
            this.recognition.stop();
            this.voiceTextResult = '';
            that.setState({
                isRecording: false
            })
        }else{
            this.recognition.start();
            this.setState({
                isRecording: true
            })
            this.recognition.onresult = (event) => {
                that.voiceTextResult  += event.results[0][0].transcript;
                document.getElementById('result').textContent = that.voiceTextResult;
            };
        }
    }
    render() {
        let isRecording = this.state.isRecording;
        return (
            <>
            <div className={isRecording ? 'voice_recoder_section '+'recording': 'voice_recoder_section'}>
                <span className="material-symbols-outlined voice_controller" onClick={this.onMicClickHander.bind(this)}>{isRecording ? 'mic' : 'mic_off'}</span>
                
            </div>
            <div id='result'></div>
            </>
        );
    }
}

export default VoiceRecorder;