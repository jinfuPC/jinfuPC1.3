// placeholder提示
var $text=$('.inputBox input').siblings('em');
$text.click(function(){
    $(this).hide();
    $(this).siblings('input').trigger('focus');
})
$('.inputBox input').focus(function() {
    $(this).siblings('em').hide();
});
$('.inputBox input').blur(function(){
    if(!$(this).val())
        $(this).siblings('em').show();
});
// placeholder提示