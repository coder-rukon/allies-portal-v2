"use client"
import Axios from "axios"
import Settings from './Settings';

let Helper = {
    getUniqueId:(prefix='id') => {
        return prefix + Math.random().toString(16).slice(2)
    },
    setPageData(newData = {}){
        document.title = newData?.title;
        document.getElementById('h_title').innerHTML = newData?.pageTitle;
    },
    alert(message,options,selector = null){
        /*
        let defaultOptions = {
            elementPosition: 'top right',
            globalPosition: 'top right',
            style: 'bootstrap',
            className: 'success',
            ...options
        }
        if(selector){
            selector.notify(message, defaultOptions);
        }else{
            $.notify(message, defaultOptions);
        }
        */
    },
    confirmMe(confirmFunction,bodyMessage,cancelFunction='',title){
        /*
        $('<div>'+bodyMessage+'</div>').dialog({
             modal: true,
             zIndex: 30005,
             title:title,
             buttons: {
                "Yes": function() {
                    confirmFunction()
                    $( this ).dialog( "close" );
                },
                Cancel: function() {
                    if(cancelFunction){
                        cancelFunction()
                    }
                  $( this ).dialog( "close" );
                }
            }
        });
        */
    },
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    },
    tenancyOptions(data){
        return [
            {value:'1',label:'Single'},
            {value:'2',label:'Multi'},
            //{id:'3',label:'Triple'}
        ]
    },
    formateDateFromDb(dateDateString,formate = null){
        const d = new Date(dateDateString);
        d.toLocaleDateString('en-US')
        return (d.getMonth() + 1 )  + '/' + d.getDate()+ '/'+d.getFullYear();
    },
    getNullableValue(data){
        if(data == '' || typeof data ==='undefined'){
            return null;
        }
        return data;
    },
    getDatePickerFormate(){
        return 'm/d/Y';
    },
    formateDate(dateString){
        const d = new Date(dateString);
        d.toLocaleDateString('en-US');
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const timeWithAmPm = d.toLocaleTimeString('en-US', options);
        return (d.getMonth() + 1 )  + '/' + d.getDate()+ '/'+d.getFullYear() + ' ' +timeWithAmPm;
    },
    getAdditionalType(){
        /*
        let propertyTypes = [
            {label:'Industrial' , value:"industrial"},
            {label:'Office' , value:"office"},
            {label:'Retail' , value:"retail"}
        ]*/
        let propertyTypes = [
            {id:'11',name:'Industrial',slug:'industrial'},
            {id:'12',name:'Office',slug:'office'},
            {id:'13',name:'Retail',slug:'retail'},
            {id:'14',name:'Land',slug:'land'}
        ]
        return propertyTypes;
    },
    getPropertyType(typeId = null){
        let types =[
            { pt_id:'1',label:'Retail'},
            { pt_id:'2',label:'Multifamily'},
            { pt_id:'3',label:'Office'},
            { pt_id:'4',label:'Industrial'},
            { pt_id:'5',label:'Hospitality'},
            { pt_id:'6',label:'Land'},
            { pt_id:'7',label:'Special Purpose'},
            { pt_id:'8',label:'Mixed Use'},
            { pt_id:'9',label:'Self Storage'},
            { pt_id:'10',label:'Mobile Home Park'},
            { pt_id:'11',label:'Senior Living'},
            { pt_id:'12',label:'Note/Loan'}
        ]
        if(!typeId){
            return types;
        }
        let output = types.find( item => item.pt_id == typeId );
        return  typeof output == 'undefined' ? null : output;
    },
    getPropertyStatus(){
        let options = [
            {label:'Available',value:'available'},
            {label:'Not Available',value:'not_available'},
        ]
        return options;
    },
    getPropertySubmarket(propertyType =null,listingType=null){
        let options = [
            {value:'CBD',label:'CBD'},
            {value:'Midtown',label:'Midtown'},
            {value:'Fishers',label:'Fishers'},
            {value:'Keystone',label:'Keystone'},
            {value:'North/Carmel',label:'North/Carmel'},
            {value:'Northeast',label:'Northeast'},
            {value:'Northwest',label:'Northwest'},
            {value:'South',label:'South'},
            {value:'West',label:'West'}
        ]
        return options;
    },
    getPropertyClass(propertyType =null,listingType=null){
        
        let options = [
            {value:'A',label:'A'},
            {value:'B',label:'B'},
            {value:'C',label:'C'},
        ]
        return options;
    },
    getPropertyAvailableUnits(propertyType =null,listingType=null){
        
        let options = [
            {value:'To Site',label:'To Site'},
            {value:'Near Site',label:'Near Site'},
            {value:'None',label:'None'},
        ]
        return options;
    },
    getDealStage(){
        let stage = [
                {id:'initial_meeting',name:'Initial Meeting'},
                {id:'initial_meeting',name:'Client Engagement'},
                {id:'initial_meeting',name:'Marketing in Progress'},
                {id:'initial_meeting',name:'Proposal/LOI'},
                {id:'initial_meeting',name:'Purchase & Lease Agreement'},
                {id:'initial_meeting',name:'Completed'},
        ]
        return stage;
    },    
    prospectSource(){
        let soures = Settings.getCompanySource()
        return soures;
    },
    prospectType(){
        let types = [
                {value:'sr_lr_prospecting',label:'SR | LR Prospecting'},
                {value:'br_tr_prospecting',label:'BR | TR Prospecting'},
                {value:'list_of_all_listings',label:'List of all Listings'}
        ]
        return types;
    },
    getActivityTypes(typeId){
        let options = [
            {value:'1',label:'Call'},
            {value:'2',label:'Email'},
            {value:'3',label:'In-Person Meeting'},
            {value:'4',label:'Task'}
        ]
        if(typeId){
            return options.find( item => typeId == item.value)
        }
        return options;
    },
}
export default Helper;