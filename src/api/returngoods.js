import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/vue-admin-template/returngoods/list',
        method: 'get',
        params
    })
}

export function fetchList(data) {
    return request({
        url: '/vue-admin-template/returngoods/query',
        method: 'post',
        data: data
    })
}