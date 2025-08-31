import axios, {type AxiosRequestConfig, type AxiosResponse} from "axios";
import {environment} from "@/vite-env.d";

const request = (options?: AxiosRequestConfig, headers?: object) => {
    const auth = (sessionStorage.getItem('token') ? {Authorization: `Bearer ${sessionStorage.getItem('token')}`} : {})

    return axios.create({
        headers: {
            ...auth,
            ...(headers ? headers : {}),
        },
        ...(options ? options : {}),
    });
}



function apiGet<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T, unknown>> {
    return request(options).get<T>(proxy(url))
}

function apiPost<T>(url: string, data: object, options?: AxiosRequestConfig<T>): Promise<AxiosResponse<T, unknown>> {
    return request(options).post<T>(proxy(url), data)
}

function apiPut<T>(url: string, data: object, options?: AxiosRequestConfig<T>): Promise<AxiosResponse<T, unknown>> {
    return request(options).put<T>(proxy(url), data)
}

function apiDelete<T>(url: string, options?: AxiosRequestConfig<T>): Promise<AxiosResponse<T, unknown>> {
    return request(options).delete<T>(proxy(url), options)
}

function apiPostFormData<T>(url: string, data: FormData, options?: AxiosRequestConfig<T>): Promise<AxiosResponse<T, unknown>> {
    return request(options, {
        'Content-Type': 'multipart/form-data',
    }).post<T>(proxy(url), data)
}

function proxy(url: string): string {
    return `${environment.VITE_PROXY}${url}`
}

const createFormData = (data: string): FormData => {
    const formData = new FormData();
    const blob = new Blob([data], {type: 'text/plain'});
    const url = URL.createObjectURL(blob)

    formData.append('content', blob, url);

    return formData
}

export {
    apiGet,
    apiPost,
    apiPut,
    apiDelete,
    apiPostFormData,
    createFormData
}

