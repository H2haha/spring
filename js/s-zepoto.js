
/* ua */
var UA = function() {
  var userAgent = navigator.userAgent.toLowerCase();
  return {
    ipad: /ipad/.test(userAgent),
    iphone: /iphone/.test(userAgent),
    android: /android/.test(userAgent),
    qqnews: /qqnews/.test(userAgent),
    weixin: /micromessenger/.test(userAgent)
  };
}
/* page */
var pageIndex;
var Layout = {
    page: function(i, _h){
    $(".global").css({"-webkit-transform":"translate3d(0px, -" + _h * i + "px, 0px)"});
    $(".layout").removeClass("animate");
    $("#layout_" + (i + 1)).addClass("animate");
    pageIndex = i;
    //顶部栏判断，如果索引内容后还有单独的页面，这部分要重新判断。
  },
  swipe: function(_h, _len){
        var _this = this;
        $(".layout").each(function(index1, obj){
            $(obj).on("swipeUp", function(){
                if(index1<_len-1){
                _this.page(index1 + 1, _h);}
            }).on("swipeDown", function(){
                _this.page(index1 - 1, _h);
            });
        }); 
     },
  init: function() {
    var _this = this,
      _w = $(window).width(),
      _h = $(window).height(),
      _len = $(".layout").length;
    var ua = UA();
    $(".screen").width(_w).height(_h * _len);
    $(".layout").width(_w).height(_h);
    _this.page(0, _h);
    _this.swipe(_h, _len);
    // 屏幕尺寸调整
        $(window).resize(function(){
            _this.init();
        });
  }
}
Layout.init();
/* loadImg  图片预加载 */
var loadImg = function(pics, callback) {
  var index = 0;
  var len = pics.length;
  var img = new Image();
  var flag = false;
  var progress = function(w) {
    $('.loadNum').html(w);
    if (w == '100%') {
      callback()
    }
  }
  var load = function() {
    img.src = pics[index];
    img.onload = function() {
      progress(Math.floor(((index + 1) / len) * 100) + "%");
      index++;
      if (index < len) {
        load();
      } else {
        callback()
      }
    }
    return img;
  }
  if (len > 0) {
    load();
  } else {
    progress("100%");
  }
  return {
    pics: pics,
    load: load,
    progress: progress
  };
}
// 页面要加载的图片
var pics = [
    "images/btn_share.jpg"
];
// 调用
loadImg(pics, function() {
    setTimeout(function() {
      $(".loadPage").hide();
      $('#layout_1').addClass('animate');
      $('.songBox').addClass('animate');
    },500);
});
// 分享
$(function() {
  $(".share_btn").click(function(e) {
    var evn = e || window.event;
    $("#coverShare").show();
    e.stopPropagation();
    $(".songBox").hide();
  });
  $("body").bind("click touchend", function() {
    $("#coverShare").hide();
     $(".songBox").show();
  });
  // 返回首页
  $(".back_to_home").click(function() {
    $(".global").css("-webkit-transform", "translate3d(0px, 0px, 0px)");
    $('#layout_1').addClass('animate');
  });
});
// 音乐播放器
// var myVideo1 = document.getElementById("video1");
// var adplay = {
//  mvplay: function() {
//    myVideo1.play();
//    $(".songBox .open").hide();
//    $(".songBox .close").show();
//    $('.songBox').addClass('animate');
//  },
//  mvpause: function(){
//    myVideo1.pause();
//    $(".songBox .open").show();
//    $(".songBox .close").hide();
//    $('.songBox').removeClass('animate');
//  },
//  init: function() {
//    var _this = this;
//    $(".songBox .open").bind("click", function() {
//      _this.mvplay();
//    })
//    $(".songBox .close").bind("click", function() {
//      _this.mvpause();
//    })
//  }
// }
// adplay.init();
$(function() {
  //福牌点击事件
 $("#brand1").click(function() {    
     $(".brand-bg2").show();
     $(".brand-bg").hide();
  });
$("#close1").click(function(){
    $(".brand-bg2").hide();  
    $(".brand-bg").show();
  });



});