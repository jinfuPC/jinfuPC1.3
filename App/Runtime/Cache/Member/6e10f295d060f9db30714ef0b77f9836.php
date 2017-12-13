<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=10,chrome=1">
		<title>个人中心—信广金服|合规透明的金融服务平台</title>
		<meta name="keywords" content="信广金服个人中心,信广财行,信广立诚贷,合规透明的理财平台,信广金服官网,信广金服科技金融服务平台,信广金服积分商城,小额理财产品,最安全的金融理财平台,互联网金融服务平台" />
		<meta name="description" content="信广金服提供多元化投资理财服务,丰富多样的理财产品,完善的金融业务模式,全力为投资者提供更为便捷、全面的理财服务,让用户的资金不断的增值。" />
		<link rel="stylesheet" href="../../../../../Style/css/reset.css">
		<link rel="stylesheet" href="../../../../../Style/css/ycw_style.css">
		<link rel="stylesheet" href="../../../../../Style/css/wan_style.css">
		<script src="../../../../../Style/js/echarts.js"></script>
	</head>

	<body>
		<div class="ycw_ov_wrapper ycw_clearFix">
			<div class="ycw_ov_index">
				<div class="ov_index_head ycw_clearFix">
					<div class="index_portrait">
						<img src="../../../../../Style/images/overview/index_portrait.png" alt="">
					</div>
					<div class="index_username">
						<div class="username_wrapper ycw_clearFix">
							<p class="username">大日月，您好！</p>
							<span class="username_icon">
              普通
            </span>
						</div>
						<p class="un_time">上次登录时间：2017-08-29 15:58:07</p>
					</div>
				</div>
				<!--资产分配-->
				<div class="index_asset ycw_clearFix">
					<dl class="asset_wrapper">
						<dt class="asset_style asset_total">总资产（元）</dt>
						<dd class="asset_amount total_amount">0.00</dd>
					</dl>
					<dl class="asset_wrapper">
						<dt class="asset_style">账户余额（元）</dt>
						<dd class="asset_amount">0.00</dd>
					</dl>
					<dl class="asset_wrapper">
						<dt class="asset_style">代收金额（元）</dt>
						<dd class="asset_amount">0.00</dd>
					</dl>
				</div>
				<!--资产总览-->
				<div class="wan_box">
					<div class="wan_con">
						<span class="sp1">资产总览</span>
						<!--环形图-->
						<div id="main2"></div>
						<!--表格-->
						<table class="wan_tab">
							<span class="sp2"></span>
							<tr>
								<th>平台</th>
								<th>资产金额</th>
								<th>账户余额</th>
								<th>待收金额</th>
							</tr>
							<span class="sp3"></span>
							<tr>
								<td>
									<a href="#"><span class="sp4">财行优选</span></a>
								</td>
								<td>0.00</td>
								<td>0.00</td>
								<td>0.00</td>
							</tr>
							<tr>
								<td>
									<a href="#"><span class="sp5">网贷产品</span></a>
								</td>
								<td>0.00</td>
								<td>0.00</td>
								<td>0.00</td>
							</tr>
						</table>
					</div>
				</div>

			</div>
		</div>
	</body>
	<script type="text/javascript">
		var myChart = echarts.init(document.getElementById('main2'));
		// 指定图表的配置项和数据
		option = {
			title: {
				text: '资产占比',
				x: 'center',
				y: 'center',
				textStyle: {
					fontWeight: 'normal',
					fontSize: 16
				}
			},
			tooltip: {
				trigger: 'item',
				formatter: "{b}: {d}%)"
			},
			color: ['#5c89d9', '#f5814c'],
			legend: {
				orient: 'vertical',
				x: 'left',

			},
			series: [{
				name: '访问来源',
				type: 'pie',
				radius: ['65%', '90%'],
				avoidLabelOverlap: false,
				//				selectedMode: 'single',
				label: {
					normal: {
						show: false,
						position: 'center'
					}

				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
						value: 411,
						name: '财行优选'
					},
					{
						value: 959,
						name: '网贷产品'
					}
				]
			}]
		};

		myChart.setOption(option);
	</script>

</html>