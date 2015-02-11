// ==UserScript==
// @name           mKaskus Spoiler Enabler - Beta
// @namespace      https://openuserjs.org/users/zackad/
// @homepageURL    http://www.kaskus.co.id/profile/4125324
// @description    Spoiler di m.kaskus layaknya versi desktop
// @author         zackad
// @version        0.4 beta
// @include        http://m.kaskus.co.id/post/*
// @include        http://m.kaskus.co.id/thread/*
// @include        http://m.kaskus.co.id/lastpost/*
// @include        /^https?://www.kaskus.co.id/thread/*/
// @include        /^https?://www.kaskus.co.id/lastpost/*/
// @include        /^https?://www.kaskus.co.id/post/*/
// @include        /^https?://www.kaskus.co.id/group/discussion/*/
// @include        /^https?://www.kaskus.co.id/show_post/*/
// @grant          GM_addStyle
// @license        MIT License
// @require        http://code.jquery.com/jquery-1.10.1.min.js
// @run-at         document-end
// ==/UserScript==
$(document).ready(function(){
    $('span[style*="font-size:10px;color: #888;"]').hide();
    
    if (window.location.href.indexOf("m.kaskus.co.id") > -1) {
    var sContent = $('div[class*="content_spoiler"]');
    sContent.hide();
    var show_all = '<a class="show-all" class="btn bnt-sm" style="margin: 0 10px;background: #ccc;color: #484848;text-decoration:none; padding:0 4px; font-size:10px: border-radius:3px;" href="javascript:void(0);" title="Show All Spoiler Inside">Show all</a>';
    var hide_all = '<a class="hide-all" class="btn bnt-sm" style="margin: 0 10px;background: #ccc;color: #484848;text-decoration:none; padding:0 4px; font-size:10px: border-radius:3px;" href="javascript:void(0);" title="Hide All Spoiler Inside">Hide all</a>';
    var show_spoiler = '&nbsp&nbsp<a class="show-spoiler" class="btn btn-sm" style="background: #ccc;color: #484848;text-decoration:none; padding:0 4px; font-size:10px; border-radius:3px;" href="javascript:void(0);" title="Show Spoiler">Show</a>';
    var hide_spoiler = '<a class="hide-spoiler" class="btn bnt-sm" style="background: #ccc;color: #484848;text-decoration:none; padding:0 4px; font-size:10px: border-radius:3px;" href="javascript:void(0);" title="Hide Spoiler">Hide</a>';
    
    $('#bbcode_div > i').after(show_spoiler, hide_spoiler, show_all, hide_all);
    $('.hide-spoiler').hide();
    $('.hide-all').hide();
    
    $('.show-spoiler').click(function(){
        var parent = $(this).parent().parent();
        $(this).hide();
        $(this).next().show();
        
        var currentSpoiler = $(parent).children('#bbcode_spoiler_content').children('#bbcode_inside_spoiler');
        currentSpoiler.show();
    });
    
    $('.hide-spoiler').click(function(){
        var parent = $(this).parent().parent();
        $(this).hide();
        $(this).prev().show();
        
        var currentSpoiler = $(parent).children('#bbcode_spoiler_content').children('#bbcode_inside_spoiler');
        currentSpoiler.hide();
    });
    
        
    // THIS IS BETA VERSION
        
    $('.show-all').click(function(){
        //sContent.show();
        var me = $(this).parent();
        var spoiler = me.closest('.spoiler');
        spoiler.find('div[class*="content_spoiler"]').show();
        spoiler.find('.hide-all').show();
        spoiler.find('.show-all').hide();
        spoiler.find('.show-spoiler').hide();
        spoiler.find('.hide-spoiler').show();
/*        
        $('.show-all').hide();
        $('.show-spoiler').hide();
        $('.hide-spoiler').show();
        $('.hide-all').show();
*/
    });
    
    $('.hide-all').click(function(){
        var me = $(this).parent();
        var spoiler = me.closest('.spoiler');
        spoiler.find('div[class*="content_spoiler"]').hide();
        spoiler.find('.hide-all').hide();
        spoiler.find('.show-all').show();
        spoiler.find('.show-spoiler').show();
        spoiler.find('.hide-spoiler').hide();
/*
        sContent.hide();
        $('.hide-all').hide();
        $('.hide-spoiler').hide();
        $('.show-spoiler').show();
        $('.show-all').show();
*/
    });
        
    function toggle_spoiler(){
        sContent.toggle();
        $('.hide-all').toggle();
        $('.show-all').toggle();
        $('.hide-spoiler').toggle();
        $('.show-spoiler').toggle();
    }
        
    window.addEventListener('keydown', function(e) {
    var keyCode = e.keyCode;
    var CSA = [e.ctrlKey, e.shiftKey, e.altKey];
    console.log(keyCode);
    console.log(String(CSA) + '; '+keyCode);
    
    // caseof : Shift+X
    if( e.shiftKey && keyCode == 88 ){
        toggle_spoiler()
    }
}, true);
}
});
