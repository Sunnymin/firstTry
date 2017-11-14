// test.js
var order=['green', 'red', 'yellow', 'blue', 'green']
Page({
   data:{
        message:"测试页面",
        toView:'green',
        scrollTop:100,
        imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    items: [
      {name: 'USA', value: '美国'},
      {name: 'CHN', value: '中国', checked: 'true'},
      {name: 'BRA', value: '巴西'},
      {name: 'JPN', value: '日本'},
      {name: 'ENG', value: '英国'},
      {name: 'TUR', value: '法国'},
    ]
   },
   radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
   upper:function(e){
       console.log(e)
   },
   lower:function(e){
       console.log(e)
   },
   tap:function(e){
       for(var i = 0; i <order.length; ++i){
           if(order[i] === this.data.toView){
               this.setDate({
                   toView:order[i+1]
               })
               break
           }
       }
   },
   tapMove:function(e){
       this.setData({
           scrollTop:this.data.scrollTop +10
       })
   }
})