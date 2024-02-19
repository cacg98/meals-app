import { environment } from '../../../environments/environment';

export const LIST = `${environment.apiUrl}/favorites`;
export const IS_FAVORITE = `${environment.apiUrl}/favorites/is-favorite?anchor=`;
export const CREATE = `${environment.apiUrl}/favorites/create`;
export const DELETE = `${environment.apiUrl}/favorites/delete?anchor=`;
