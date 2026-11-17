$(document).ready(function()
{
   var prevScrollTop = 0;
   $(window).scroll(function(event)
   {
      var scrollTop = $(this).scrollTop();
      if (Math.abs(prevScrollTop - scrollTop) <= 5)
         return;
      if (scrollTop < prevScrollTop)
      {
         $('#page1PageHeader1').removeClass('scroll-up');
      }
      else
      {
         $('#page1PageHeader1').addClass('scroll-up');
      }
      prevScrollTop = scrollTop;
   });
   $("#wb_page1CssMenu3").affix({offset:{top: $("#wb_page1CssMenu3").offset().top}});
   $("#page1Tabs1").tabs(
   {
      show: false,
      hide: false,
      event: 'click',
      collapsible: false
   }).find(".ui-tabs-nav").sortable();
   var page1Carousel4Opts =
   {
      delay: 9000,
      duration: 500,
      easing: 'linear',
      mode: 'fade',
      direction: '',
      pagination: true,
      pagination_img_default: 'images/page1Carousel4-default.png',
      pagination_img_active: 'images/page1Carousel4-active.png',
      pause: 'hover',
      start: 0
   };
   $("#wb_page1Carousel4").attr('dir', 'ltr');
   $("#page1Carousel4").carouseleffects(page1Carousel4Opts);
   var page1Carousel15Opts =
   {
      delay: 9000,
      duration: 500,
      easing: 'linear',
      mode: 'backward',
      direction: '',
      pagination: true,
      pagination_img_default: 'images/page1Carousel15-default.png',
      pagination_img_active: 'images/page1Carousel15-active.png',
      pause: 'hover',
      start: 0
   };
   $("#page1Carousel15").carousel(page1Carousel15Opts);
   $("a[data-rel='page1PhotoGallery1']").attr('rel', 'page1PhotoGallery1');
   $("a[rel^='page1PhotoGallery1']").fancybox({});
   var page1Carousel3Opts =
   {
      delay: 9000,
      duration: 500,
      easing: 'linear',
      mode: 'slide',
      direction: 'down',
      pagination: true,
      pagination_img_default: 'images/page1Carousel3-default.png',
      pagination_img_active: 'images/page1Carousel3-active.png',
      pause: 'hover',
      start: 0
   };
   $("#wb_page1Carousel3").attr('dir', 'ltr');
   $("#page1Carousel3").carouseleffects(page1Carousel3Opts);
   var page1Carousel6Opts =
   {
      delay: 9000,
      duration: 500,
      easing: 'linear',
      mode: 'fade',
      direction: '',
      pagination: true,
      pagination_img_default: 'images/page1Carousel6-default.png',
      pagination_img_active: 'images/page1Carousel6-active.png',
      pause: 'hover',
      start: 0
   };
   $("#wb_page1Carousel6").attr('dir', 'ltr');
   $("#page1Carousel6").carouseleffects(page1Carousel6Opts);
   var page1Carousel5Opts =
   {
      delay: 9000,
      duration: 500,
      easing: 'linear',
      mode: 'slide',
      direction: 'down',
      pagination: true,
      pagination_img_default: 'images/page1Carousel5-default.png',
      pagination_img_active: 'images/page1Carousel5-active.png',
      pause: 'hover',
      start: 0
   };
   $("#wb_page1Carousel5").attr('dir', 'ltr');
   $("#page1Carousel5").carouseleffects(page1Carousel5Opts);
   var page1Carousel1Opts =
   {
      delay: 9000,
      duration: 500,
      easing: 'linear',
      mode: 'fade',
      direction: '',
      pagination: true,
      pagination_img_default: 'images/page1Carousel1-default.png',
      pagination_img_active: 'images/page1Carousel1-active.png',
      pause: 'hover',
      start: 0
   };
   $("#wb_page1Carousel1").attr('dir', 'ltr');
   $("#page1Carousel1").carouseleffects(page1Carousel1Opts);
   var page1Carousel2Opts =
   {
      delay: 9000,
      duration: 500,
      easing: 'linear',
      mode: 'slide',
      direction: 'down',
      pagination: true,
      pagination_img_default: 'images/page1Carousel2-default.png',
      pagination_img_active: 'images/page1Carousel2-active.png',
      pause: 'hover',
      start: 0
   };
   $("#wb_page1Carousel2").attr('dir', 'ltr');
   $("#page1Carousel2").carouseleffects(page1Carousel2Opts);
   var page1Carousel8Opts =
   {
      delay: 9000,
      duration: 500,
      easing: 'linear',
      mode: 'fade',
      direction: '',
      pagination: true,
      pagination_img_default: 'images/page1Carousel8-default.png',
      pagination_img_active: 'images/page1Carousel8-active.png',
      pause: 'hover',
      start: 0
   };
   $("#wb_page1Carousel8").attr('dir', 'ltr');
   $("#page1Carousel8").carouseleffects(page1Carousel8Opts);
   var page1Carousel7Opts =
   {
      delay: 9000,
      duration: 500,
      easing: 'linear',
      mode: 'fade',
      direction: '',
      pagination: true,
      pagination_img_default: 'images/page1Carousel7-default.png',
      pagination_img_active: 'images/page1Carousel7-active.png',
      pause: 'hover',
      start: 0
   };
   $("#wb_page1Carousel7").attr('dir', 'ltr');
   $("#page1Carousel7").carouseleffects(page1Carousel7Opts);
   $("#page1SlideShow1").conveyerbelt({speed:1, spacing: 5});
});
