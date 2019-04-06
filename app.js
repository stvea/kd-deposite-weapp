//app.js
App({
  globalData:{
    hostname:"https://kdtech.top/",
    userInfo:null,
    openid:null,
    isRegister:false,
  },
  getUserInfo:function(){
    var that = this;
    wx.getUserInfo({
      success(res) {
        that.globalData.userInfo = res.userInfo
        if (that.userInfoReadyCallback) {
          that.userInfoReadyCallback(res)
        }
      }
    });
  },
  getRegisterInfo:function(){
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://kdtech.top/user/login',
          data: { code: res.code },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            that.globalData.openid = res.data['openid']
            console.log(res.data)
            if(res.data['register']=='true'){
              that.globalData.isRegister = true;
            }
          }
        })
      }
    });
  },
  checkRegister:function(){
    var that = this
    console.log(that.globalData.isRegister)
    if(that.globalData.openid == null){
      that.getRegisterInfo()
      return 
    }
    if(!that.globalData.isRegister){
      wx.showToast({
        title: '请先注册！',
        icon:'loading',
      })
      wx.navigateTo({
        url: '../register/register',
      })
    }
  },onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
  },
  getAuthInfo: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.getUserInfo()
          // // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo
          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
        } else {
          console.log('未登录');
          wx.navigateTo({
            url: '/pages/loading/loading',
          })
        }
      }
    });
  }
})