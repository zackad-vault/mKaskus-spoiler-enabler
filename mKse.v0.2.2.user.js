// ==UserScript==
// @name           mKaskus Spoiler Enabler
// @namespace      https://openuserjs.org/users/zackad/
// @homepageURL    http://www.kaskus.co.id/profile/4125324
// @description    Spoiler di m.kaskus layaknya versi desktop
// @author         zackad
// @version        0.2.2
// @include        http://m.kaskus.co.id/post/*
// @include        http://m.kaskus.co.id/thread/*
// @include        http://m.kaskus.co.id/lastpost/*
// @license        MIT License
// @grant          GM_addStyle
// @require        http://code.jquery.com/jquery-1.10.1.min.js
// @run-at         document-end
// ==/UserScript==
$(document).ready(function(){
    $('span[style*="font-size:10px;color: #888;"]').hide();
    
    var sContent = $('div[class*="content_spoiler"]');
    sContent.hide();
    var show_spoiler = '&nbsp&nbsp<a class="show-spoiler" class="btn btn-sm" style="background: #ccc;color: #484848;text-decoration:none; padding:0 4px; font-size:10px; border-radius:3px;" href="javascript:void(0);" title="Show Spoiler">Show</a>';
    var hide_spoiler = '<a class="hide-spoiler" class="btn bnt-sm" style="background: #ccc;color: #484848;text-decoration:none; padding:0 4px; font-size:10px: border-radius:3px;" href="javascript:void(0);" title="Hide Spoiler">Hide</a>';
    
    $('#bbcode_div > i').after(show_spoiler, hide_spoiler);
    $('.hide-spoiler').hide();
    
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
});
