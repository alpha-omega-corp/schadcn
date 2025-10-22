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

function apiPost<T>(url: string, data: object, multipart: boolean = false, options?: AxiosRequestConfig<T>): Promise<AxiosResponse<T, unknown>> {
    if (multipart) {
        data = createFormData(data)
    }
    return request(options).post<T>(proxy(url), data)
}

function apiPut<T>(url: string, data: object, multipart: boolean = false, options?: AxiosRequestConfig<T>): Promise<AxiosResponse<T, unknown>> {
    if (multipart) {
        data = createFormData(data)
    }
    return request(options).put<T>(proxy(url), data)
}

function apiDelete<T>(url: string, options?: AxiosRequestConfig<T>): Promise<AxiosResponse<T, unknown>> {
    return request(options).delete<T>(proxy(url), options)
}

const createFormData = (data: any): FormData => {
    const formData = new FormData();

    if (!data || typeof data !== 'object') {
        return formData
    }

    const appendValue = (key: string, value: any) => {
        if (value === undefined || value === null) return

        // File or Blob
        if (value instanceof File || value instanceof Blob) {
            const filename = (value as File).name || `${key}.bin`
            formData.append(key, value, filename)
            return
        }


        // Primitive types
        const type = typeof value
        if (type === 'string' || type === 'number' || type === 'boolean') {
            formData.append(key, String(value))
            return
        }

        // Arrays
        if (Array.isArray(value)) {
            // If array of primitives or files, append multiple key[]
            for (const item of value) {
                if (item === undefined || item === null) continue
                if (item instanceof File || item instanceof Blob) {
                    const filename = (item as File).name || `${key}.bin`
                    formData.append(`${key}[]`, item, filename)
                } else if (['string', 'number', 'boolean'].includes(typeof item)) {
                    formData.append(`${key}[]`, String(item))
                } else {
                    // For objects in arrays, stringify the whole array once and stop
                    formData.append(key, JSON.stringify(value))
                    break
                }
            }
            return
        }

        // Fallback for objects: JSON stringify
        try {
            formData.append(key, JSON.stringify(value))
        } catch {
            formData.append(key, String(value))
        }
    }

    for (const [key, value] of Object.entries(data)) {
        appendValue(key, value)
    }

    return formData
}

function proxy(url: string): string {
    return `${environment.VITE_PROXY}${url}`
}

function image(path?: string): string {
    if (!path) return ''
    return `${environment.VITE_API}/${path}`
}


export {
    apiGet,
    apiPost,
    apiPut,
    apiDelete,
    createFormData,
    image
}

