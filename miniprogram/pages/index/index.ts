// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: "拍照上传解析",
    tips: '请稍后',
    grids: [
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon1.png",
        title: "招聘"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon2.png",
        title: "房产"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon3.png",
        title: "二手车"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon4.png",
        title: "二手"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon5.png",
        title: "招盟"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon6.png",
        title: "兼职"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon7.png",
        title: "本地"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon8.png",
        title: "家政"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon9.png",
        title: "夺宝"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon10.png",
        title: "送现金"
      },
    ],

    show: false,
    animated: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {

  },

  uploadPic(e: any) {
    console.log(e)
    this.setData({
      show: !this.data.show,
      animated: !this.data.animated
    })
    
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: (res) => {

        wx.uploadFile({
          url: 'https://wx.tister.cn/yuepao/upload', //仅为示例，非真实的接口地址
          filePath: res.tempFiles[0].tempFilePath,
          name: 'file',
          timeout: 180000,// 2 分钟
          formData: {
            'user': 'test',
            'openid': 'myopenid',
          },
          success: (res) => {
            const data = res.data
            console.log(data)
            try {
              let jsonObject = JSON.parse(data)
              console.log(jsonObject.message)
              wx.setStorageSync('userInfo', jsonObject.message)
              this.setData({
                motto: jsonObject.message,
                show: !this.data.show,
                animated: !this.data.animated
              })
            } catch (err) {
              console.error(err)
            }
            wx.navigateTo({
              url:'/pages/result/result'
            })


          },
          fail: (res) => {
            this.setData({
              motto: res.errMsg,
              show: !this.data.show,
              animated: !this.data.animated
            })
          }
        })
      },
      fail: (res) => {
        console.log(res)
        this.setData({
          motto: res.errMsg,
          show: !this.data.show,
          animated: !this.data.animated
        })
      }
    })
    //


  }
})
