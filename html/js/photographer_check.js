var qjData;//全局数据
var qjPage=0;//全局页码
$(document).ready(function() {
	getList();
});
$('.table-sort').dataTable({
	"aaSorting" : [ [ 1, "desc" ] ],// 默认第几个排序
	"bStateSave" : true,// 状态保存 
	"aoColumnDefs" : [
	// {"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
	{
		"orderable" : false,
		"aTargets" : [ 0, 8 ]
	} // 不参与排序的列
	]

});
function getList(type){
	if(type==null){
		qjPage++;//页码自增
	}else if(type=="after"){//上一页
		if(qjPage==1){
			alert("这已经是第一页了,不要企图强行翻页!")
			return;
		}
		qjPage--;
	}else if(type=="top"){//下一页
		if(qjData.length<10){
			alert("没有更多了!")
			return;
		}
		qjPage++;
	}
	$("#pageNumid").val("第"+qjPage+"页"); //第几页
	$.ajax({
		type : "post",
		url : "/admin/idCard/list.shtml",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		dataType : "json",
		data : {
			pageIndex : qjPage
		},
		success : function(data) {
		
			if (data.code != 200) {
				alert("数据异常!");
				return;
			}
			qjData = data.data;
			// 装载数据
			var userDates = {
				list : data.data
			};
			var html = template('userDates', userDates);// 使用template渲染列表数据
			document.getElementById('content').innerHTML = html;
			//当前总条数
			var pageNum = {
					page : qjData.length
			};
			var datanum = template('pageNum', pageNum);
			document.getElementById('datanum').innerHTML = datanum;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("服务器撂挑子了,并向你丢了个异常");
		}
	});
}
//开启审核
function check(userId){
	var idCardUrl;
	var idCard;
	var name;
	for(var i=0; i<qjData.length;i++){
		console.log(qjData);
		if(userId == qjData[i].userId){
			idCardUrl = qjData[i].idCardUrl;
			if(idCardUrl.substr(0,17)=="image.allxiu.com/"){
				idCardUrl = idCardUrl.slice(17);
			}
			if(idCardUrl.substr(0,32)=="7xlnue.com2.z0.glb.qiniucdn.com/"){
				idCardUrl = idCardUrl.slice(32);
			}
			idCard = qjData[i].idCard;
			name = qjData[i].realName;
			break;
		}
	}
	var imgDates = {
			idCardUrla : "http://image.allxiu.com/"+idCardUrl,
			idCarda : idCard,
			namea : name
	};
	var imghtml = template('imgs', imgDates);// 使用template渲染列表数据
	document.getElementById('imgid').innerHTML = imghtml;
	
	var buttonDatas = {
			userIda : userId
	};
	var buttonhtml = template('buttons', buttonDatas);// 使用template渲染列表数据
	document.getElementById('checkButtonid').innerHTML = buttonhtml;
	$(".check_cover").show();	
}	
	
//关闭审核
function close(){
	$(".check_cover").hide();
}
//通过
function yes(userId){
	$.ajax({
		type : "post",
		url : "/admin/idCard/yes.shtml",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		dataType : "json",
		data : {
			userId : userId
		},
		success : function(data) {
			if (data.code == 200) {
				alert("操作成功!");
				window.location.reload();
				return;
			}else if(data.code == 201){
				alert(data.message);
				return;
			}
			alert("操作失败!")
			return;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("服务器撂挑子了,并向你丢了个异常");
		}
	});
}
//不通过
function no(userId){
	$.ajax({
		type : "post",
		url : "/admin/idCard/no.shtml",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		dataType : "json",
		data : {
			userId : userId
		},
		success : function(data) {
			if (data.code == 200) {
				alert("操作成功!");
				window.location.reload();
				return;
			}
			alert("操作失败!")
			return;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("服务器撂挑子了,并向你丢了个异常");
		}
	});
}