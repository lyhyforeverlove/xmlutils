'use strict';
app.controller('CreateDiagCtrl', function($scope) {
	//分配监考人
	$scope.allotBtn=function(){

	};
	//添加老师
	$scope.addTeacher = function(){
		$('.panel-container').append($('.panel-container').find('section').html());
	}
    $scope.groups = [];
    var startDate;
    var endDate;
    $scope.addDateGroup = function($startDate,$endDate){
        startDate = $("#startDate").val();
        endDate = $("#endDate").val();
        //console.log(startDate,endDate);
        
    }
    
	$scope.groups = [{
        'id':'1',
        'name':'第一组时间',
        'date':startDate,
        'group':'一组:5人',
        'AM': '上午'
    },{
        'id':'2',
        'name':'第二组时间',
        'date':'2016.6.18 16:00 ~ 2016.6.18 18:00',
        'group':'一组:5人'
    },{
        'id':'3',
        'name':'第三组时间',
        'date':'2016.6.18 16:00 ~ 2016.6.18 18:00',
        'group':'一组:5人',
        'PM': '下午'
    },{
        'id':'4',
        'name':'第四组时间',
        'date':'2016.6.18 16:00 ~ 2016.6.18 18:00',
        'group':'一组:5人'
    },{
        'id':'5',
        'name':'第五组时间',
        'date':'2016.6.18 16:00 ~ 2016.6.18 18:00',
        'group':'一组:5人'
    },{
        'id':'6',
        'name':'第六组时间',
        'date':'2016.6.18 16:00 ~ 2016.6.18 18:00',
        'group':'一组:5人'
    }];

})
app.directive('toggleClass', function(){
    return {
        restrict: 'A',
        scope: {
            toggleClass: '@'
        },
        link: function($scope, $element){
            $element.on('click', function(){
                $element.toggleClass($scope.toggleClass);
            });
        }
    };
});
