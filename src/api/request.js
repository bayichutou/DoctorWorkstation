import axios from 'axios'
import {POR_LOGIN_LOGOUT} from './config'

// portal base
export const porApi = axios.create({
    baseURL: POR_LOGIN_LOGOUT, // api 的 base_url
    timeout: 150000, // request timeout
    headers: {
        'Content-Type': 'application/json'
    }
})
porApi.defaults.headers.get['Content-Type']= 'application/x-www-form-urlencoded'