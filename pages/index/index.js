//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageNum:1,
    pageSize:4,
    goodsLoading:false,
    goods:[],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    hasNextPage:true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    resmsg:""
  },
  index2(){
    wx.navigateTo({url:"/pages/index2/index2"});
  },
  loadGoods(){
    if(!this.data.hasNextPage) return;
    this.setData({
      goodsLoading:true
    })
    app.whcy.request({
      url:"https://weixintest.whcyit.com/server-api/index/getIndexGoodsListByPage.json",
      method:"post",
      data:{
        "pageNum": this.data.pageNum,
        "pageSize": this.data.pageSize
      }
    }).then((res)=>{
      this.data.goods.push(...res.data.items);
      this.setData({
        goodsLoading:!this.data.goodsLoading,
        goods:this.data.goods
      })
      this.setData({
        hasNextPage:res.data.hasNextPage
      })
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs',
      method:'get'
    })
  },
  showImg:function(){
    console.log("2ddasda");
  },
  onShow:function(){
    app.whcy.showLoading();
    this.loadGoods();
    setTimeout(()=>{
      app.whcy.showToast({
        title:"toast"
      })
      app.whcy.hideLoading();
    },4000)
  },
  onLoad: function () {
    app.whcy.$on({
      name:"delete-address",
      tg:this,
      success:(res)=>{
        console.log("接受到了消息"+res);
        this.setData({
          resmsg:res
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReachBottom: function () {//可以重写空来覆盖
    this.data.pageNum = this.data.pageNum+1;
    this.loadGoods();
  }
})
