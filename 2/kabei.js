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
});
