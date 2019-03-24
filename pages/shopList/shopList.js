// pages/shopList/shopList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[],
  },

  getList(latitude, longitude) {
    //获得周边店家信息
    var that = this;
    console.log(latitude);
    wx.request({
      url: 'https://kdtech.top/shop/getshopList',
      method: 'GET',
      data: {
        latitude: latitude,
        longitude: longitude
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var shops=[];
        for (var j = 0, len = res.data.length; j < len; j++) {
          var singleShop = {};
          singleShop.name = res.data[j]['name'];;
          singleShop.id = res.data[j]['id'];
          singleShop.address = res.data[j]['address'];
          singleShop.distance = (res.data[j]['distance'] / 1000).toFixed(2);
          shops.push(singleShop);
        }
        that.setData({
          shopList:shops,
        })
      }
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.latitude);
    that.getList(options.latitude,options.longitude);

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