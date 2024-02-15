import axios from "axios";
import Helper from "./Helper";
import Settings from "./Settings";
const Api = {
    baseUrl: Settings.apiUrl,
    userTokenKey: Settings.userTokenKey,
    isJsonHeader:false,
    apiHeaders: {
        //'X-Custom-Header': 'foobar',
        //"Access-Control-Allow-Origin": "*"
    },
    setHeader: function (newHeader) {
        this.apiHeaders = {
            ...this.apiHeaders,
            ...newHeader
        };
    },
    getApiHeadres: function () {
        return this.apiHeaders;
    },
    setJsonHeader: function(){
        this.isJsonHeader = true;
        this.apiHeaders["Content-Type"] = "application/json";
        return this;
    },
    axios: function(){
        return axios.create({
            baseURL: Settings.apiUrl,
            headers: this.getApiHeadres(),
            transformRequest: [(data, headers) => {
                if(data){
                    data.device_name = 'web';
                }
                return data;
            }, ...axios.defaults.transformRequest],
        });
    } ,
    setUserToken: function () {
        let token = this.getUserToken();
        if (token) {
            this.axios = () =>{
               return axios.create({
                    baseURL: this.baseUrl, //Settings.apiUrl,
                    headers: {
                        Accept: 'application/json',
                        withCredentials: true,
                        Authorization: 'Bearer ' + token
                    }
                })

            } 
            return true;
        } else {
            return false;
        }
    },
    getUserToken() {
        let token = null;
        token = Helper.getCookie(this.userTokenKey);
        if (!token) {
            return false;
        }
        return token;
    }
}
export default Api;