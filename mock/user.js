
//后台给前台返回的tocken信息
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

//用户登录后给前台返回的用户信息
const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '超级管理员',
    password: "123"
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '普通编辑用户',
    password: "123"
  }
}

export default [
  // 用户登录接口
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body
      const token = tokens[username]
      const detailToken = token.token;
      const currentUser = users[detailToken];
      
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      //判断用户输入的密码是否正确
      if(currentUser.password !== password){
        return {
          code: 60204,
          message: "您输入的密码不正确"
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // 获取用户信息接口
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // 用户退出登录接口
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },


  // 处理修改密码接口
  {
    url: '/vue-admin-template/user/modifypwd',
    type: 'post',
    response: config => {
      const body = config.body;
      const token = config.get("X-Token")
      const currentUser = users[token];
      //用户输入的原密码正确
      if(currentUser.password == body.password){
        currentUser.password = body.newpassword;
        return {
          code: 20000,
          data: "修改密码成功"
        }
      }
      //用户输入的原密码不正确
      else{
        return {
          code: 60204,
          message: "您输入的原密码不正确"
        }
      }
    }
  }



]
