function time1(o) {
    if (wait == -1) {
        wait = 60;
        o.value = "语音验证";
        document.getElementById("yuyin").disabled = false;
        document.getElementById("duanxin").disabled = false;
        $('#yuyin').css('background','#58b7e3');
        $('#duanxin').css('background','#58b7e3');
        //alert('yuyin');
    } else {
        o.value = "(" + wait + ")语音验证";
        wait--;
        setTimeout(function () {
                time1(o)
            },
            10000);
    }

}

function yuyin2(obj){
    var mobile = $("input[name=mobile]").val();
    var sVerCode = $('input[name=verify]').val();
    //alert(mobile);
    //					if (mobile == "") {
    //						$('#sendSMSTip').html("请输入手机号码");
    //						return false;
    // 					}
    var partten = /(^(13|15|18|14|17)(\d){9}$)|(^189\d{8}$)/;
    if (partten.test(mobile)){
        document.getElementById("duanxin").disabled = true;
        document.getElementById("yuyin").disabled = true;
        $('#yuyin').css('background','#cdcdcd');
        $('#duanxin').css('background','#cdcdcd');
        time1(obj);
        $("#spTip").html("<font>短信已发送</font>");
        $("#yzm").css("border","1px solid #EC7173");
        $("#yzm").css("border-bottom-left-radius","0");
        $("#yzm").css("border-bottom-right-radius","0");
        $.ajax({
            url: "/Member/Common/sendphone/",
            type: "post",
            dataType: "json",
            data: {"cellphone":mobile,'code':'yuyin','sVerCode':sVerCode},
            success: function(d){
                leftsecond = 60;
                if (d.status == 1){
                   // $("input[name=mobile]").attr("readonly", true);
                    timer = setInterval(setLeftTime, 1000, "1");
                    return true;
                }
                else if (d.status == 2){
                    $("#spTip").html("<font color='#eb6100' size='2'>该号码已被使用</font>");
                    $("#yzm").css("border","1px solid #EC7173");
                    $("#yzm").css("border-bottom-left-radius","0");
                    $("#yzm").css("border-bottom-right-radius","0");
                }else{
                    msg = "校验码发送失败,请重试";
                    $("#sendSMSTip").html(msg);
                    $("#yzm").css("border","1px solid #EC7173");
                    $("#yzm").css("border-bottom-left-radius","0");
                    $("#yzm").css("border-bottom-right-radius","0");
                    //$("#txt_phone").attr("readonly", true);
                }
            }
        });
    }else{
        $("#spTip").html("<font color='#eb6100' size='2'>手机号码错误</font>");
    }
}


//阻止表单提交
function newreg(){

	tuijianren();
	fpwd();
    P_phone();
	//alert(11);return false;
    if(yz_pwd==1||yz_phone==1||verify==1){
        return false;
    }
    var obj = document.getElementsByName("fukuang");//选择所有name="interest"的对象，返回数组
    var s=0;//如果这样定义var s;变量s中会默认被赋个null值
    for(var i=0;i<obj.length;i++){
        if(obj[i].checked) //取到对象数组后，我们来循环检测它是不是被选中
            s+=1;   //如果选中，将value添加到变量s中
    }
    if(s!=1){
        alert("请选中合同");
        return false;
    }
    var mobile = $("input[name=mobile]").val();
   // var yzm=$("#yzm").val();
    var tj=$("#tj").val();
    var pwd=$("input[name=pwd]").val();
    var str = $('input[name=verify]').val();
	var yzm = $("#yfdxinput").val();

    $.ajax({
        url: "/Member/Common/reg_do",
        type: "post",
        dataType: "json",
        data: {"mobile":mobile,"tj":tj,"pwd":pwd,"sVerCode":str,"yzm":yzm},
        success: function(data){
            if(data.status==1){
                location.href="/Member/Overview.html?tankuang=tankuang";
            }else {
               alert(data.message);
            }
        }
    });
}



