$(document).ready(function(){
    function preLoadImg(url) { 
var img = new Image(); 
img.src = url; 
} 
   preLoadImg("images/bg.png");
     
     var pay = $("#pay");
     var schoolName,teacherName,teacherMobile,studentName,className,benediction,amount,studentMobile,payChannel,code;

      $(".t_phone input").blur(function(){
        var phone = $(".t_phone input").val();
         if(!(/^1[0-9]{10}$/.test(phone))){
         $("#phone").val("请输入有效的11位手机号码"); 
      }
      })
       $(".t_phone input").focus(function(){
          $("#phone").val("");
       })

       $(".stu_phone input").blur(function(){
        
         var phone_stu = $(".stu_phone input").val();
         if(!(/^1[0-9]{10}$/.test(phone_stu))){
         $("#stu_phone").val("请输入有效的11位手机号码");
      }
      })
       $(".stu_phone input").focus(function(){
          $("#stu_phone").val("");
       })

      $(".t_school input").blur(function(){
         
        schoolName = $(".t_school input").val();
        console.log(schoolName)
        if(!schoolName){
           $(".t_school input").val("请输入有效信息");
        };
        schoolName = $(".t_school input").val();
        console.log(schoolName)
      });
       $(".t_school input").focus(function(){
          $(".t_school input").val("");
       })
       $(".t_name input").blur(function(){
         
        teacherName = $(".t_name input").val();
        if(!teacherName){
            $(".t_name input").val("请输入有效信息");
        };
        teacherName = $(".t_name input").val();
        console.log(teacherName)
      });
       $(".t_name input").focus(function(){
          $(".t_name input").val("");
       })
        $(".t_phone input").blur(function(){
          
         teacherMobile = $(".t_phone input").val()
      });

         $(".stu_name input").blur(function(){
           
        studentName = $(".stu_name input").val();
        if(!studentName){
            $(".stu_name input").val("请输入有效信息");
        };
        studentName = $(".stu_name input").val();
      });
         $(".stu_name input").focus(function(){
          $(".stu_name input").val("");
       })  
        $(".stu_phone input").blur(function(){
          
         studentMobile = $(".stu_phone input").val()
      });

          $(".stu_class input").blur(function(){
            
        className = $(".stu_class input").val();
        if(!className){
            $(".stu_class input").val("请输入有效信息");
        };
        className = $(".stu_class input").val();
      });
       $(".stu_class input").focus(function(){
          $(".stu_class input").val("");
       })  
          $(".stu_wishes textarea").focus(function(){
            
            $(this).val("");
          })

           $(".stu_wishes textarea").blur(function(){
             
        benediction = $(".stu_wishes textarea").val();
       
         if(!benediction){
            $(".stu_wishes textarea").val("在您关注的目光之下，给予了我无尽的信心和勇气！您是我永远的老师！衷心祝您健康幸福！");
        }
        benediction = $(".stu_wishes textarea").val();
      });

         
          //判断
               function isWeiXin(){ 
                  var ua = window.navigator.userAgent.toLowerCase(); 
                  if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
                   return true; 
                  }else{ 
                  return false; 
               } 
             };
               if(isWeiXin()){ 
                payChannel = "wx_pub";
               
             }else{
              payChannel = "wx_wap";
             
             };
       
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
                     return ""; 
                 }else{ 
                     return returnValue; 
                 } 
               }

              
               
             
              /*--获取网页传递的参数 end--*/     

     pay.click(function(){
      
        // 第一次请求 begin 
  	    $.ajax({
        type: 'POST',
        url: '/weixin/teacherday/new',
        data: { schoolName: schoolName,teacherName:teacherName,teacherMobile:teacherMobile,studentName:studentName,className:className,benediction:benediction,studentMobile:studentMobile},
        dataType: 'json',
        success: function(data){
         
          if(data.code==200){
            var tid = data.data.tid;
          
            var  redirect="http://test.allxiu.com/h5/teacherday/pay.html?tid="+tid;
         window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa1f70fd6edc9b409&redirect_uri="+redirect+"&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect"; 
           code = request('code');
        
          }
//           
        },
        error: function(){
        console.log('error!')
        }
        })
  })
});