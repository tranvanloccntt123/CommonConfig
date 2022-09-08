import { ApiRequest } from "./ApiRequest";
import { LOGIN_API_SIGNIN, LOGIN_API_SIGNUP, POST_API_CREATE, POST_API_DELETE, POST_API_LIST, PROFILE_API_RELATION_LIST, PROFILE_API_VISIT } from "./ApiRoute";

let regex = /^[a-zA-Z0-9]{6,15}/;

export const RESPONSE_SUCCESS:string = "success";

export const RESPONSE_FAIL:string = "fail";

export const Authentication = async (user: string, pass: string) => {
    let result = await ApiRequest.build("POST", "application/json")(LOGIN_API_SIGNIN, {username: user, password: pass});
    return result.data;
}

export const Registration = async (name: string, username: string, password: string) => {
    let result = await ApiRequest.build("POST", "application/json")(LOGIN_API_SIGNUP, {name: name, username: username, password: password});
    return result.data;
}

export const CheckUser = (user: string) => regex.test(user);

export const CheckPass = (pass: string) => regex.test(pass);

export const CheckAuthentication = (user: string, pass: string) : boolean => {
    let checkUser = regex.test(user);
    if(!checkUser) return false;
    let checkPass = regex.test(pass);
    if(!checkPass) return false;
    return true;
}


// until for chat
import { Platform } from "react-native";
import { CHAT_API_GET_LIST, CHAT_API_GET_MESSAGES, CHAT_API_SEND_MESSAGE, STOREAGE } from "./ApiRoute"
import { PaginateInterface, ResponseInterface, VisitProfile } from "./AppInterface";
import { getCacheUser, setCacheUser } from "./LocalCache";

export type TypeMessage = 'image' | 'text' | 'video' | 'audio' | 'file';

export const getListChat = async (): Promise<PaginateInterface | null> => {
  let result = await ApiRequest.build('GET')(CHAT_API_GET_LIST);
  let r: ResponseInterface = result.data;
  if(!r || r.status.toLowerCase() == RESPONSE_FAIL) return null;
  let paginate: PaginateInterface = result.data.message
  return paginate;
}

export const getMessages = async (id: number, left_id: string | number = 0): Promise<PaginateInterface | null> => {
  let result:any = null;
  result = left_id? await ApiRequest.build('GET')(CHAT_API_GET_MESSAGES, { id, left_id }) : await ApiRequest.build('GET')(CHAT_API_GET_MESSAGES, { id });
  let r: ResponseInterface = result.data;
  if(!r || r.status.toLowerCase() == RESPONSE_FAIL) return null;
  let paginate: PaginateInterface = result.data.message;
  return paginate;
}

export const sendMessages = async (id: number, type: TypeMessage, content: any, name?: string, typeFile?: string): Promise<ResponseInterface> => {
  let formData = new FormData();
  formData.append('id', id);
  formData.append('type', type);
  formData.append('content', type == 'text' ? content : {
    name: name,
    type: typeFile,
    uri:
      Platform.OS === 'android' ? content : content.replace('file://', ''),
  });
  let result = await ApiRequest.build('POST', 'multipart/form-data')(CHAT_API_SEND_MESSAGE, formData);
  let r: ResponseInterface = result.data;
  return r.message;
}

export const getVisitProfile = async (id?: number): Promise<VisitProfile | null> => {
  let findUserInCache;
  if(id){
    findUserInCache = getCacheUser(id);
    if(findUserInCache) return findUserInCache;
  } 
  let result = await ApiRequest.build('GET')(PROFILE_API_VISIT, id? {user_id: id} : {});
  let r: ResponseInterface = result.data;
  if(!r || r.status.toLowerCase() == RESPONSE_FAIL) return null;
  setCacheUser(id? id : 0, r.message);
  return r.message;
}

export const getListFriend = async (left_id?: number, page?: number) : Promise<PaginateInterface | null> => {
  let data:any = {};
  if(left_id) data.left_id = left_id;
  if(page) data.page = page;
  let result = await ApiRequest.build('GET')(PROFILE_API_RELATION_LIST, data);
  let r: ResponseInterface = result.data;
  if(!r || r.status.toLowerCase() == RESPONSE_FAIL) return null;
  let paginate: PaginateInterface = result.data.message;
  return paginate;
}

// api for post
export const sendPost = async (content: string, name?: string, type?: string, media?: any): Promise<string | null> => {
  let formData = new FormData();
  formData.append('content', content);
  if(media && name && type){
    formData.append('media', {
      name: name,
      type: type,
      uri: Platform.OS === 'android' ? media : media.replace('file://', ''),
    })
  } 
  let result = await ApiRequest.build('POST', 'multipart/form-data')(POST_API_CREATE, {content: content});
  if(result.data.status.toLowerCase() == RESPONSE_FAIL) return null;
  return result.data.message.UUID;
}

export const getListPost = async (left_id?: number, page?: number): Promise<PaginateInterface | null> => {
  let data:any = {};
  if(left_id) data.left_id = left_id;
  if(page) data.page = page;
  let result = await ApiRequest.build('GET', 'application/json')(POST_API_LIST, data);
  let r: ResponseInterface = result.data;
  if(!r || r.status.toLowerCase() == RESPONSE_FAIL)
    return null;
  return r.message;
}

export const deletePost = async (uuid: string): Promise<boolean> => {
  let result = await ApiRequest.build('POST', 'application/json')(POST_API_DELETE, {uuid});
  let r: ResponseInterface = result.data;
  if(!r || r.status.toLowerCase() == RESPONSE_FAIL) return false;
  return true;
}