//图文验证
verify = 1;
function verify2() {
	
 //    P_phone();
	// fpwd();

	// if(yz_pwd==1||yz_phone==1){
 //        return false;
 //    }

    var str = $('input[name=verify]').val();
    if (str == "验证码"||str=="") {
        verify = 1;
        $("#verifyTop").html("<font color='#eb6100' size='2'>图文验证码不能为空!</font>");
        $("#verify").css("border","1px solid #ff7800");
        $("#verify").css("box-shadow","0px 0px 3px #ff7800");
    } else if(str.length>=5){
        $.ajax({
            url: "/Member/Common/ckcode/",
            type: "post",
            dataType: "json",
            data: {"sVerCode":str},
            success: function(d){
                if (d == 1) {
                    verify = 1;
					document.getElementById("yuyina").disabled = false;
                    $("#verifyTop").html("<font color='#eb6100' size='2'>图文验证码失败!</font>");
                    return false;
                } else if (d == 2) {
					verify = 0;
					$("#verifyTop").html("");
					//$('#hyzm').hide();
                    //$('#yfdxinput').removeAttr("disabled");
                     //$('.tui').removeAttr("disabled");
					telephone(yz_pwd,verify,yz_phone,wait);					
                    /*verify = 0;
                    $('#hyzm').hide();
                    $('#yfdxinput').removeAttr("disabled");
                     $('.tui').removeAttr("disabled");*/
                      //手机号 和 密码通过 
                        /*if(yz_pwd ==0 && yz_phone ==0){
                           // hqyzm(60);
							verify = 0;
							$('#hyzm').hide();
							$('#yfdxinput').removeAttr("disabled");
							$('.tui').removeAttr("disabled");
							time(-1);                           
                            $("#verifyTop").html("");
                        }*/					
                }

            }
        });

    }
}

function telephone(yz_pwd,verify,yz_phone,wait){
	//手机号 和 密码通过 
	if(yz_pwd ==0 && yz_phone ==0 && verify==0 && wait==60){
	   
		$('#hyzm').hide();
		$('#cfdx').show();
		$('#yfdxinput').removeAttr("disabled");
		$('.tui').removeAttr("disabled");
		//time(-1);		                           
		$("#verifyTop").html("");
	}	
}
//推荐人
tuijir="";
function tuijianren(){
	var tjr = $("#tj").val();
    if(tjr == ""){
        $("#sptjr").html("<font color='red'></font>");
        yz_pwd=1;
    }else{
	$.ajax({
		url: "/Member/Common/tuijianren/",
		type: "post",
		data: {
			"tjr": tjr
		},
		success: function (d) {
			if (d == 0) {
				tuijir=0;
				$("#sptjr").html("<font color='red'>没有此推荐人</font>");
			   // $("#sptjr").css("background-image", "url(../images/error.png) no-repeat left center");
			} else {
				tuijir=1;
				$("#sptjr").html("<font color='red'></font>");
			}
		}
	});
}
}


//密码
yz_pwd=1;
function fpwd(){
    $("#sppw_one").empty();
    var pwd = $("input[name=pwd]").val();
    var pwdt = $("#pw_two").val();
    
    
    if(pwd == ""){
        $("#sppw_one").html('<font style="color:#eb6100">密码不能为空</font>');
        $("input[name=pwd]").css("border","1px solid #ff7800");
        $("input[name=pwd]").css("box-shadow","0px 0px 3px #ff7800");
        yz_pwd=1;
    }else if(pwd.length<6){
        $("#sppw_one").html('<font style="color:#eb6100">密码长度不能少于6个字符</font>');
        $("input[name=pwd]").css("border","1px solid #ff7800");
        $("input[name=pwd]").css("box-shadow","0px 0px 3px #ff7800");
        yz_pwd=1;
    }else if(pwd.length > 20){
        $("#sppw_one").html('<font style="color:#eb6100">密码长度不能大于20个字符</font>');
        $("input[name=pwd]").css("border","1px solid #ff7800");
        $("input[name=pwd]").css("box-shadow","0px 0px 3px #ff7800");
        yz_pwd=1;
    }else{
        //$('#verify').removeAttr("disabled").focus();
        yz_pwd=0;
        if(verify == 0 && yz_phone==0){
           // hqyzm(60);
            /*$("#twyz").css("display","none");*/
            /*$("#duanxininput").css("display","block");*/
            
            $('#pw_two').removeAttr("disabled").focus();
           
            $(".verifyTop").html("");
			telephone(yz_pwd,verify,yz_phone,wait);
        }

        $("input[name=pwd]").css("border","1px solid #ff7800");

        $("input[name=pwd]").css("box-shadow","");
		//document.getElementById("verify").readOnly=false;
        return true;
    }
}
/*<!--确认密码删了20170313liqiqi-->*/
/*function pwtwo(){
    $("#sppw_two").empty();
    var pwd = $("input[name=pwd]").val();
    var pwdt = $("#pw_two").val();
   if(pwd == ""){
        $("#sppw_two").html('<font style="color:#eb6100">确认密码不能为空</font>');
        $("#pw_two").css("border","1px solid #ff7800");
        $("#pw_two").css("box-shadow","0px 0px 3px #ff7800");
        yz_pwd=1;
    } 
    if(pwd != pwdt){
        $("#sppw_two").html('<font style="color:#eb6100">两次密码输入不一致</font>');
        $("#pw_two").css("border","1px solid #ff7800");
        $("#pw_two").css("box-shadow","0px 0px 3px #ff7800");
        //yz_pwd=1;
    }else{
        $("#sppw_two").html('');
        $('#verify').removeAttr("disabled").focus();
       
        
        
        //yz_pwd=1;
    }
}*/

