
    $(document).ready(function(){
      var phone;
      var page=1;
       /*--获取网页传递的参数--*/
                   function request(paras)
                 { 
                      url = location.href; 
                     var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
                     var paraObj = {} 
                     for (i=0; j=paraString[i]; i++){ 
                     paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
                 } 
                     var returnValue = paraObj[paras.toLowerCase()]; 
                     if(typeof(returnValue)=="undefined"){ 
                     return ""; 
                 }else{ 
                     return returnValue; 
                 } 
               }
              var userId = request('saleUserId');
              var saleUserId=userId;
                /*--获取网页传递的参数 end--*/
                 $.ajax({
                         type: 'POST',
                         url: '/'+test+'/user/getUserInfoById',
                         data: { userId:userId},
                         dataType:'json',
                         success: function(data){
                              console.log(data);
                              var result=data.data;
                            if(data.code==200){
                               var template1 = _.template($('#template1').html());
                               $(".title_").html(template1({model:result}));
                            }else{
                              alert(data.message)
                            }
                          }
                        });
             
        var tel=$(".tel");
        tel.focus(function(){
           $(".tel").val("");
        });
        tel.blur(function(){
            phone=tel.val()+'';
           if(!(/^1[0-9]{10}$/.test(phone))){
              tel.val("请输入有效的11位手机号码"); 
             };
         });
      $(".check").focus(function(){
         $(".check").val("");
        });
       
        $(".check").blur(function(){
            verificationCode=$(".check").val();
        });
      var btn=document.getElementById("btn");
      var countdown=60; 
      function settime(val) { 
                     if (countdown == 0) { 
                        // val.setAttribute("disabled", false); 不可二次点击
                        val.removeAttribute("disabled");
                        val.value="获取验证码"; 
                        $(val).removeClass("color1").addClass("color")
                      } else { 
                        val.setAttribute("disabled", true); 
                        $(val).removeClass("color").addClass("color1")
                        val.value=countdown + "s"; 
                        countdown--; 
                      } 
                       setTimeout(function() { 
                             settime(val) 
                         },1000)
                 }

          $(".button1").click(function(){
              $.ajax({
                         type: 'POST',
                         url: '/'+test+'/user/sendCaptcha',
                         data: { phoneNumber:phone,voice:false},
                         dataType:'json',
                         success: function(data){
                              console.log(data);
                            if(data.code==200){
                              settime(btn);
                              countdown=60;
                            }else{
                              alert(data.message)
                            }
                          }
                        });
         });

         $(".button2").click(function(){
          
          if(phone&&saleUserId&&verificationCode){
              
              $.ajax({
                         type: 'POST',
                         url: '/'+test+'/sale/bindingSale',
                         data: { phone:phone,saleUserId:saleUserId,verificationCode:verificationCode},
                         dataType:'json',
                         success: function(data){
                              console.log(data);
                              if(data.code==200){
                                $(".cover1").show();
                                // alert(data.message)
                              }else{
                                alert(data.message)
                              }
                          }
                        });
             }else{
               console.log(111)
             }
        })
   // paihangbang
               $.ajax({
                         type: 'POST',
                         url: '/'+test+'/photographer/queryPhotographerLevelIntegralRanking',
                         data: { page:1,cityId:0,pageSize:10},
                         dataType:'json',
                         success: function(data){
                              console.log(data);
                              var lastPage=data.lastPage;
                             var data=data.data; 
                             var template2 = _.template($('#template2').html());
                               $("ul").html(template2({model:data}));
                               if(lastPage==true){
                               var div = document.createElement("div");
                               $(div).addClass("more");
                               $(".rand_").append(div);
                               $(".more").html("没有更多喽");
                               page=NaN;
                               }else{
                                 var div = document.createElement("div");
                                $(div).addClass("more"); 
                               $(".rand_").append(div);
                              $(".more").html("加载更多");
                               }
                          }
                        });

 $(window).scroll(function(){
  var height=document.body.scrollHeight;
if(document.body.scrollTop+document.documentElement.clientHeight>=height){
         page ++;
       
       if(page){
        
        $.ajax({
             type: 'POST',
             url: '/'+test+'/photographer/queryPhotographerLevelIntegralRanking',
             data: { page:page,cityId:0,pageSize:10},
             dataType: 'json',
             success: function(data){
              console.log(data)
             var lastPage=data.lastPage;
              var data=data.data;
               var template2 = _.template($('#template2').html());
                var mmm = document.createElement("div");
                $(mmm).addClass("sort1");
                $("ul").append(mmm); 
                $(mmm).html(template5({model:result}));
                if(lastPage==false){
                  $(".more").html("正在加载");
                 }else{
                  page=NaN;
                  $(".more").html("没有更多喽");
                  };
              
             },
             error:function(){
              console.log(222)
             }
                 });
  }//page
}
});
                // 加载更多 
      })
   