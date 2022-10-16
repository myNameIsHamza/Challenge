import axios from "axios";


export default class BaseService {
    private static baseURL: string = "http://localhost:8083";

    public static async getAll<T>(url: string): Promise<any> {
        let res = await axios.get<Array<T>>(this.baseURL + url)
            .then((response: any) => {
                console.log(response)
                return response

            })
            .catch(function (error) {
                return error;
            });
        return res;
    }

    public static get<T>(url: string, param: any): Promise<any> {
        let res = axios.get<T>(this.baseURL + url + param)
            .then((response: any) => {
                console.log(response)
                return response
            })
            .catch(function (error) {
                return error;
            });
        return res;
    }
    public static delete(url: string, param: any): Promise<any> {
        console.log(param, url)
        let res = axios.delete(this.baseURL + url + param)
            .then(response => {
                console.log(response)
                return response
            })
            .catch(function (error) {
                return error;
            });
        return res;
    }
    public static create<T>(url: string, obj: T): Promise<any> {

        let res = axios.post(this.baseURL + url, obj)
            .then(response => {
                console.log(response)
                return response
            })
            .catch(function (error) {
                return error;
            });
        return res;
    }
    public static update<T>(url: string, param: any, obj: T): Promise<any> {

        let res = axios.put(this.baseURL + url + param, obj)
            .then(response => {
                console.log(response)
                return response
            })
            .catch(function (error) {
                return error;
            });
        return res;
    }
}