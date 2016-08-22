'use strict';

app.run(
      function ($rootScope,   $state,   $stateParams,$localStorage,$http) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.auth;
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams; 
          //监听全局页面跳转信号($statChangeSuccess)，将参数保存下来
          $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
              $rootScope.previousState = from;
              $rootScope.previousStateParams = fromParams;
          });       
      }
  )
app.config(function ($stateProvider,   $urlRouterProvider) {
      $urlRouterProvider
          .otherwise('app/teachManage/testPool');
      $stateProvider
          .state('app', {
              abstract: true,
              url: '/app',
              templateUrl: 'admin/app.html',
          })
          .state('auth',{
              abstract: true,
              url:'/auth',
              template: '<div ui-view class="fade-in"></div>',
              resolve: {
                  deps: ['$ocLazyLoad',
                    function( $ocLazyLoad ){
                      return $ocLazyLoad.load('admin/auth/ctrl.js');
                  }]
              }
          })
          .state('auth.loading',{
              url:'/loading',
              templateUrl:'admin/auth/loading.html',
          })
          .state('auth.login',{
              url:'/login',
              templateUrl:'admin/auth/login.html',
          })
          //首页
          .state('auth.index', {
              url: '/index',
              templateUrl: 'admin/auth/index.html',
          })
          /*.state('app.news', {
              abstract: true,
              url: '/news',
              template: '<div ui-view class="fade-in"></div>',
              resolve: {
                  deps: ['$ocLazyLoad',
                    function( $ocLazyLoad ){
                      return $ocLazyLoad.load('admin/news/ctrl.js');
                  }]
              }
          })
          .state('app.news.list', {
              url: '/list?page&search',
              templateUrl: 'admin/news/list.html',
          })
          .state('app.news.detail', {
              url: '/detail/{id}',
              templateUrl: 'admin/news/detail.html',
          })
          .state('app.news.create', {
              url: '/create',
              templateUrl: 'admin/news/detail.html', 
          })*/
          .state('app.plan', {
              abstract: true,
              url: '/plan',
              template: '<div ui-view class="fade-in"></div>',
              resolve: {
                  deps: ['$ocLazyLoad',
                    function( $ocLazyLoad ){
                      return $ocLazyLoad.load('admin/plan/controller.js');
                  }]
              }
          })
          .state('app.plan.create',{
              url: '/create',
              templateUrl: 'admin/plan/createDiagnosis.html',
          })
          .state('app.plan.allot',{
              url: '/allot',
              templateUrl: 'admin/plan/diagnosisDate.html',
          })
          .state('app.plan.diagGoods',{
              url: '/diagGoods',
              templateUrl: 'admin/plan/diagnosisGoods.html',
          })
          .state('app.teachManage', {
              abstract: true,
              url: '/teachManage',
              template: '<div ui-view class="fade-in"></div>',
              resolve: {
                  deps: ['$ocLazyLoad',
                    function( $ocLazyLoad ){
                      return $ocLazyLoad.load('admin/teachManage/controller.js');
                  }]
              }
          })
          .state('app.teachManage.testPool',{
              url: '/testPool',
              templateUrl: 'admin/teachManage/testPool.html',
          })
          .state('app.teachManage.round',{
              url: '/round',
              templateUrl: 'admin/teachManage/roundSentence.html',
          })
          .state('app.teachManage.exam',{
              url: '/exam',
              templateUrl: 'admin/teachManage/examDetail.html',
          })
          .state('app.teachManage.secondRound',{
              url: '/secondRound',
              templateUrl: 'admin/teachManage/secondRoundSentence.html',
          })
          .state('app.teachManage.examConfrim',{
              url: '/examConfrim',
              templateUrl: 'admin/teachManage/examConfrim.html',
          })
          .state('app.teachManage.examMonitor',{
              url: '/examMonitor',
              templateUrl: 'admin/teachManage/examMonitor.html',
          })
          .state('app.teachManage.monitorRoom',{
              url: '/monitorRoom',
              templateUrl: 'admin/teachManage/monitorRoom.html',
          })
          .state('app.teachManage.shortBoard',{
              url: '/shortBoard',
              templateUrl: 'admin/teachManage/shortBoardDiag.html',
          })
          .state('app.teachManage.shortBoardClass',{
              url: '/shortBoardClass',
              templateUrl: 'admin/teachManage/shortBoardClass.html',
          })
          .state('app.teachManage.dividingClasses',{
              url: '/dividingClasses',
              templateUrl: 'admin/teachManage/dividingClasses.html',
          })
          .state('app.teachManage.divideClassesConfrim',{
              url: '/divideClassesConfrim',
              templateUrl: 'admin/teachManage/divideClassesConfrim.html',
          })
          .state('app.teachManage.reportDetail',{
              url: '/reportDetail',
              templateUrl: 'admin/teachManage/reportDetail.html',
          })
          .state('app.teachManage.look',{
              url: '/look',
              templateUrl: 'admin/teachManage/look.html',
          })
          .state('app.teachManage.monitorTeacher',{
              url: '/monitorTeacher',
              templateUrl: 'admin/teachManage/monitorTeacher.html',
          })
          .state('app.teachManage.changeCourse',{
              url: '/changeCourse',
              templateUrl: 'admin/teachManage/changeCourse.html',
          })
          /*
          *教研管理
          */
          .state('app.teachResearchManage', {
              abstract: true,
              url: '/teachResearchManage',
              template: '<div ui-view class="fade-in"></div>',
              resolve: {
                  deps: ['$ocLazyLoad',
                    function( $ocLazyLoad ){
                      return $ocLazyLoad.load('admin/teachResearchManage/controller.js');
                  }]
              }
          })
          .state('app.teachResearchManage.markReview',{
              url: '/markReview',
              templateUrl: 'admin/teachResearchManage/markReview.html',
          })
          .state('app.teachResearchManage.teachResearch',{
              url: '/teachResearch',
              templateUrl: 'admin/teachResearchManage/teachResearch.html',
          })
          .state('app.teachResearchManage.createDiag',{
              url: '/createDiag',
              templateUrl: 'admin/teachResearchManage/createDiag.html',
          })
          .state('app.teachResearchManage.studentCategory',{
              url: '/studentCategory',
              templateUrl: 'admin/teachResearchManage/studentCategory.html',
          })
          .state('app.teachResearchManage.confromToVip',{
              url: '/confromToVip',
              templateUrl: 'admin/teachResearchManage/confromToVip.html',
          })
          .state('app.teachResearchManage.shortBoardConfrim',{
              url: '/shortBoardConfrim',
              templateUrl: 'admin/teachResearchManage/shortBoardConfrim.html',
          })
          .state('app.teachResearchManage.shortBoardPaper',{
              url: '/shortBoardPaper',
              templateUrl: 'admin/teachResearchManage/shortBoardPaper.html',
          })
          .state('app.teachResearchManage.createSingle',{
              url: '/createSingle',
              templateUrl: 'admin/teachResearchManage/createSingle.html',
          })
          .state('app.teachResearchManage.list',{
              url: '/list',
              templateUrl: 'admin/teachResearchManage/addDiagPaper.html',
          })

});

/*
*重新刷新首页，页面将实现自动登录了，但是进入系统以后，虽然每次Web请求我们都加入了BasicAuth的请求头，
但是如果服务器端做了帐号修改，一样会产生401的错误，产生的结果就是客户端点什么操作都不会有反应，
我们应该在全局来拦截401，引导客户端跳转到重新登录的界面
*/
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})
app.factory('AuthInterceptor', function ($rootScope, $q,$location) {
  return {
    responseError: function (response) {
        if(response.status==401)
        {
            $location.url('/auth/login');
        }
      return $q.reject(response);
    }
  };
})