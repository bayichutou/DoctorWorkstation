import {porApi} from './request'
import {requestData} from './request_api'

export const getNameDetail = () => {
    return requestData(porApi, 'post', `Patient/GetPatientPageList`,{Body:{}})
}

export const getPharmacyPrintInfo = (data) => {
    return requestData(porApi, 'post', `Print/GetPharmacyPrintInfo`,data)
}

export const updateState = (data) => {
    return requestData(porApi, 'post', `Pharmacy/UpdateState`,data)
}