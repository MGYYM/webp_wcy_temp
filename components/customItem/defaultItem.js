// components/goods/customItem/defaultItem.js
Component({
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    },
    index:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadthis(event){
      this.triggerEvent("loadthis",event);
    },
    goDetail: function (e) {
      wx.navigateTo({
        url: "/pages/index/goodDetail/good-detail?id=" + e.currentTarget.dataset.id
      })
    }
  }
})
