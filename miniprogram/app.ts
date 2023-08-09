// app.ts
towxml:require('/towxml/index')

App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // wx.login({
    //   success: (res) => {
    //     console.log(res)
    //     wx.request({
    //       method: 'GET',
    //       url: "https://wx.tister.cn/yuepao/code2session?code=" + res.code,
    //       header: {
    //         'content-type': 'application/json'
    //       },
    //       success:(res) => {
    //         console.log(res)
    //       }
    //     })

    //   }
    // })
  },
})