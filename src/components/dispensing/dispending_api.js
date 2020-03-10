import { requestData } from "../../api/request";

export const getNameDetail = (data) => {
  console.log(data);
  return requestData("Patient/GetPatientPageList", data);
};

export const getPharmacyPrintInfo = data => {
  return requestData("Print/GetPharmacyPrintInfo", data);
};

export const updateState = data => {
  return requestData("Pharmacy/UpdateState", data);
};
