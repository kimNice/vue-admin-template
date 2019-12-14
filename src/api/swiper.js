import request from '@/utils/request'

// const baseURL = "http://localhost:3000"
const baseURL = "http://106.15.181.157/nodeAdmin"
export function getSwiper(params){
    return request({
        params,
        url:`${baseURL}/swiper/getSwiper`,
        method:'get'
    })
}
export function del(params){
    return request({
        params,
        url:`${baseURL}/swiper/del`,
        method:'post'
    })
}
