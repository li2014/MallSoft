//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    baseUrl: 'http://mall.test.com:8088/mall/',
    userInfo: {},
    hasUserInfo: false,
    goodList: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    page:{
      pageSize:5,
      pageNo:1
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.request({
      url: this.data.baseUrl + 'good/preference-given?pageNo=1&pageSize=5',
      method: 'GET',
      success: res => {
        console.log(res);
        this.setData({
          goodList:res.data.list
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail:res=>{
          console.log(res);
        }
      })
    }
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    let pageNo = this.data.page.pageNo+1;
    this.setData({
      page:{
        pageNo:pageNo
      }
    })
    console.log(pageNo);
    console.log(this.data.page) 
    let url = this.data.baseUrl + 'good/preference-given?pageNo='+this.data.page.pageNo+'&pageSize=5';
    wx.request({
      url: url,
      method:"GET",
      success:res=>{
        console.log(res);
        if(res.statusCode==200){
          let arr = this.data.goodList;
          console.log(arr.push(res.data.list))
          console.log(arr);
          this.setData({
            goodList:arr
          });
        }
      },
      fail:error=>{
        console.log(error);
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
