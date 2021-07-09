import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/vue-admin-template/goodslist/list',
        method: 'get',
        params
    })
}

export function fetchList(data) {
    return request({
        url: '/goodslist/list/query',
        method: 'post',
        data: data
    })
}
export function Deletegoods(params) {
    return request({
        url: '/goodslist/delete',
        method: 'get',
        params: params
    });
}

export function addGoods(data) {
    return request({
        url: '/goodslist/add',
        method: 'post',
        data
    })
}


export function addnewList(data) {
    return request({
        url: '/goodslist/pushlist',
        method: 'post',
        data
    })
}

export function updateGoodList(data) {
    return request({
        url: '/goodslist/update',
        method: 'post',
        data
    })
}

export function updateGoodListpush(data) {
    return request({
        url: '/goodslist/editpush',
        method: 'post',
        data
    })
}