import Dropdown from "../forms/Dropdown";
import Input from "../forms/Input";

class AdditionalFields{
    constructor(property = {}){
        this.propertyDb  = property;
    }
    getAdditionalType(){
        return [
            {id:'11',name:'Industrial',slug:'industrial'},
            {id:'12',name:'Office',slug:'office'},
            {id:'13',name:'Retail',slug:'retail'},
            {id:'14',name:'Land',slug:'land'}
        ]
    }
    getData(additional_type_slug){
        let fields = this.getPropertyAdditionalFields(additional_type_slug);
        const outputData = fields.reduce((acc, obj) => {
            acc[obj.name] =  typeof obj.value === 'undefined' ? null : obj.value;
            if(obj.options && obj.type == 'text'){
               acc[obj.options[0].name] = document.querySelector('input[name="'+obj.options[0].name+'"]:checked') ? document.querySelector('input[name="'+obj.options[0].name+'"]:checked').value : ''; 
            }
            return acc;
          }, {});
        return outputData;
    }
    getPropertyAdditionalFields(additional_type_slug){
        let propertyObj = this.propertyDb;
        let fileds = {
            //property_acres:{type:'text',name:'property_acres',label:"Acres",value:propertyObj.property_acres},
            //property_zoning:{type:'text',name:'property_zoning',label:"Zoning",value:propertyObj.property_zoning},
            property_private_offices:{type:'text',name:'property_private_offices',label:"# of Private Offices",value:propertyObj.property_private_offices},
            property_bathrooms:{type:'text',name:'property_bathrooms',label:"# Of Bathrooms",value:propertyObj.property_bathrooms},
            property_parking_ratio:{type:'text',name:'property_parking_ratio',label:"Parking Ratio",value:propertyObj.property_parking_ratio},
            property_of_suites:{type:'text',name:'property_of_suites',label:"# of Suites",value:propertyObj.property_of_suites},
            
            property_dock_doors:{type:'text',name:'property_dock_doors',label:"# of Dock Doors",value:propertyObj.property_dock_doors},
            property_drive_in_doors:{type:'text',name:'property_drive_in_doors',label:"# of Drive-In Doors",value:propertyObj.property_drive_in_doors},
            property_class:{type:'dropdown',options:[{value:'A',label:"A"},{value:'B',label:"B"},{value:'C',label:"C"}],name:'property_class',label:"Class",value:propertyObj.property_class},
            property_clear_height:{type:'text',name:'property_clear_height',label:"Clear Height",value:propertyObj.property_clear_height},
            property_year_built:{type:'text',name:'property_year_built',label:"Year Built",value:propertyObj.property_year_built},
            property_year_renovated:{type:'text',name:'property_year_renovated',label:"Year Renovated",value:propertyObj.property_year_renovated},
            property_total_parking_spaces:{type:'text',name:'property_total_parking_spaces',label:"Total Parking Spaces",value:propertyObj.property_total_parking_spaces},
            property_power:{type:'text',name:'property_power',label:"Power",value:propertyObj.property_power},
            property_office_available:{type:'text',name:'property_office_available',label:"Office Available",value:propertyObj.property_office_available,options:[{label:'SF',value:'sf',name:'property_office_available_unit',onChange:this.onChangeHanlder.bind(this)},{label:'%',value:'percentage',name:'property_office_available_unit',onChange:this.onChangeHanlder.bind(this)}]},
            
            property_min_space:{type:'text',name:'property_min_space',label:"Min Space",value:propertyObj.property_min_space},
            property_max_contiguous_space:{type:'text',name:'property_max_contiguous_space',label:"Max Contiguous Space",value:propertyObj.property_max_contiguous_space},
            //property_submarket:{type:'dropdown',options:[],name:'property_submarket',label:"Submarket",value:propertyObj.property_submarket},
            //property_lease_rate:{type:'text',name:'property_lease_rate',label:"Lease Rate",value:propertyObj.property_lease_rate},
            property_vehicles_per_day:{type:'text',name:'property_vehicles_per_day',label:"Vehicles Per Day",value:propertyObj.property_vehicles_per_day},
            property_retail_type:{type:'text',name:'property_retail_type',label:"Retail Type",value:propertyObj.property_retail_type},
            property_available_utilities:{type:'text',name:'property_available_utilities',label:"Available Utilities",value:propertyObj.property_available_utilities},
            property_traffic_count:{type:'text',name:'property_traffic_count',label:"Traffic Count",value:propertyObj.property_traffic_count}
        }
        let needFields = [];
        if(additional_type_slug == 'industrial'){
            needFields = ['property_dock_doors','property_drive_in_doors','property_class','property_clear_height','property_year_built','property_year_renovated','property_total_parking_spaces','property_power','property_office_available'];
            if(fileds.property_submarket){
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
            }
            
        }else if(additional_type_slug == 'office'){
            needFields = ['property_private_offices','property_bathrooms','property_of_suites','property_class','property_min_space','property_max_contiguous_space','property_year_built','property_year_renovated'];
            if(fileds.property_submarket){
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
            }
            
        }else if(additional_type_slug == 'retail'){
            needFields = ['property_retail_type','property_parking_ratio','property_class','property_vehicles_per_day','property_year_built','property_year_renovated'];
        }else if(additional_type_slug == 'land'){
            needFields = ['property_traffic_count','property_available_utilities'];
        }
        let output = needFields.map( item => {
            return fileds[item]
        })

        return output;
    }
    onChangeHanlder(event){
        this.propertyDb = {
            ...this.propertyDb,
            [event.target.name]: event.target.value
        }
    }
    getField(fieldObj,key){
        if(!fieldObj){
            return <></>
        }
        if(fieldObj.type =='dropdown'){
            return <div className="col-xs-12 col-sm-6"><Dropdown key={key}  {...fieldObj} name={fieldObj.name} options={fieldObj.options}  placeholder={fieldObj.label} onChange={this.onChangeHanlder.bind(this)}/></div>
        }
        return <div className="col-xs-12 col-sm-6"><Input key={key} {...fieldObj} name={fieldObj.name}   onChange={this.onChangeHanlder.bind(this)}/></div>
    }
    displayAditionalFields(additionalTypeSlug){
        let fields = this.getPropertyAdditionalFields(additionalTypeSlug);
        return(
            <div className="row">
                {fields.map(  (fieldObj,key ) => {
                    return( this.getField(fieldObj,key))
                } )}
            </div>
        )
    }
}

export default AdditionalFields;