"use client"
import Axios from "axios"
import Settings from './Settings';

let Helper = {
    getUniqueId:(prefix='id') => {
        return prefix + Math.random().toString(16).slice(2)
    },
    setPageData(newData = {}){
        if (typeof document !== "undefined") {
            document.title = newData?.title;
            document.getElementById('h_title').innerHTML = newData?.pageTitle;
        }
        
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
            {id:'1',label:'Single'},
            {id:'2',label:'Multi'},
            //{id:'3',label:'Triple'}
        ]
    },
    formateDateFromDb(dateDateString){
        const d = new Date(dateDateString)
        return d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear();
    },
    getNullableValue(data){
        if(data == '' || typeof data ==='undefined'){
            return null;
        }
        return data;
    },
    getDatePickerFormate(){
        return 'Y-m-d';
    },
    formateDate(dateString){
        const d = new Date(dateString)
        return d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear();
    },
    getPropertyType(){
        let propertyTypes = [
            {label:'Industrial' , value:"industrial"},
            {label:'Office' , value:"office"},
            {label:'Retail' , value:"retail"}
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
    }
}
export default Helper;