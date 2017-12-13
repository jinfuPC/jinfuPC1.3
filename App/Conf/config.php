<?php
return array(
   //'配置项'=>'配置值'
    'APP_GROUP_LIST'    => 'Home,Admin,Member,Api,Weixin,Interface,Luntan',//分组

    //'DEFAULT_GROUP'     =>'Home',   //默认分组
    'DEFAULT_THEME'     =>'default',//使用的模板
	'TMPL_DETECT_THEME' => true,    // 自动侦测模板主题
	'LANG_SWITCH_ON'	=>true,     //开启语言包
    'URL_MODEL'=>2,                 // 如果你的环境不支持PATHINFO 请设置为3,设置为2时配合放在项目入口文件一起的rewrite规则实现省略index.php/
	'URL_CASE_INSENSITIVE'=>true,   //关闭大小写为true.忽略地址大小写
    'TMPL_CACHE_ON'    => true,        // 是否开启模板编译缓存,设为false则每次都会重新编译
    'TMPL_STRIP_SPACE'      => false,       // 是否去除模板文件里面的html空格与换行
	'TEST_PARAM'        =>true,   //统计用
    'DB_SQL_BUILD_CACHE' => true,
    	//数据库配置
    	'DB_TYPE'           => 'mysql',
    	'DB_HOST'           =>'123.56.218.34',// '192.168.0.103',//'192.168.0.118',
    	'DB_NAME'           =>'jinfu',//'tuoguancj_cn',  zinan11
    	'DB_USER'           =>'jinfu',
    	'DB_PWD'            =>'3rMNNgdlR82FBYk6NoCJ',
    	'DB_PORT'           =>'3306',
    	'DB_PREFIX'         =>'lzh_',
);
?>