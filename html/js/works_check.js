var qjData;//全局数据
$(document).ready(function() {
	getList();
});
$('.table-sort').dataTable({
	"aaSorting": [[ 1, "desc" ]],//默认第几个排序
	"bStateSave": true,//状态保存
	"aoColumnDefs": [
	  //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
	  {"orderable":false,"aTargets":[0,8]}// 不参与排序的列
	]
});
function getList(){
	$.ajax({
		type : "post",
		url : "/admin/work/list.shtml",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		dataType : "json",
		success : function(data) {
			if (data.code != 200) {
				alert("数据异常!");
				return;
			}
			qjData = data.data;
			$("#pageNumid").val(qjData.length); //第几页
			// 装载数据
			var userDatas = {
				list : data.data
			};
			var html = template('userDatas', userDatas);// 使用template渲染列表数据
			document.getElementById('content').innerHTML = html;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("服务器撂挑子了,并向你丢了个异常");
		}
	});
}
//开启审核
function check(userId){
	var imgs;
	for(var i=0; i<qjData.length;i++){
		if(userId == qjData[i].userId){
			imgs = qjData[i].work;console.log(qjData[i].work);
			break;
		}
	}
	var imgDatas = {
			work : imgs
	};
	var imghtml = template('imgs', imgDatas);// 使用template渲染列表数据
	document.getElementById('photoesId').innerHTML = imghtml;
	
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
		url : "/admin/work/yes.shtml",
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
		url : "/admin/work/no.shtml",
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