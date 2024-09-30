import React, { Component } from 'react';
import Button from '../forms/button';
import Api from '@/inc/Api';
import axios from "axios";
import Helper from '@/inc/Helper';
import Settings from '@/inc/Settings';
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
                that.voiceTextResult = ''; 
                console.log(event.results)
                console.log(typeof event.results)
                for (const resultKey in event.results) {
                    if(event.results[resultKey].isFinal){
                        that.voiceTextResult += '<br/>'+event.results[resultKey][0].transcript;
                    }
                }
                
                document.getElementById('result').innerHTML = that.voiceTextResult;
            };
        }
    }
    makeChatGptRequest(){
        const apiKey = Settings.oky;
        const url = 'https://api.openai.com/v1/chat/completions';

        const headers = {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        };
      
        const data = {
          model: "gpt-3.5-turbo", // You can use "gpt-3.5-turbo" if you want
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "How are you?" }
          ]
        };
      
        axios.post(url, data, { headers }).then(res => {
            console.log(res)
        }).catch(error => {
            console.log('Error',error)
        })
    }
    render() {
        let isRecording = this.state.isRecording;
        return (
            <>
            <div className={isRecording ? 'voice_recoder_section '+'recording': 'voice_recoder_section'}>
                <span className="material-symbols-outlined voice_controller" onClick={this.onMicClickHander.bind(this)}>{isRecording ? 'mic' : 'mic_off'}</span>
                
            </div>
            <div id='result'></div>
            <Button label="Fill the form" onClick={ this.makeChatGptRequest.bind(this)}/>
            </>
        );
    }
}

export default VoiceRecorder;