const goodclasslist = [
    {
        "id": 1,
        "parentId": 0,
        "name": "服装",
        "level": 0,
        "productCount": 100,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "服装",
        "description": null
    },
    {
        "id": 2,
        "parentId": 0,
        "name": "手机数码",
        "level": 0,
        "productCount": 100,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "手机数码",
        "description": null
    },
    {
        "id": 3,
        "parentId": 0,
        "name": "家用电器",
        "level": 0,
        "productCount": 100,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "家用电器",
        "description": null
    },
    {
        "id": 4,
        "parentId": 0,
        "name": "家具家装",
        "level": 0,
        "productCount": 100,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "家具家装",
        "description": null
    },
    {
        "id": 5,
        "parentId": 0,
        "name": "汽车用品",
        "level": 0,
        "productCount": 100,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "汽车用品",
        "description": null
    },
    {
        "id": 7,
        "parentId": 1,
        "name": "外套",
        "level": 1,
        "productCount": 12,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "外套",
        "description": null
    },
    {
        "id": 8,
        "parentId": 1,
        "name": "T恤",
        "level": 1,
        "productCount": 15,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "T恤",
        "description": null
    },
    {
        "id": 9,
        "parentId": 1,
        "name": "T恤",
        "level": 1,
        "productCount": 15,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "T恤",
        "description": null
    },
    {
        "id": 10,
        "parentId": 1,
        "name": "T恤",
        "level": 1,
        "productCount": 15,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "T恤",
        "description": null
    },
    {
        "id": 11,
        "parentId": 1,
        "name": "T恤",
        "level": 1,
        "productCount": 15,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "T恤",
        "description": null
    },
    {
        "id": 12,
        "parentId": 1,
        "name": "T恤",
        "level": 1,
        "productCount": 15,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "T恤",
        "description": null
    },
    {
        "id": 13,
        "parentId": 2,
        "name": "T恤",
        "level": 1,
        "productCount": 15,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "T恤",
        "description": null
    },
    {
        "id": 14,
        "parentId": 2,
        "name": "T恤",
        "level": 1,
        "productCount": 15,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "裤子",
        "description": null
    },
    {
        "id": 15,
        "parentId": 2,
        "name": "T恤",
        "level": 1,
        "productCount": 15,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "T恤",
        "description": null
    }, {
        "id": 16,
        "parentId": 2,
        "name": "T恤",
        "level": 1,
        "productCount": 1678,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "裙子",
        "description": null
    },
    {
        "id": 17,
        "parentId": 2,
        "name": "T恤",
        "level": 1,
        "productCount": 15,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "T恤",
        "description": null
    },
    {
        "id": 18,
        "parentId": 2,
        "name": "T恤",
        "level": 1,
        "productCount": 15,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "T恤",
        "description": null
    }, {
        "id": 19,
        "parentId": 3,
        "name": "T恤",
        "level": 1,
        "productCount": 15,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "T恤",
        "description": null
    }, {
        "id": 20,
        "parentId": 4,
        "name": "T恤",
        "level": 1,
        "productCount": 15,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "T恤",
        "description": null
    }, {
        "id": 21,
        "parentId": 5,
        "name": "T恤",
        "level": 1,
        "productCount": 15,
        "productUnit": "件",
        "sort": 1,
        "icon": null,
        "keywords": "T恤",
        "description": null
    },
    


]

export default [
    //获取商品一级分类列表
    {
        url: '/goodclass/list',
        type: 'get',
        response: config => {
            const body = config.body;
            var parentId = body.parentId;
           
            const page = config.query.page;
            const limit = config.query.limit;
            const currentParentId = config.query.currentParentId;
            //当前page=1   limit=5   start = 0  end 5
            //当前page=2   limit=5   start= 5 end 10
            //当前page=3   limit=5   start= 10 end 15
            //当前page=4   limit=5   start= 15 end 17

            let filtergoodclasslist;

            // console.log(config.query,"xxxxxxxxxxxxxxxxxxxxxxxxx")
            if(currentParentId){
                filtergoodclasslist = goodclasslist.filter(item=>item.parentId == currentParentId)
                // console.log(currentParentId,filtergoodclasslist)
            }
            else{
                filtergoodclasslist = goodclasslist.filter(item=>item.parentId === 0)
            }
            

            var start = (page - 1) * limit;
            var end = page * limit < filtergoodclasslist.length ? page * limit : (filtergoodclasslist.length)
            var sliceList = filtergoodclasslist.slice(start, end)

            
            return {
                code: 20000,
                data: sliceList,
                total:filtergoodclasslist.length,
             }
        }    
    },

    //新增列表
    
     {
        url: '/vue-admin-template/goodclass/newOrUpdate',
        type: 'post',
        response: config => {
            const body = config.body;
            var id = body.id;
            var index = goodclasslist.findIndex(item=>{
                if(item.id == body.id){
                    return true;
                }
            })
            //如果服务器存在对应id，说明现在该执行修改操作
            if(index != -1){
                goodclasslist[index] = body; 
                return {
                    code: 20000,
                    message: "修改成功"
                }
            }
            //付过服务不存在对应id，说明现在该执行新增操作
            else{
                goodclasslist.push(body);

                return {
                    code: 20000,
                    message: "发布成功",
                   
                }
            }   
            
        }
    },
    
    
    //删除
    {
        url: '/vue-admin-template/goodclass/delete',
        type: 'get',
        response: config => {
            const id = config.query.id;
            const index = goodclasslist.findIndex(item=>{
                if(item.id == id){
                    return true;
                }
            })
            goodclasslist.splice(index,1)
            return {
                code: 20000,
                message: "删除成功",
            }
        }
    },
//查
    {
        url: '/vue-admin-template/goodclass/query',
        type: 'get',
        response: config => {
            const id = config.query.id;
            const gdclass = goodclasslist.find(item=>{
                if(item.id == id){
                    return item;
                }
            })
            
            return {
                code: 20000,
                data:gdclass
            }
        }
    },
]