import request from '@/utils/request'


export function getList(params){
      return request({
        url:'/vue-admin-template/coupon/list',
        method: 'get',
        params
      })
}


export function getAdd(data){
  return request({
    url:'/vue-admin-template/coupon/add',
    method: 'post',
    data
  })
}



export function getDelete(params){
  return request({
    url:'/vue-admin-template/coupon/delete',
    method: 'get',
    params
  })
}
