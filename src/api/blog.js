import request from '@/utils/request'

const baseURL = "http://106.15.181.157:80/nodeAdmin"

export function getList(params){
    return request({
        params,
        url:`${baseURL}/blog/list`,
        method:'get'
    })
}