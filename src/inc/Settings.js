/*
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
*/
let Settings = {
    device_name:'web',
    userTokenKey:'allies_token',
    secondUserTokenKey:'allies_token_super',
    apiUrl:'http://127.0.0.1:8000/api',
    apiAppUrl:'http://127.0.0.1:8000',
    oky:'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',
    listingStatus:[
        {label:'Active',value:'active'},
        {label:'Inactive',value:'inactive'}
    ],
    listingType:[
        {value:'for_sale',label:'For Sale'},
        {value:'for_lease',label:'For Lease'},
        {value:'for_sub_lease',label:'For Sublease'},
        {value:'for_sale_or_lease',label:'For Sale/For Lease'}
    ],
    industryGroups:[
        {value:'1', label:'Agriculture, Forestry, & Fishing'},
        {value:'2', label:'Mining'},
        {value:'3', label:'Construction'},
        {value:'4', label:'Manufacturing'},
        {value:'5', label:'Transportation'},
        {value:'6', label:'Wholesale/Distributors'},
        {value:'7', label:'Retail Trade'},
        {value:'8', label:'Finance, Insurance & Real Estate'},
        {value:'9', label:'Services'},
        {value:'10', label:'Public Administration'},
        {value:'11', label:'Nonclassifiable Establishments'},
    ],
    companyColorStatus:[
        {color:'#FBD34D',id:1},
        {color:'#4ADE80',id:2},
        {color:'#56ACEF',id:3},
        {color:'#EF4444',id:4}
    ],
    getUserStatus: () => {
        let status = [
            {label:'Active',value:'active'},
            {label:'Inactive',value:'inactive'},
            {label:'Suspended',value:'suspended'},
            {label:'Pending',value:'pending'}
        ]
        return status;
    },
    getUserSystemRoles: () => {
        let roles = [
            {label:'Broker',value:'broker'},
            {label:'Administrator',value:'administrator'}
        ]
        return roles;
    },
    getDealType: () => {
        let dealTypes = [
            {id:5,name:'Tenant Rep',shortName:'TR'},
            {id:6,name:'Buyer Rep',shortName:'BR'},
            {id:7,name:'Landlord Rep',shortName:'LR'},
            {id:8,name:'Seller Rep',shortName:'SR'}
        ];
        return dealTypes;
    },
    getCompanySource: () => {
        return [
            {label:'Inbound',value:'Inbound'},
            {label:'Outbound',value:'Outbound'},
            {label:'Website',value:'Website'},
            {label:'Google',value:'Google'},
            {label:'ZoomInfo',value:'ZoomInfo'},
            {label:'Other',value:'Other'}
        ]
    }
    /*
    companyColorStatus:[
        {color:'#9CA3AF',id:1},
        {color:'#2DCCFF ',id:2},
        {color:'#56F000',id:3},
        {color:'#FCE83A',id:4},
        {color:'#FFB302',id:5},
        {color:'#FF3838',id:6},
    ]
    */

}

export default Settings; 