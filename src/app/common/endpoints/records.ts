import { environment } from "../../../environments/environment";

export const LIST = `${environment.apiUrl}/records`;
export const CREATE_OR_UPDATE = `${environment.apiUrl}/records/create-or-update`;
export const DELETE = `${environment.apiUrl}/records/delete`;
export const DELETE_ALL = `${environment.apiUrl}/records/delete/all`;