//键盘
//手机号
yz_phone=1;
function P_phone(){
    //geshi();
    var num = $('input[name=mobile]').val();
    // alert(11);
    if(num==""){
		
        //var sendSMSTip$('#sendSMSTip').val();
        $("#spphone").html("<font color='#eb6100' size='2'>手机号不能为空！</font>");
		
        $("input[name=mobile]").css("border","1px solid #ff7800");
        $("input[name=mobile]").css("box-shadow","0px 0px 3px #ff7800");

		//$('input[name=pwd]').attr("readonly","readonly"); 
        return false;
    }
    var partten = /(^(13|15|18|14|17)(\d){9}$)|(^189\d{8}$)/;
    if(partten.test(num)){
        $.ajax({
            url: "/Member/Common/ajax_username",
            type: "post",
            data: {"num":num},
            success: function(d){
                //alert(d);return false;
                if(d==1){
                    $("#spphone").html("<font color='#eb6100' size='2'>此手机号已经使用过</font>");
                   // $("#spphone").css("border","1px solid #ff7800");
                   // $("#spphone").css("box-shadow","0px 0px 3px #ff7800");
                    yz_phone=1;
                }else{
					//document.getElementById("pw_one").readOnly=false;
					//document.getElementById("pw_one").disabled = false;
                    $("#spphone").html("");
                    $('input[name=pwd]').removeAttr("disabled");
                    $('input[name=pwd]').focus();
                    
                    
                    
					//P_phoneon();
					//P_phone();
					//document.all("password").focus();

					//setTimeout("aaaa()",1500);

					//document.getElementById("pw_one").focus;	
                    yz_phone=0;
                    if(verify == 0 && yz_pwd==0){
                       // hqyzm(60);
                        /*$("#twyz").css("display","none");*/
                        /*$("#duanxininput").css("display","block");*/
                        
                        $(".verifyTop").html("");
						telephone(yz_pwd,verify,yz_phone,wait);
                    }
                    $("input[name=mobile]").css("border","1px solid #ff7800");
                    $("#spphone").css("box-shadow","");
                }
            }
        });
    }else{
        //alert('不是手机号码');
        $("#spphone").html("<font color='#eb6100' size='2'>请输入11位正确的手机号码</font>");
        $("input[name=mobile]").css("border","1px solid #ff7800");
        $("input[name=mobile]").css("box-shadow","0px 0px 3px #ff7800");
        yz_phone=1;
    }
}



function P_phoneon(){

    //geshi();
    var num = $('input[name=mobile]').val();

    if(num==""){
		
        //var sendSMSTip$('#sendSMSTip').val();
        $("#spphone").html("<font color='#eb6100' size='2'>手机号不能为空！</font>");
		
        $("input[name=mobile]").css("border","1px solid #ff7800");
        $("input[name=mobile]").css("box-shadow","0px 0px 3px #ff7800");

		//$('input[name=pwd]').attr("readonly","readonly");
        return false;
    }
     // alert(verify);     
    var partten = /(^(13|15|18|14|17)(\d){9}$)|(^189\d{8}$)/;
    if(partten.test(num)){
        $.ajax({
            url: "/Member/Common/ajax_username",
            type: "post",
            data: {"num":num},
            success: function(d){
                if(d==1){
                    $("#spphone").html("<font color='#eb6100' size='2'>此手机号已经使用过</font>");
                   // $("#spphone").css("border","1px solid #ff7800");
                   // $("#spphone").css("box-shadow","0px 0px 3px #ff7800");
                    yz_phone=1;
                }else{
					document.getElementById("pw_one").readOnly=false;			
                    $("#spphone").html("");
					//P_phone();
					//document.getElementById("pw_one").focus;
                   
                    yz_phone=0;
                    if(verify == 0 && yz_pwd==0){
                        hqyzm(60); 
						telephone(yz_pwd,verify,yz_phone,wait);						
                        /*$("#twyz").css("display","none");*/
                        /*$("#duanxininput").css("display","block");*/                    
                    }
                    $("input[name=mobile]").css("border","1px solid #ff7800");
                    $("#spphone").css("box-shadow","");
                }
            }
        });
    }else{
        //alert('不是手机号码');
        //$("#spphone").html("<font color='#eb6100' size='2'>手机号格式不正确 </font>");
      //  $("input[name=mobile]").css("border","1px solid #ff7800");
        //$("input[name=mobile]").css("box-shadow","0px 0px 3px #ff7800");
        yz_phone=1;
    }
}


