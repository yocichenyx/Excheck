//app.js
var pageConfig = {
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("onLaunch")
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  onShow: function(){
    console.log("onshow")
  },
  globalData: {
    userInfo: null
  },
  getExpressInfo:function(nu,cb){
    wx.request({
      url: 'https://wuliu.market.alicloudapi.com/kdi', //【1】仅为示例，并非真实的接口地址
      method: 'GET',								   //【2】需要修改为对应的GET 或者 POST 方法
      header: {
        "Authorization": "APPCODE 58ac025da**********3341f029ce"  //【3】传入自己的appcode，在买家中心查看。注意appcode与值之间有一个必须的空格 58ac025da**********3341f029ce  改为自己的APPCODE
      },
	  data:{  //【4】仅为示例，传入实际的相关参数 ，data数组里的参数可参考产品详情
		  type:"zto",
		  no:"123456"
	  }
	  // 【1】~ 【4】 许要修改成对应的，区分大小写！
      success: function (res) {
        //console.log(res.data)
        cb(res.data);
      }
    })
  },
  userCenter : {
    userinfo : null
  }
}
App(pageConfig)