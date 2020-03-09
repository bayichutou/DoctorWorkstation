import { requestData } from "../../api/request";

export const getNameDetail = () => {
  return requestData('Patient/GetPatientPageList', {
    Body: {}
  });
};

export const getPharmacyPrintInfo = data => {
  return requestData('Print/GetPharmacyPrintInfo', data);
};

export const updateState = data => {
  return requestData('Pharmacy/UpdateState', data);
};
