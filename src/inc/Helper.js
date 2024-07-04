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
    getPropertyFields(property){
        let fileds = {
            property_size:{type:'text',name:'property_size',label:"Size",value:property.property_size},
            property_acres:{type:'text',name:'property_acres',label:"Acres",value:property.property_acres},
            property_zoning:{type:'text',name:'property_zoning',label:"Zoning",value:property.property_zoning},
            property_private_offices:{type:'text',name:'property_private_offices',label:"# of Private Offices",value:property.property_private_offices},
            property_bathrooms:{type:'text',name:'property_bathrooms',label:"# Bathrooms",value:property.property_bathrooms},
            property_parking_ratio:{type:'text',name:'property_parking_ratio',label:"Parking Ratio",value:property.property_parking_ratio},
            property_of_suites:{type:'text',name:'property_of_suites',label:"# of Suites",value:property.property_of_suites},
            property_clear_height:{type:'text',name:'property_clear_height',label:"Clear Height",value:property.property_clear_height},
            property_dock_doors:{type:'text',name:'property_dock_doors',label:"# of Dock Doors",value:property.property_dock_doors},
            property_drive_in_doors:{type:'text',name:'property_drive_in_doors',label:"# of Drive-In Doors",value:property.property_drive_in_doors},
            property_year_built:{type:'text',name:'property_year_built',label:"Year Built",value:property.property_year_built},
            property_year_renovated:{type:'text',name:'property_year_renovated',label:"Year Renovated",value:property.property_year_renovated},
            property_class:{type:'text',name:'property_class',label:"Class",value:property.property_class},
            property_min_space:{type:'text',name:'property_min_space',label:"Min Space",value:property.property_min_space},
            property_max_contiguous_space:{type:'text',name:'property_max_contiguous_space',label:"Max Contiguous Space",value:property.property_max_contiguous_space},
            property_submarket:{type:'dropdown',options:[],name:'property_submarket',label:"Submarket",value:property.property_submarket},
            property_lease_rate:{type:'text',name:'property_lease_rate',label:"Lease Rate",value:property.property_lease_rate},
            property_vehicles_per_day:{type:'text',name:'property_vehicles_per_day',label:"Vehicles Per Day",value:property.property_vehicles_per_day},
            property_retail_type:{type:'text',name:'property_retail_type',label:"Retail Type",value:property.property_retail_type},
            property_available_utilities:{type:'text',name:'property_available_utilities',label:"Available Utilities",value:property.property_available_utilities}
        }
        let needFields = [];
        if(property.property_type == 'industrial'){
            needFields = ['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'];
            fileds.property_submarket.options = [
                {value:'CBD',label:'CBD'},
                {value:'East',label:'East'},
                {value:'North',label:'North'},
                {value:'Northeast',label:'Northeast'},
                {value:'Northwest',label:'Northwest'},
                {value:'South',label:'South'},
                {value:'Southeast',label:'Southeast'},
                {value:'Southwest',label:'Southwest'},
                {value:'West',label:'West'}
            ];
        }else if(property.property_type == 'office'){
            needFields = ['property_size','property_acres','property_zoning', 'property_private_offices','property_bathrooms','property_parking_ratio','property_suites','property_class','property_min_space','property_max_contiguous_space','property_year_built','property_year_renovated','property_submarket','property_lease_rate'];
            fileds.property_submarket.options = [
                {value:'CBD',label:'CBD'},
                {value:'Midtown',label:'Midtown'},
                {value:'East',label:'East'},
                {value:'Fishers',label:'Fishers'},
                {value:'Keystone',label:'Keystone'},
                {value:'North/Carmel',label:'North/Carmel'},
                {value:'Northeast',label:'Northeast'},
                {value:'Northwest',label:'Northwest'},
                {value:'South',label:'South'},
                {value:'West',label:'West'}
            ];
        }else if(property.property_type == 'retail'){
            needFields = ['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'];
        }else if(property.property_type == 'land'){
            needFields = ['property_size','property_acres','property_zoning','property_clear_height','property_of_dock_doors','property_drive_in_doors','property_year_built','property_year_renovated','property_class','property_submarket','property_lease_rate'];
        }
        let output = needFields.map( item => {
            return fileds[item]
        })

        return output;
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