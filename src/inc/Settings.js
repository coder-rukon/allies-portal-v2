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
        {value:'5', label:'Transporation'},
        {value:'6', label:'Wholesale/Distributors'},
        {value:'7', label:'Retail Trade'},
        {value:'8', label:'Finance, Insurance & Real Estate'},
        {value:'9', label:'Services'},
        {value:'10', label:'Public Administration'},
        {value:'11', label:'Nonclassifiable Establishments'},
    ],
    companyColorStatus:[
        {color:'#9CA3AF',id:1},
        {color:'#2DCCFF ',id:2},
        {color:'#56F000',id:3},
        {color:'#FCE83A',id:4},
        {color:'#FFB302',id:5},
        {color:'#FF3838',id:6},
    ]

}

export default Settings; 