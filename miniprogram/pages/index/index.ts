// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: "拍照上传解析",
    show: false,
    animated: false,
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    this.setData({
    show: false,
    animated: false
    })
  },

  todo(e: any){
    wx.showToast({
      title: '功能建设中，敬请期待.',
      icon: 'none',
      duration: 2000
    })
    
  },

  uploadPic(event: any) {
    console.log(event)
    this.setData({
      show: !this.data.show,
      animated: !this.data.animated
    })
    let func_id = event.currentTarget.id
    console.log(func_id)
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: (res) => {

        wx.uploadFile({
          url: 'https://wx.tister.cn/yuepao/upload/' + func_id, //仅为示例，非真实的接口地址
          filePath: res.tempFiles[0].tempFilePath,
          name: 'file',
          timeout: 180000,// 2 分钟
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
              show: !this.data.show,
              animated: !this.data.animated
            })
          }
        })
      },
      fail: (res) => {
        console.log(res)
        this.setData({
          show: !this.data.show,
          animated: !this.data.animated
        })
      }
    })
    //


  }
})
