const app = getApp()
// pages/makeOrder/makeOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today:'',
    id:'',
    startDate: '2018-12-25',
    endDate: '2018-12-25',
    bindex: 0,
    bpicker: ['0', '1', '2','3','4','5'],
    lindex: 0,
    lpicker: ['0', '1', '2', '3', '4', '5'],
    shopAddress:'',
    shopName:'',
    status:'',
    bprice:0,
    lprice:0,
    totalprice:0.0,
  },
  showModal(e) {
    console.log(this.checkOrderInfo())
    this.checkOrderInfo()
    while(this.data.status==''){
    }
    if(this.data.status){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    }else{
      this.setData({
        modalName: 'error'
      })
    }
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  DateChange(e) {
      if(e.currentTarget.id=='startDate'){
        this.setData({
          startDate: e.detail.value
        })
      }else{
        this.setData({
          endDate: e.detail.value
        })
      }
  },
  bPickerChange(e) {
    console.log(e);
    this.setData({
      bindex: e.detail.value
    })
  },
  lPickerChange(e) {
    console.log(e);
    this.setData({
      lindex: e.detail.value
    })
  },
  checkOrderInfo:function(){
    var that = this;
    var price = that.data.bindex*that.data.bprice + that.data.lindex*that.data.lprice;
    that.setData({
      totalprice:price
    })
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration: 1000
    })
    wx.request({
      url: app.globalData.hostname +'order/isDateVaild/',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        startDate:that.data.startDate,
        endDate:that.data.endDate,
        id:that.data.id,
        backpack:that.data.bpicker[that.data.bindex],
        luggage:that.data.lpicker[that.data.lindex]
      },
      success(res) {
        console.log(res.data)
        if(res.data['status']=='success'){
          that.setData({
            modalName:'success'
          })
        } else if (res.data['status'] == 'fail'){
          that.setData({
            modalName:'error'
          })
        }
      }
    });
  },
  getDate:function(){
    var that = this;
    var timestamp = Date.parse(new Date());

    //获取当前时间  
    var date = new Date(timestamp);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    that.setData({
      today:Y+'-'+M+'-'+D,
      startDate: Y + '-' + M + '-' + D,
    })
    date = new Date((timestamp/1000+24*60*60)*1000)
    Y = date.getFullYear();
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    that.setData({
      endDate: Y + '-' + M + '-' + D,
    })
  },
  getShopDetail: function (id) {
    var that = this;
    wx.request({
      url: app.globalData.hostname+'shop/getshopDetail?id=' + id,
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        that.setData({
          shopName: res.data['name'],
          shopAddress: res.data['address'],
          bprice:res.data['backpack_price'],
          lprice:res.data['luggage_price']
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var sid = options.id;
    var sid = 5
    that.getDate()
    that.setData({
      id:sid
    })
    app.checkRegister()
    that.getShopDetail(that.data.id)
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