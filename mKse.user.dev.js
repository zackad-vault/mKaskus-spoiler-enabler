// ==UserScript==
// @name           mKaskus Spoiler Enabler
// @namespace      https://openuserjs.org/users/zackad/
// @homepageURL    http://www.kaskus.co.id/profile/4125324
// @description    Spoiler di m.kaskus layaknya versi desktop
// @author         zackad
// @version        0.3.6.1
// @include        http://m.kaskus.co.id/*
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
    /*===========================================
      GLOBAL SETTINGS
    *\===========================================*/
    var Settings = {
        SHOW_ORIGIN_LINK: ['0'],   //ganti nilainya menjadi 1 untuk menampilkan grey link
        SHOW_IMAGE_ONCLICK: ['1'], //0 = buka image di tab baru, 1 = buka image langsung ditempat
        SHOW_IMAGE_SIZE: ['1'],    //0 = jangan tampilkan size gambar, 1 = tampilkan size gambar
        SHOW_WHO_POSTED: ['0'],    //0 = don't load, 1 = load , MASIH TAHAP DEVELOPMENT
        DECIMAL_POINT: [2]         //angka dibelakang koma size gambar
    };
    /*===========================================
      WHO POSTED ON THREAD  
    *\===========================================*/
    if (Settings.SHOW_WHO_POSTED == '1') {
        var list = $('#content-wrapper .post-list .list-entry');
        $('body').append('<div id="whopost"></div>');
        
        list.each(function(){
            var tLink = $(this).children('a.link_thread_title').attr('href');
            var ID = new String(tLink);
            tLink = ID.split("/");
            var tID = tLink[2];
            //console.log(tID); //log thread ID
            var urlThread = "http://kaskus.co.id/misc/whoposted/"+ tID;
            
            //open whoposted on new tab :hammer:
            var who = $('<a>Who Posted</a>')
                .attr('href', urlThread)
                .attr('target', '_blank');
            $(this).children('.sub-meta').append(who);
            });
    }
    /*===========================================
      Origin Link Hider
    *\===========================================*/
    if (Settings.SHOW_ORIGIN_LINK == '0') {
    $('span[style*="font-size:10px;color: #888;"]').hide();
    }
    
    /*===========================================
      Load Image on Click
    *\===========================================*/
    if (Settings.SHOW_IMAGE_ONCLICK == '1') {
    var image = $('a[href$=".jpg"], a[href$=".png"], a[href$=".gif"], a[href$=".JPG"], a[href$=".PNG"], a[href$=".JPEG"], a[href$=".jpeg"], a[href$=".GIF"], a[href^="http://puu.sh/"]').css({'background-color': '#333', 'color' : 'white'});
    image.each(function(){
        var temp = $(this);
        temp.attr({data : $(this).attr('href'), alt : "Click to Load Image"}).attr('href', 'javascript:void(0);');
        
        // get image size in bytes
        if (Settings.SHOW_IMAGE_SIZE == '1') {
        var xhr = $.ajax({
            type : 'HEAD',
            url : $(this).text(),
            success : function(){
                var size = xhr.getResponseHeader('Content-Length');
                if (size > 1048576){
                    size = size/1048576;// + ' MB';
                    size = new String(size);
                    var charLoc = size.indexOf(".");// + Settings.DECIMAL_POINT;
                    if (charLoc > -1) {
                        charLoc = parseInt(charLoc) + parseInt(Settings.DECIMAL_POINT) + 1;
                        //console.log(charLoc);
                        size = size.substr(0,charLoc) + ' MB';
                    }
                } else if (size > 1024){
                    size = size/1024;// + ' KB';
                    size = new String(size);
                    var charLoc = size.indexOf(".");// + Settings.DECIMAL_POINT;
                    if (charLoc > -1) {
                        charLoc = parseInt(charLoc) + parseInt(Settings.DECIMAL_POINT) + 1;
                        //console.log(charLoc);
                        size = size.substr(0,charLoc) + ' KB';
                    }
                } else {
                    size = size + ' Bytes';
                }
                temp.after('<span style = "font-size : 10px; color : #00f;"> ' + size + '</span>');//.css({'color' : 'blue', 'font-size' : '8px'});
                //alert(size);
            }});
        }
    });
    image.click(function(){
       var link = $(this).text();
       var img = $("<img />").attr('src', link);
       $(this).after(img);
       $(this).next().next().hide();
       $(this).hide();
    });
    }
    /*
        Forum Activities
    */
        var quoted = $('#subnav span a').has('sup').last();//.text("Forum Activities");
        if (quoted.children('sup').text() > 0) {
            quoted.attr('href', '/myforum/myquotedpost');
        } else {
            quoted.attr('href', '/myforum');
        }
    
    /*===========================================================
        SPOILER ENABLER 
    *\===========================================================*/
    if (window.location.href.indexOf("m.kaskus.co.id") > -1) {
    var sContent = $('div[class*="content_spoiler"]');
    sContent.hide();
    var show_all = '<a class="show-all" class="btn bnt-sm" style="margin: 0 10px;background: #ccc;color: #484848;text-decoration:none; padding:0 4px; font-size:10px: border-radius:3px;" href="javascript:void(0);" title="Show All Spoiler Inside">Show all</a>';
    var hide_all = '<a class="hide-all" class="btn bnt-sm" style="margin: 0 10px;background: #ccc;color: #484848;text-decoration:none; padding:0 4px; font-size:10px: border-radius:3px;" href="javascript:void(0);" title="Hide All Spoiler Inside">Hide all</a>';
    var show_spoiler = '&nbsp&nbsp<a class="show-spoiler" class="btn btn-sm" style="background: #ccc;color: #484848;text-decoration:none; padding:0 4px; font-size:10px; border-radius:3px;" href="javascript:void(0);" title="Show Spoiler">Show</a>';
    var hide_spoiler = '<a class="hide-spoiler" class="btn bnt-sm" style="background: #ccc;color: #484848;text-decoration:none; padding:0 4px; font-size:10px: border-radius:3px;" href="javascript:void(0);" title="Hide Spoiler">Hide</a>';
    //var toggle_link = '<a class="toggle-link" class="btn btn-sm" style="background: #F7941D;color: #FFF; position:fixed; z-index:100; top:0 font-size:15px;" href="javascript:void(0);" title="Show Link">Show Origin Link</a>';
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
    
    $('.show-all').click(function(){
        sContent.show();  
        $('.show-all').hide();
        $('.show-spoiler').hide();
        $('.hide-spoiler').show();
        $('.hide-all').show();
    });
    
    $('.hide-all').click(function(){
        sContent.hide();
        $('.hide-all').hide();
        $('.hide-spoiler').hide();
        $('.show-spoiler').show();
        $('.show-all').show();
    });
        
    function toggle_spoiler(){
        sContent.toggle();
        $('.hide-all').toggle();
        $('.show-all').toggle();
        $('.hide-spoiler').toggle();
        $('.show-spoiler').toggle();
    }
    /* Hotkey */
    window.addEventListener('keydown', function(e) {
    var keyCode = e.keyCode;
    var CSA = [e.ctrlKey, e.shiftKey, e.altKey];
    //console.log(keyCode);
    //console.log(String(CSA) + '; '+keyCode);
    
    // caseof : Shift+X
    if( e.shiftKey && keyCode == 88 ){
        toggle_spoiler()
    }
}, true);
}
});