///获取验证码
wait = 60;
function time(o) {
    if (o == -1) {
        wait = 60;
		$("#yuyina").css("display","inline-block");
		$("#yuyinb").css("display","none");
		//("#duanxininput").css("display","none");
		$("#fsz").css("display","none");
		$("#cfdx").css("display","block");
        $(".yyyzs").css("display","block");
        
    }else {
		if(!$("input[name=yzm]").val() && o == 0){
			$('.l_box').show();
		}
		wait--;
		$("#yuyina").css("display","none");
		$("#yuyinb").css("display","inline-block");
        $(".yyyzs").css("display","block");
        var a= "短信验证(" + o + ")";
		$("#fsz").html(a);
        o--;
        setTimeout(function () {
                time(o)
            },
            1000);
    }
}
sphu=0;
function hqyzm(obj){
    if(wait != 60) return;
    var mobile = $("input[name=mobile]").val();
    var sVerCode = $('input[name=verify]').val();
    //var sVerCode = "2221";
    var partten = /(^(13|15|18|14|17)(\d){9}$)|(^189\d{8}$)/;
    if (partten.test(mobile)){
        $.ajax({
            url: "/Member/Common/sendphonenews/",
            type: "post",
            dataType: "json",
            data: {"cellphone":mobile,"code":'duanxin',"sVerCode":sVerCode,"zsyzm":1},
            success: function(d){
                if (d.status == 1){
                    time(obj);
					sphu=1;
                    //$("input[name=mobile]").attr("readonly", true);
                    $("#spTip").html("<span style='color:#EC7173;width:10px;float:right;' size='2'>√</span>");
                    $("#yzm").css("border","1px solid #EC7173");
                    
                    $("#hqyzml").val("已发送");

					/*$("#twyz").css("display","none");*/
					/*$("#duanxininput").css("display","block");*/

					$("#fsz").css("display","block");
 	                $("#cfdx").css("display","none");
                    

                    return false;
                }else{
					sphu=0;
					
					$(".verifyTop2").html("<font color='#eb6100' size='2'>"+d.message+"</font>");
                    $("#spTip").html("<span style='color:green;width:10px;float:right;' size='2'>×</span>");
                    $("#yzm").css("border","1px solid #EC7173");
                    //$("#txt_phone").attr("readonly", true);
                }
            }
        });
    }else{
		sphu=0;
		$("#spphone").html("<font color='#eb6100' size='2'>请填写正确的手机号</font>");
        $("#spTip").html("<span style='color:red;width:10px;float:right;' size='2'>×</span>");
        $("#yzm").css("border","1px solid #ccc");
        //$("#sendSMSTip").html("");
    }
}


	function yuyin(obj){
        if(wait != 60) return;
		var mobile = $("input[name=mobile]").val();
		var sVerCode = $('input[name=verify]').val();

		$.ajax({
				url: "/Member/Common/sendphonenews/",
				type: "post",
				dataType: "json",
				data: {"cellphone":mobile,"code":'yuyin',"sVerCode":sVerCode,"zsyzm":1},
				success: function(d){
					if (d.status == 1){
						time(obj);
						sphu=1;
						/*$("#twyz").css("display","none");*/
						/*$("#duanxininput").css("display","block");*/
                        

						$("#fsz").css("display","block");
						$("#cfdx").css("display","none");
                        
                        

						return false;
					}else{
						sphu=0;
						
						$(".verifyTop2").html("<font color='#eb6100' size='2'>"+d.message+"</font>");
						$("#spTip").html("<span style='color:green;width:10px;float:right;' size='2'>×</span>");
						$("#yzm").css("border","1px solid #EC7173");
						//$("#txt_phone").attr("readonly", true);
					}
				}
			});
	}


	function fpwdon(){
		var pw_one=$("input[name=pwd]").val();
		if(pw_one.length>=6){
            
			document.getElementById("verify").readOnly=false;
            $("#sppw_two").html('');
            //$('#verify').removeAttr("disabled").focus();
            /*$('#pw_two').removeAttr("disabled");*/
		}
        if(pw_one.length<6){
           // alert(11)
        }
	}





	/*tuxing=1;
	function aaaa(){
		if(tuxing>=2){
			return false;
		}
		tuxing+=1;
		$("#twyz").css("display","block");
		document.getElementById("imVcode").onclick();
	}*/
	

