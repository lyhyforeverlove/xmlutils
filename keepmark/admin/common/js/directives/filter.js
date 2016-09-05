angular.module('app')
.directive('detailMessage', function() {
    return {
        restrict: 'EC',
        templateUrl: 'admin/common/tpl/filter.html',
        transclude: true,
        replace: true
    };
})