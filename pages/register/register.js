const app = getApp()
var interval = null //倒计时函数
// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImg:'',
    nickName:'',
    time: '获取验证码', //倒计时 
    currentTime: 60,
    color: 'bg-green',
    phone:'',
    code:'',
    disabled:false,
    modalName:'',
    openid:'',
    agree:false
  }, 
  changeAgree:function(e){
    if(this.data.agree){
      this.setData({
        agree: false
      })
    }else{
      this.setData({
        agree: true
      })
    }
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  }, showModal(e) {
    console.log('sad');
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  getCode:function(e){
    var that = this;
    var currentTime = that.data.currentTime
    var phone = that.data.phone
    if(phone.length!=11){
      wx.showModal({
        title: '提示',
        content: '请正确输入手机号',
        showCancel: false,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return;
    }
    wx.request({
      url: 'https://kdtech.top/sms/send',
      data:{
        phone:phone
      },
      method:'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },success:(res)=>{
        console.log(res.data)
      }
    })
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒',
        color: 'bg-gray',
        disabled:true
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '获取',
          currentTime: 60,
          disabled: false,
          color:'bg-green'
        })
      }
    }, 1000)
  },
  register:function(e){
    var that = this;
    if(that.data.agree!=true){
      wx.showModal({
        title: '提示',
        content: '请同意用户协议',
        showCancel: false,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      wx.showLoading({
        title: '注册中',
      })

      setTimeout(function () {
        wx.hideLoading()
      }, 1000)
      wx.request({
        url: 'https://kdtech.top/shop/userRegister',
        data: {
          phone:that.data.phone,
          code:that.data.code,
          openid:that.data.openid
        },
        method: 'POST', header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          console.log(res.data)
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      headImg: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName,
      openid: app.globalData.openid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})