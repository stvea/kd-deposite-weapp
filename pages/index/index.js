var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp()
Page({

  data: {
    GetInfo:false,
    InMap:true,
    showShop:false,
    scale:14,
    nickName:'',
    latitude:'',
    longitude:'',
    markers: [{
      iconPath: '../../image/location.png',
      id: 0,
      latitude: 32.179671438036884,
      longitude: 118.70428432861328,
      width: 50,
      height: 50,
      callout:{
        content: '我是这个气泡',
        fontSize: 14,
        color: '#ffffff',
        bgColor: '#000000',
        padding: 8,
        borderRadius: 4,
        boxShadow: '4px 8px 16px 0 rgba(0)'
      }
    }, {
        iconPath: '../../image/location.png',
        id: 1,
        latitude: 32.17269719673709,
        longitude: 118.70411266723633,
        width: 50,
        height: 50
      }, {
        iconPath: '../../image/location.png',
        id: 1,
        latitude: 32.059,
        longitude: 118.62841,
        width: 50,
        height: 50
      }],
    
  },
  getInfo:function(){
    var _this = this;
    wx.request({
      url: 'https://kdtech.top/shop/getshop',
      method: 'GET',
      data: {
        latitude: _this.data.latitude,
        longitude: _this.data.longitude
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        _this.setData({
          
        })
      }
    });
  },
  onLoad: function () {
    var _this =this;
    // 实例化API核心类
    var qqmapsdk = new QQMapWX({
      key: 'LIDBZ-YYAKW-RYHRL-O76C2-RAG65-CAFQC'
    });
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        _this.getInfo();
      }
    });
    
    wx.getUserInfo({
      success(res) {
        app.globalData.userInfo = res.userInfo
        if (app.userInfoReadyCallback) {
          app.userInfoReadyCallback(res)
        }
      }
    })
  },
  onShow: function () {
    var _this = this;

    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              app.globalData.userInfo = res.userInfo
              _this.setData({

                headImage: app.globalData.userInfo.avatarUrl
              })
            }
          })
        }
      }
    })
  }, 
  regionchange: function (res) {
    var that = this;
    // 改变中心点位置  
    if (res.type == "end") {
      that.getCenterLocation();
    }
  },
  getCenterLocation: function () {
    var that = this;
    //mapId 就是你在 map 标签中定义的 id
    var mapCtx = wx.createMapContext('map');
    mapCtx.getCenterLocation({
      success: function (res) {
        console.log('getCenterLocation----------------------->');
        console.log(res);
      }
    })},
     markertap: function (e) {
    console.log(e)
    var that = this
    that.setData({
      GetInfo:true,
    })
  }, clearInfo: function (e) {
    var that = this
    that.setData({
      GetInfo: false,
    })
  }
 })
