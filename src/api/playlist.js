import request from '@/utils/request'

const baseURL = "http://106.15.181.157/nodeAdmin"
/*
    音乐管理请求入口
*/
export function fetchList(params){
   
    return request({
        params,
        url:`${baseURL}/playlist/list`,
        method:'get'
    })
}

export function getPlaylistEdit(params){
    console.log("getPlaylistEdit",params)
    return request({
        params,
        url:`${baseURL}/playlist/edit`,
        method:'get'
    })
}

export function setEdit(params){
    console.log("setEdit",params)
    return request({
        params,
        url:`${baseURL}/playlist/setEdit`,
        method:'POST'
    })
}

export function deleteId(params){
    console.log("deleteId",params)
    return request({
        params,
        url:`${baseURL}/playlist/deleteId`,
        method:'POST'
    })
}