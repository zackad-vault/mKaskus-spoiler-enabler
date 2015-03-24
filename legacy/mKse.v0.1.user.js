// ==UserScript==
// @name           mKaskus Spoiler Enabler
// @namespace      https://openuserjs.org/users/zackad/scripts
// @description    Spoiler di m.kaskus layaknya versi desktop
// @author         zackad
// @version        0.1
// @include        http://m.kaskus.co.id/post/*
// @include        http://m.kaskus.co.id/thread/*
// @include        http://m.kaskus.co.id/lastpost/*
// @license        MIT License
// @grant          GM_addStyle
// @require        http://code.jquery.com/jquery-1.10.1.min.js
// @run-at         document-end
// ==/UserScript==
/*
	initial version
*/
$(document).ready(function(){
    var sContent = $('div[class*="content_spoiler"]');
    sContent.hide();

    var show_spoiler = '&nbsp&nbsp<a class="show-spoiler" class="btn btn-sm" style="background: #aaa;color: #FFF;padding:0 4px; font-size:10px; radius:2px;" href="javascript:void(0);" title="Show Spoiler">Show</a>';
    var hide_spoiler = '<a class="hide-spoiler" class="btn bnt-sm" style="background: #aaa;color: #fff;padding:0 4px; font-size:10px: radius:2px;" href="javascript:void(0);" title="Hide Spoiler">Hide</a>';
    
    $('#bbcode_div > i').append(show_spoiler, hide_spoiler);
    $('.hide-spoiler').hide();
    
    $('.show-spoiler').click(function(){
        var parent = $(this).parent().parent().parent();
        $(this).hide();
        $(this).next().show();
        
        var currentSpoiler = $(parent).children('#bbcode_spoiler_content').children('#bbcode_inside_spoiler');
        currentSpoiler.show();
    });
    
    $('.hide-spoiler').click(function(){
        var parent = $(this).parent().parent().parent();
        $(this).hide();
        $(this).prev().show();
        
        var currentSpoiler = $(parent).children('#bbcode_spoiler_content').children('#bbcode_inside_spoiler');
        currentSpoiler.hide();
    });
});
