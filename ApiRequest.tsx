import axios, {AxiosRequestConfig, AxiosRequestHeaders, Method} from "axios";

export type ContentType = 'text/html' | 'multipart/form-data' | 'x-www-form-urlencoded' | 'application/json';
export class ApiRequest{
    static token: string
    static applicationId: string
    static build(method:Method = 'GET', contentType: ContentType = 'text/html'){
        const token = `Bearer ${ApiRequest.token}`;
        let params = {
            application_id: ApiRequest.applicationId
        };
        const headers:AxiosRequestHeaders = {
            'Authorization': token,
            'Content-Type': contentType,
        };
        let config = {
            headers,
            method
        };
        return function(url: string, data?: object){
            if(method == 'GET') params = {...params, ...data};
            let axiosConfig: AxiosRequestConfig = {
                ...config,
                params,
                data: method == 'GET'? null : data,
                url
            };
            return axios(axiosConfig).then(result => result).catch(e => e.response);
        }
    }
}