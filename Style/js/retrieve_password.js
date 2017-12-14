	//倒计时的判断，一分钟之内不能操作多次----还有发送验证码
		function gaina(ia,qa){
			if(qa==3){
				var aa=sendtwo();
				if(aa==1001){
					return false;
				}
			}
			user_phone();
//			var yz=setMobile();
//			if(yz==1){
//				return false;
//			}
//$("#false").html("");
			$("#min").html(ia--);
			$(".hqyzm").css("background-color","#999999");
			if(ia>=0){
				$("#yzma").css("display","none");
				$("#yzmb").css("display","inline-block");
				setTimeout('gaina('+ia+',1)',1000) 
			}else{
				$(".hqyzm").css("background-color","#E5D1AF");
				$("#yzma").css("display","inline-block");
				$("#yzmb").css("display","none");
				$("#min").html(60);
			}
		}

		function gainb(){
			$("#false").html("操作频繁！");
		}

		function user_phone(){
			var mobile = $("#tel").val();
			if(mobile.length < 2){
				$("#fal").html('请输入正确手机号码');return false;
			}
			$("#fal").html('');
		}

		function panduan(){
			var mobile = $("#tel").val();
			if(mobile=="请输入手机号码"){
				$("#tel").val("");
			}
		}
		function yyy(){
			var mobile = $("#emaiyzm").val();
			if(mobile=="请输入验证码"){
				$("#emaiyzm").val("");
			}
		}

//找回密码的手机验证码的发送
	function sendtwo(){
		var result=0; 
		var mobile = $("#tel").val();
		if (mobile == "请输入手机号码") {
			$("#fal").html("请输入你的手机号！");
			return 1001;
		}
//15210520361
		var partten = /(^(13|15|18|14|17)(\d){9}$)|(^189\d{8}$)/;
		if (partten.test(mobile)){
			$.ajax({
				url: "/Member/Common/sendphonezh/",
				type: "post",
				dataType:'json',  
				cache : false,  
				async : false, 
				data: {"cellphone":mobile},
				success: function(d){
					if (d.status == 1){
						$("#fal").html("发送成功！");
						result=1000;  
					}else if(d.status==4){
						$("#fal").html("短信发送次数超限！");
						result=1001;  
					}else if (d.status == 2){
						$("#fal").html("没有此用户！");
						result=1001;  
					}else{
						$("#fal").html("验证发送失败！");
						result=1001;  
					}
				}
			});
		}else{
			$("#fal").html("手机号码格式错误");
			result=1001;  
		}
		 return result;
	}


		//找回密码的手机验证码的判断
	function setMobile(){
		//alert('shiyanchenggong');
		var code = $('#emaiyzm').val();

		if(code == ""){
			return false;
		}else{
		//alert(code);
			$.ajax({
				url: "/Member/Common/validatephonezh",
				type: "post",
				dataType: "json",
				data: {"code":code},
				success: function(d){
					if (d.status==1){
		//location.href="/member/common/getpasswordverify?codezh="+code;
						$("#false").html("验证成功");
						location.href="/member/common/csmm?code="+code;
						return true;
					}else {
						//$("#false").html("444");
						$("#false").html(d.message);
						return false;
					}
				}
			});
		}
	}

	function csm(){
		var code = $('#emaiyzm').val();
		if(setMobile() && ver()){
			location.href="/member/common/csmm?code="+code;
		}else{
			return false;
		}
		
	}

	//图形验证码
	function ver(){
		var str = $('input[name=verify]').val();
		if(str.length>0){
			verify2();
		}else{
			return false;
		}
	}

	function verify2() {
		var str = $('input[name=verify]').val();
		if (str == "") {
			//verify = 0;
			$("#spyzm").html("验证码不能为空");
			return false;
		} else {
			$.ajax({
				url: "/Member/common/ckcode/",
				type: "post",
				dataType: "text",
				data: {"sVerCode":str} ,
				success: function(d){
					var resD = parseInt(d);
					if (resD == 2) {
						//verify = 1;
						$("#yzmq").css("display","none");
						$("#yzmw").css("display","block");
						return true;
					} else {
						$("#yzmq").css("display","block");
						$("#yzmw").css("display","none");
						return false;
					}
				}
			});

		}
	}


	function txyzm(){
		if($("#verify").val()=="请输入图形验证码"){
			$("#verify").val("");
		}
	}