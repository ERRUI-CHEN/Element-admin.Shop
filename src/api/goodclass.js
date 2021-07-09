import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/goodclass/list',
    method: 'get',
    params:params
  })
}

export function newOrUpdateGoodClass(data) {
    return request({
        url: '/vue-admin-template/goodclass/newOrUpdate',
        method: 'post',
        data:data
    })
}





export function deleteGoodClass(params) {
  return request({
    url: '/vue-admin-template/goodclass/delete',
    method: 'get',
    params:params
  })
}

export function findGoodClass(params) {
  return request({
    url: '/vue-admin-template/goodclass/query',
    method: 'get',
    params:params
  })
}