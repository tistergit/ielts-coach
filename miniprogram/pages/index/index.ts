// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: "拍照上传解析",
    tips: '请稍后',
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
    //订阅消息授权
    wx.requestSubscribeMessage({
      tmplIds: ['GQ5WOJGSQrS9XqRKpu0iOnSLGFfWaquJCyGqPhX0N-8'],
      success: (res) => {
        console.log("res--->", res)
        this.setData({
          motto: '提示：授权成功'
        })
      },
      fail: (res) => {
        console.log("res--->", res)
        this.setData({
          motto: '提示：授权失败'
        })
      }
    })//
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
              this.setData({
                motto: jsonObject.message,
                show: !this.data.show,
                animated: !this.data.animated
              })
            } catch (error) {
              
            }
          
          
            
          },
          fail: (res) => {
            this.setData({
              motto: res.errMsg,
              show: !this.data.show,
              animated: !this.data.animated
            })
          }
        })
      }
    })
    //


  }
})
