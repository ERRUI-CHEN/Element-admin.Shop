import request from '@/utils/request'
export function getOrderDetail(params) {
    return request({
        url: '/orderdetail/list/query',
        method: 'get',
        params: params
    });
}