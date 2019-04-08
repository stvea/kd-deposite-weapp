// pages/shopDetail/shopDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    modalName:'',
    name:'',
    address:'',
    time:'',
    info:'',
    backpack:'',
    luggage:'',
    image0:'',
    image1:'',
    image2:'',
    backpackPrice:'',
    luggagePrice: '',

  },
  makeOrder:function(e){
    var that = this
    wx.navigateTo({
      url: '../makeOrder/makeOrder?id='+that.data.id,
    })
  },
  getShopDetail:function(id){
    var that = this;
    wx.request({
      url: 'https://kdtech.top/shop/getshopDetail?id='+id,
      method:'get',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        that.setData({
          id:res.data['id'],
          name:res.data['name'],
          address:res.data['address'],
          time: res.data['start_time'] + '-' + res.data['end_time'],
          backpack:res.data['backpack'],
          luggage: res.data['luggage'],
          info:res.data['info'],
          image0: res.data['image0'],
          image1: res.data['image1'],
          image2: res.data['image2'],
          backpackPrice:res.data['backpack_price'],
          luggagePrice:res.data['luggage_price']
        });
      }
    })
  },
  showModal(e) {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    that.getShopDetail(id);
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
  sss:function(e){
    e.target.src = "../../image/kd.jpg"
  }
})