export interface Character{
    id:number;
    name:string;
    status:string;
    species:string;
    gender:string;
    image:string;
}
export interface DataResponse{
    characters:APIResponse<Character[]>
}
export interface APIResponse<T>{
    result:T;
}