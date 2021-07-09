import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/order/list',
        method: 'get',
        params: params
    })
}
export function fetchnewList(data) {
    return request({
        url: '/order/list/query',
        method: 'post',
        data: data
    })
}

export function getDelete(params) {
    return request({
        url: '/order/detele',
        method: 'get',
        params: params
    });
}
export function getOrderDetail(params) {
    return request({
        url: '/orderdetail/list/query',
        method: 'get',
        params: params
    });
}
export function getOrderDetailmark(data) {
    return request({
        url: '/orderdetail/list/mark',
        method: 'post',
        data: data
    });
}
export function getOrderDetailaddress(data) {
    return request({
        url: '/orderdetail/list/address',
        method: 'post',
        data: data
    });
}