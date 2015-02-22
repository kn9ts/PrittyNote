/**
 *
 *@Author - Eugene Mutai
 *@Twitter - JheneKnights
 *
 * Date: 3/10/13
 * Time: 7:03 PM
 * Description: Model javascript Script for PrittyNote
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-2.0.php
 *
 * Copyright (C) 2013
 * @Version - Full, Object Oriented, Stable, Minified
 */

var prittyNote={maxWidth:350,y:60,font:"24pt Arial",drawText:undefined,bgImage:false,theImage:undefined,canvas:"statuscanvas",tweets:new Array,tweetIds:new Array,userDef:false,setValue:function(e){document.getElementsByTagName("textarea")[0].value=e},getValue:function(){prittyNote.drawText=document.getElementsByTagName("textarea")[0].value;return prittyNote.drawText},getStatus:function(){var e=prittyNote.getValue();prittyNote.drawCanvas(e)},getColors:function(){var e=$("#text").val(),t=$("#bgclr").val(),n=$("#hashtag").val();return{text:e,bgcolor:t,hashtag:n}},drawCanvas:function(e,t){var n=e.split(" ");var r=prittyNote.getColors();var i=prittyNote.font;var s=prittyNote.maxWidth;var o="#"+r.text,u="#"+r.bgcolor,a="#"+r.hashtag;var f=parseFloat(i,10)+parseFloat(i,10)/8;prittyNote.clearCanvasGrid(prittyNote.canvas);var l=document.getElementById(prittyNote.canvas);var c=l.getContext("2d");l.width=450;var h=(l.width-s)/2,p=prittyNote.y;if(prittyNote.bgImage)t=true;else t=false;var d=prittyNote.getHeight(e,c,h,p,s,f,t);l.height=d;c.globalAlpha=1;if(t){var v=new Image;v.onload=function(){c.drawImage(v,0,0,l.width,d);c.fillStyle="#000";c.globalAlpha=.5;c.fillRect(0,0,l.width,d);c.fillStyle=o;c.font=i;c.globalAlpha=1;prittyNote.wrapText(c,e,h,p,s,l.width,f,o,a)};v.src=prittyNote.theImage}else{c.fillStyle=u;c.fillRect(0,0,l.width,d);c.globalAlpha=1;c.fillStyle=o;c.font=i;prittyNote.wrapText(c,e,h,p,s,l.width,f,o,a)}$("#imagepath").html("letters: "+e.length+" | words: "+n.length+" | height: "+d+"px")},getHeight:function(e,t,n,r,i,s,o){var u=e.split(" ");var a=1,f=n,l;var c=/(`)[\w]{0,}/;for(var h=0;h<u.length;h++){var p=u[h]+" ";var d=t.measureText(p);var v=d.width;var m=c.test(p);if(m)r+=s,n=f,a++;n+=v;if(n>i){n=f;r+=s;a++}}var g=a*s;l=r+r/2+g;if(o)l+=s;if(l<200)l=200;return l},wrapText:function(e,t,n,r,i,s,o,u,a){var f=t.split(" ");var l="",c,h=n;var p=/(\#|\@)[\w]{0,}/,d=/(\#\#)[\w]{0,}/,v=/(`)[\w]{0,}/;for(var m=0;m<f.length;m++){var g=f[m]+" ";var y=e.measureText(g);var b=y.width;var c=p.test(g);var w=d.test(g);var E=false;var S=v.test(g);if(w==true){e.fillStyle=a;u=a;g=g.replace("##","");b=e.measureText(g).width}else if(S){r+=o;n=h;g=g.replace("`","");b=e.measureText(g).width}else{if(c==true||E==true){e.fillStyle=a;g=g.replace("#","");b=e.measureText(g).width}else{e.fillStyle=u}}e.fillText(g,n,r);n+=b;var x=e.measureText(f[m+1]+" ").width;var T=n+x;if(T>=s){r+=o;n=h}else{if(n>i){n=h;r+=o}}}e.fillText(l,n,r)},clearCanvasGrid:function(e){var t=document.getElementById(e);var n=t.getContext("2d");n.save();n.setTransform(1,0,0,1,0,0);n.clearRect(0,0,t.width,t.height);n.restore()},isImage:function(e){var t=["jpeg","jpg","png","gif","bmp","JPEG","JPG","PNG","GIF","BMP"],n=false;var r=e.toString().split(";");r=r[0].split("/");console.log(r);if($.inArray(r[1],t)>-1){n=true}return n},readImage:function(e){var t;if(e.files&&e.files[0]){var n=new FileReader;n.onload=function(e){t=e.target.result;prittyNote.bgImage=prittyNote.isImage(t);if(prittyNote.bgImage){prittyNote.theImage=t;prittyNote.drawCanvas(prittyNote.getValue(),t)}};n.readAsDataURL(e.files[0])}},removeImage:function(){prittyNote.bgImage=false;prittyNote.drawCanvas(prittyNote.getValue())},makePrittyNote:function(e){var t=document.getElementById(e);var n=t.toDataURL("image/png");$(".createImagebtn .label").html("Just a moment...");$(".createImagebtn").removeClass("redbtn").addClass("greenbtn");$.post("./canvastopng.php",{data:n},function(e){if(e.success==0){$(".createImagebtn .label").html("Error occured. Try Once More");$(".createImagebtn").removeClass("greenbtn").addClass("redbtn")}else{$(".createImagebtn .label").html("Create Another Image");$(".createImagebtn").removeClass("greenbtn").addClass("redbtn");window.location="./canvastopng.php?d="+e.name}},"json")},imageMergedata:function(e,t,n){var r='<img src="../images/accept.png" alt="OK" title="Success"/>';$.get("./getlocajax.php",{imgid:e,user:t,text:prittyNote.getValue(),path:n},function(e){$("#imagepath").html(r+" "+e.message);$("#statuscanvas").wrap('<a target="_blank" href="'+e.path+'" title="'+e.text+'" />')},"json")},loadTweets:function(){$(".preserveForm .loadTweets").remove();prittyNote.pFclone=$(".preserveForm").clone();$(".footer").animate({"font-size":"1em",left:0},600);var e=$(window).width()-820;if(e>=300){var t=($(window).width()-(820+300))/2;$(".content").animate({marginLeft:t},300,function(){$(this).append('<div class="loadTweets"></div>').css({width:"100%",height:"auto"});setTimeout(function(){if($("div.loadTweets")){prittyNote.pullTweets($(window).height(),300,$("div.loadTweets"))}},300)})}else{$(".writeform").empty();prittyNote.pullTweets(400,e,$(".writeform"))}setTimeout(function(){prittyNote.setTweetRefresh()},2e4)},pullTweets:function(e,t,n){n.html('<h2 style="border-bottom: 1px solid #bbb; padding: 3px; margin: 0">tweets '+'<span id="showRefreshing" style="font-size: 11px; color: #87cefa;">loading</span></h2>'+'<div class="Tw"></div>');console.log($(this).selector);if(n.selector!==".writeform")n.css({"float":"left",width:300,height:e,"border-left":"1px solid #e8e8e8","margin-top":0,"margin-left":"5px"});$(".Tw").animate({height:e-100,width:300},600,function(){$(this).css({overflowY:"scroll",overflowX:"hidden","border-bottom":"1px solid #aaa"}).append('<img id="loadingCircle" src="../images/325.gif" style="position: relative; top: 40%; left: 40%" alt="Loading Tweets..." />')});if(t<280)$(prittyNote.pFclone).insertAfter(".Tw");prittyNote.refreshTweets()},refreshTweets:function(){var e;if(prittyNote.tweets.length==0){e="./home-timeline.php";$("#showRefreshing").html("loading tweets...")}else{var t=Math.max.apply(null,prittyNote.tweetIds);e="./home-timeline.php?last="+encodeURIComponent(t);$("#showRefreshing").html("loading more tweets...")}$.getJSON(e,function(e){if(prittyNote.tweets.length==0)$("#loadingCircle").remove();if(e.success==1){if(prittyNote.userDef==false){document.getElementsByClassName("twitterProf")[0].innerHTML='<h3><img width="30px" align="absmiddle" src="'+e.image+'"> '+e.username+"</h3>";prittyNote.userDef=true}$.map(e.data,function(e,t){prittyNote.tweets.push({id:e.id,tweet:e.text});prittyNote.tweetIds.push(e.id);var n='<table class="tweets" data-id="'+e.id+'">'+"<tr>"+'<td class="profilepic">'+'<img src="'+e.user.profile_image_url+'" alt="Profile Picture" />'+"</td>"+'<td class="body">'+"<h4>"+e.user.screen_name+"</h4>"+'<p id="tw">'+e.text+"</p>"+"</td>"+"</tr>"+"</table>";$(".Tw").prepend(n)});$("#showRefreshing").html("");$(".tweets").css({cursor:"pointer","border-bottom":"#f2f2f2 solid 1px",width:"100%"});$(".tweets").bind("mouseover",function(){$(this).css({backgroundColor:"#fefac6"})});$(".tweets").bind("mouseout",function(){$(this).css({backgroundColor:"#fefefe"})});$(".tweets").bind("click",function(){var e=$(this).attr("data-id");$.map(prittyNote.tweets,function(t,n){if(e==t.id){prittyNote.drawText=t.tweet;prittyNote.drawCanvas(t.tweet);prittyNote.setValue(decodeURIComponent(t.tweet))}})})}else{if(e.success==0){$("#loadingPrefh2").html("Oops! Let's go log in to Twitter first");$("#loadingPref").fadeIn(300,function(){window.location=e.redirect})}if(e.success==2)console.log(e.message),$("#showRefreshing").html(e.message)}})},setTweetRefresh:function(){prittyNote.keyEvents();var e=setInterval(function(){prittyNote.trimTweets();prittyNote.refreshTweets()},2e4)},trimTweets:function(){var e=$(".tweets").length;console.log(e);if(e>300){prittyNote.tweets=prittyNote.tweets.sort(function(e,t){return t.id-e.id});prittyNote.tweetIds=tweetIds.sort(function(e,t){return t-e});prittyNote.tweetIds.length=300;prittyNote.tweets.length=300;$(".tweets").each(function(){var e=$(this).attr("data-id");if($.inArray(e,prittyNote.tweetIds)==-1)$(this).remove()})}},checkTextLength:function(){var e=prittyNote.getValue(),t=e.length,n=$("#post");if(t>350){prittyNote.drawCanvas("#Oh #Snap! You've #written too much!")}else if(t<20){prittyNote.drawCanvas("#Hmmm! You've barely #written anything!")}else{prittyNote.drawCanvas(e)}},keyEvents:function(){$("#image").bind("change",function(){prittyNote.readImage(this)});$(".removeBg").bind("click",function(){prittyNote.removeImage()})}};(function(e){function u(){var t=e("#pallete").val();var r,i,s;e.map(n,function(e,n){if(e.name==t){r=e.color[0];i=e.color[1];s=e.color[2]}});e("#bgclr").val(r).css({background:"#"+r});e("#text").val(i).css({background:"#"+i});e("#hashtag").val(s).css({background:"#"+s});prittyNote.drawCanvas(prittyNote.getValue())}function a(){var t=e("#font").val();e.map(r,function(e,n){if(e.name==t){prittyNote.font=e.string;prittyNote.drawCanvas(prittyNote.getValue())}})}var t=[],n=[],r=[],i="",s="",o;e.fn.extend({loadUtilities:function(l){var c=this;var h={fileorurl:"./js/stickinoteUtilitiesTRY.json"};var p=e.extend({},h,l);e("body").append('<div id="loadingPref" style="position: absolute; top:0; left: 0; width:100%; height: 100%; background: #fefefe; opacity: 0.8"><h2 id="loadingPrefh2"  style="text-align: center; margin-top: 30%"></h2></div>');e("#loadingPrefh2").html("Loading Fonts...");e.getScript("http://ajax.googleapis.com/ajax/libs/webfont/1.0.31/webfont.js",function(){console.log("Script loaded and executed.");e("#loadingPrefh2").html("Loading Themes....")});WebFontConfig={google:{families:["Architects Daughter","Arvo::latin","Amarante","Averia Sans Libre","Cabin+Sketch:700:latin","Crafty Girls","Combo","Comfortaa","Coming Soon","Dancing+Script:700:latin","Delius Swash Caps","Didact Gothic","Dosis","Electrolize","Griffy","Gloria Hallelujah","Handlee","Happy Monkey","Homemade Apple","Imprima","IM Fell Great Primer","Just Me Again Down Here","Josefin Slab","Julee","Jura","Kaushan Script","Love Ya Like A Sister","Macondo","McLaren","Marmelad","Metamorphous","MedievalSharp","Miniver","Oregano","Orienta","Oxygen","Patrick Hand","Pacifico","Princess Sofia","Puritan","Quicksand","Quando","Raleway:400","Ribeye Marrow","Rock Salt","Schoolbell","Special Elite","Spirax","Swanky and Moo Moo","Sofia","Ubuntu","Unkempt","Waiting for the Sunrise","Varela Round","Vollkorn"]},loading:function(){console.log("Total Font to be loaded -- "+WebFontConfig.google.families.length)},active:function(){e.getJSON(p.fileorurl,function(l){n=l.data.palletes,r=l.data.fonts;console.log("Total Themes that are Loaded -- "+n.length);prittyNote.font=r[1].string;e("#loadingPrefh2").html("Doing a little cleaning...");e.each(n,function(e,t){i=i+'<option value="'+t.name+'">'+t.name+"</option>"});i='<select id="pallete">'+i+"</select>";e.each(r,function(e,n){t.push(n.name);s=s+'<option value="'+n.name+'">'+n.name+"</option>"});s='<select id="font">'+s+"</select>";o="Themes: "+i+" Fonts: "+s;e(c).html(o);e("#pallete").bind("change",function(){u()});e("#font").bind("change",function(){a()})});console.log(t.toString());e("#loadingPrefh2").html("Yaaeey! We good to go!");setTimeout(function(){e("#loadingPref").fadeOut(200,function(){prittyNote.drawCanvas(prittyNote.getValue())})},500)}}}})})(jQuery)
