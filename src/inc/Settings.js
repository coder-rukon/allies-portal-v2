import $ from 'jquery';
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
let Settings = {
    device_name:'web',
    userTokenKey:'allies_token',
    secondUserTokenKey:'allies_token_super',
    apiUrl:'http://127.0.0.1:8000/api',
    apiAppUrl:'http://127.0.0.1:8000',

}

export default Settings; 