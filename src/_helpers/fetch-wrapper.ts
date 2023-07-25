import { store, authActions } from '../_store';
import axios from "axios";

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

interface RequestOptionsHeaders {
    Authorization: string;
    'Content-Type'?: string; // The question mark makes the property optional.
}

interface RequestOptions {
    method?: string
    headers: RequestOptionsHeaders;
    body?: string;
}



function request(method: string) {
    return (url: string, body:any) => {
        const requestOptions: RequestOptions = {
            method,
            headers: authHeader(url)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }


        // @ts-ignore
        return axios({
            method: method,
            url: url,
            data: requestOptions.body,
            headers: requestOptions.headers
        }).then(handleResponse)

    }
}

function authHeader(url: string) {
    const token: string = authToken();
    return { Authorization: `Bearer ${token}` };
}

function authToken() {
    // @ts-ignore
    return store.getState().auth.user?.token;
}

function handleResponse(response: any) {
    return response && response.data
}