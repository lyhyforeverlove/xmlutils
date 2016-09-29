angular.module('app')
  .directive('uiNav', ['$timeout', function($timeout) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        var _window = $(window), 
        _mb = 768, 
        wrap = $('.app-aside'), 
        next, 
        backdrop = '.dropdown-backdrop';
        // unfolded
        el.on('click', 'a', function(e) {
          next && next.trigger('mouseleave.nav');
          var _this = $(this);
          _this.parent().siblings( ".active" ).toggleClass('active');
          
          _this.next().is('ul') &&  _this.parent().toggleClass('active') &&  e.preventDefault();


          if(_this.parent().attr("class") == 'firstNav'){

             _this.parents(".active").find(".subNav ul").hide();
          }

          
        //三级菜单显示隐藏
         var subNav = _this.parent(".subNav");

         if( subNav.find("ul").css("display")=="none"){
          
               subNav.siblings().find("ul").hide();
               subNav.find("ul").show();

               subNav.find(".subThreeNav").find("ul").css("display","none");
          }else{
               _this.parent(".subNav").find("ul").hide();
          }
          //四级菜单显示隐藏
          var subTheeNav = _this.parent(".subThreeNav");
          if( subTheeNav.find("ul").css("display")=="none"){
               subTheeNav.siblings().find("ul").hide();
               subTheeNav.find("ul").show();

               subTheeNav.find(".subFourNav").find("ul").css("display","none");
          }else{
               subTheeNav.find("ul").hide();
          }
          //四级菜单显示隐藏
          var subFourNav = _this.parent(".subFourNav");
          if( subFourNav.find("ul").css("display")=="none"){
               subFourNav.siblings().find("ul").hide();
               subFourNav.find("ul").show();
               
          }else{
               subFourNav.find("ul").hide();
          }
          // mobile
          _this.next().is('ul') || ( ( _window.width() < _mb ) && $('.app-aside').removeClass('show off-screen') );
        });

        // folded & fixed
        el.on('mouseenter', 'a', function(e){
          next && next.trigger('mouseleave.nav');
          $('> .nav', wrap).remove();
          if ( !$('.app-aside-fixed.app-aside-folded').length || ( _window.width() < _mb ) || $('.app-aside-dock').length) return;
          var _this = $(e.target)
          , top
          , w_h = $(window).height()
          , offset = 50
          , min = 150;

          !_this.is('a') && (_this = _this.closest('a'));
          if( _this.next().is('ul') ){
             next = _this.next();
          }else{
            return;
          }
         
          _this.parent().addClass('active');
          top = _this.parent().position().top + offset;
          next.css('top', top);
          if( top + next.height() > w_h ){
            next.css('bottom', 0);
          }
          if(top + min > w_h){
            next.css('bottom', w_h - top - offset).css('top', 'auto');
          }
          next.appendTo(wrap);

          next.on('mouseleave.nav', function(e){
            $(backdrop).remove();
            next.appendTo(_this.parent());
            next.off('mouseleave.nav').css('top', 'auto').css('bottom', 'auto');
            _this.parent().removeClass('active');
          });

          $('.smart').length && $('<div class="dropdown-backdrop"/>').insertAfter('.app-aside').on('click', function(next){
            next && next.trigger('mouseleave.nav');
          });

        });

        wrap.on('mouseleave', function(e){
          next && next.trigger('mouseleave.nav');
          $('> .nav', wrap).remove();
        });
      }
    };
  }]);