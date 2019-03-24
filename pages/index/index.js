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
    markers:[],
    cLatitude:'',
    cLongitude:''
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
          longitude: res.longitude,
          cLatitude:res.latitude,
          cLongitude:res.longitude
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
  getInfo: function () {
    //获得周边店家信息
    var that = this;
    wx.request({
      url: 'https://kdtech.top/shop/getshop',
      method: 'GET',
      data: {
        latitude: that.data.cLatitude,
        longitude: that.data.cLongitude
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var maks = [];
        for (var j = 0, len = res.data.length; j < len; j++) {
          var singleShop = {};
          singleShop.iconPath = "../../image/location.png";
          singleShop.id = res.data[j]['id'];
          singleShop.latitude = res.data[j]['latitude'];
          singleShop.longitude = res.data[j]['longitude'];
          singleShop.width = 30;
          singleShop.height = 30;
          maks.push(singleShop);
        }
        that.setData({
          markers:maks
        })
      }
    });
  },
  getShopList(){
    //获得周边店家信息
    var that = this;
    wx.navigateTo({
      url: '../shopList/shopList?latitude=' + that.data.cLatitude + "&longitude=" + that.data.cLongitude,
    });
  },
  toLocation: function () {
    //定位到当前位置
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
  },
regionchange: function (res) {
  // 改变中心点位置  
    var that = this;
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
        that.getInfo();
        that.setData({
          cLatitude:res.latitude,
          cLongitude:res.longitude
        })
      }
})},
markertap: function (e) {
    console.log(e)
    var that = this
    that.setData({
      GetInfo:true,
    })
}, 
clearInfo: function (e) {
    var that = this
    that.setData({
      GetInfo: false,
    })
},
showList:function(){

}
})
