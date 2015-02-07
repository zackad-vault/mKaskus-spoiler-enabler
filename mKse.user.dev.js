// ==UserScript==
// @name           mKaskus Spoiler Enabler
// @namespace      https://openuserjs.org/users/zackad/scripts
// @description    Spoiler di m.kaskus layaknya versi desktop
// @author         zackad
// @version        0.1
// @include        http://m.kaskus.co.id/*
// @license        MIT License
// @grant          GM_addStyle
// @require        http://code.jquery.com/jquery-1.10.1.min.js
// @run-at         document-end
// ==/UserScript==
$(document).ready(function(){
    var sContent = $('div[class*="content_spoiler"]');
    sContent.hide();
    $('#bbcode_div > i').append('<a class="show-spoiler" class="btn btn-sm" \
                                  style="background: #aaa;color: #FFF;padding:0 4px; font-size:10px; radius:2px;"\
                                  href="javascript:void(0);" title="Show Spoiler">Show</a>\
                                <a class="hide-spoiler" class="btn bnt-sm"\
                                  style="background: #aaa;color: #fff;padding:0 4px; font-size:10px: radius:2px;" \
                                  href="javascript:void(0);"  title="Hide Spoiler">Hide</a>');
    $('.hide-spoiler').hide();    
    $('.show-spoiler').click(function(){
        sContent.show();
        $('.show-spoiler').hide();
        $('.hide-spoiler').show();
    });
    $('.hide-spoiler').click(function(){
        sContent.hide();
        $('.hide-spoiler').hide();
        $('.show-spoiler').show();
    });
});
            
