$(function(){
  var url = location.href;
  var teacherId = request('teacherId');
   function preLoadImg(url) { 
var img = new Image(); 
img.src = url; 
} 

   preLoadImg("images/bg.png");
    preLoadImg("images/bg1.png");
	     var progress = document.getElementById("progress");
        var fill = document.getElementById("fill");
        var total = progress.offsetWidth;
       
        var w;
         /*--获取网页传递的参数--*/
                   function request(paras)
                 { 
                     var url = location.href; 
                     var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
                     var paraObj = {} 
                     for (i=0; j=paraString[i]; i++){ 
                     paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
                 } 
                     var returnValue = paraObj[paras.toLowerCase()]; 
                     if(typeof(returnValue)=="undefined"){ 
                      window.location.href = "start.html"
                     return ""; 
                 }else{ 
                     return returnValue; 
                 } 
               }

              
               
               
             
              /*--获取网页传递的参数 end--*/
        $.ajax({
             type: 'POST',
             url: '/weixin/teacherday/donate/list',
             data: {teacherId: teacherId},
             dataType: 'json',
             success: function(data){
                 
                  var tercher = data.data.teacher;
                  var percent = data.data.percent;
                  var list = data.data.list;
                  $(".test").html(parseInt(percent*100)+"%")
                  w=total*percent;
                  if(w>=total){
                    fill.style.width= total+"px";
                  }else{
                  fill.style.width= w+"px";
                   }
                  
                   var template1 = _.template($('#template1').html());
                   $(".t_message").html(template1({model:tercher}));

                   var template2 = _.template($('#template2').html());
                   $(".third").html(template2({list:list}));

                    var template3 = _.template($('#template3').html());
                   $(".fix_bottom").html(template3({model:tercher}));

            // 第二次请求 begin 
             $.ajax({
              type: 'POST',
              url: '/weixin/wxconfig/getConfig',
              data:{url:url},
             dataType: 'json',
             success: function(data){
               
                var datas = data.data;
                
wx.config({
    debug: false, 
    appId: datas.appId, 
    timestamp: datas.timestamp, 
    nonceStr: datas.nonceStr, 
    signature: datas.signature,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ'] 
});

wx.ready(function(){
    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    wx.onMenuShareTimeline({
        title: '班长课代表必看', // 分享标题
        desc: "教师节别人送花送礼物，我给老师送美片",
        link:location.href,
        imgUrl: "http://7xlnue.com2.z0.glb.qiniucdn.com/219052212924779143.jpg" // 分享图标
    });
    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
    wx.onMenuShareAppMessage({
        title: '班长课代表必看', // 分享标题
        desc: "教师节别人送花送礼物，我给老师送美片", // 分享描述
        link:location.href,
        imgUrl: "http://7xlnue.com2.z0.glb.qiniucdn.com/219052212924779143.jpg", // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
    });
    // “分享到QQ”
     wx.onMenuShareQQ({
      title: '班长课代表必看',
      desc: '教师节别人送花送礼物，我给老师送美片',
      link:location.href,
      imgUrl: 'http://7xlnue.com2.z0.glb.qiniucdn.com/219052212924779143.jpg',
      
    });
});
wx.error(function(res){
   console.log(res)
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

});


                 },
             error: function(){
                 
             }
      });
            // 第二次请求 end  
         },
             error: function(){
                
         }
    })
        
          var btn_notice = document.getElementById("notice");
        var close = document.getElementById("close");
        var border_fix = document.getElementById("border_fix");
        var notice = document.getElementById("cover");
        btn_notice.onclick=function(){
          
           notice.style.display="block";

        };
        close.onclick=function(){
           notice.style.display="none";
        }
        
        
        
        
       

})