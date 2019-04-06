// pages/search/search.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:[],
    line:0,
    count:0,
    inputShowed: false,
    inputVal: "",
    city:'',
    recommand:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.latitude)
    that.getSelected(options.latitude,options.longitude);
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

  },
  getSelected:function(latitude,longitude){
    var that = this;
    wx.request({
      url: app.globalData.hostname + 'shop/getSelected',
      method:'GET',
      data:{
        latitude:latitude,
        longitude:longitude
      },
      success:function(res){
        var n = res.data.length/3;
        var l = Math.floor(res.data.length/3);
        if(n>l){
          l = l + 1;
        }
        console.log(l)
        that.setData({
          selected:res.data,
          line:l,
          count:res.data.length
        })
      }
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
    });
    this.getRecommand(e.detail.value)
  },
  selectedTyping:function(e){
    console.log(e.target)
    this.setData({
      inputShowed: true,
      inputVal:e.target.id
    })
    this.getRecommand(e.target.id)
  },
  getRecommand:function(keyword){
    var that = this;
    wx.request({
      url: app.globalData.hostname+'shop/getRecommand',
      data:{
        keyword:keyword
      },
      method:'get',
      success:function(res){
        that.setData({
          recommand:res.data
        })
      }
    })
  },
  toShopList:function(e){
    var that = this;
    var lat = that.data.recommand[Number(e.target.id)]['location']['lat']
    var lng = that.data.recommand[Number(e.target.id)]['location']['lng']
    wx.redirectTo({
      url: '../shopList/shopList?latitude='+lat+'&longitude='+lng,
    })
  }
})