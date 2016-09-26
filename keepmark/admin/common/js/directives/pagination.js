var directives = angular.module('app');
directives.directive('xlPage', [function () {
    return {
        replace: true,
        templateUrl: 'admin/common/pagination.html',
        link: function (scope, ele, attrs) {
            scope.currentPage = 1;//当前页数
            scope.pageSize = attrs.size;//分页大小
            scope.pages = [];//分页数组
            if (!scope[attrs.method]) {
                throw new Error('load method is undefined');
            }
            //下一页
            scope.next = function () {
                if (scope.currentPage < scope.totalPage) {
                    scope.currentPage++;
                    scope.getData();
                }
            };
            //上一页
            scope.prev = function () {
                scope.pages = [];
                if (scope.currentPage > 1) {
                    scope.currentPage--;
                    scope.getData();
                }
            };
            //调用
            scope.getData = function (page) {
                page && (scope.currentPage = page);
                //标签加载方法
                scope[attrs.method](scope.currentPage, scope.pageSize, function (data) {
                    scope.totalPage = data.totalPage;
                    if (scope.currentPage > 1 && scope.currentPage < scope.totalPage) {
                        if(scope.totalPage>5){
                            if(scope.currentPage -2 >= 1 && scope.currentPage + 2<= scope.totalPage){
                                scope.pages = [
                                    scope.currentPage - 2,
                                    scope.currentPage - 1,
                                    scope.currentPage,
                                    scope.currentPage + 1,
                                    scope.currentPage + 2
                                ];
                            }
                        }
                    } else if (scope.currentPage == 1 && scope.totalPage > 1) {
                        if(scope.totalPage > 5){
                            scope.pages = [
                                scope.currentPage,
                                scope.currentPage + 1,
                                scope.currentPage + 2,
                                scope.currentPage + 3,
                                scope.currentPage + 4
                            ]
                        }else{
                            scope.pages = [];
                            for(var i=0;i<scope.totalPage;i++){
                                scope.pages.push(i+1);
                            }
                        }

                    } else if (scope.currentPage == scope.totalPage && scope.totalPage > 1) {
                        if(scope.totalPage>5){
                            scope.pages = [
                                scope.currentPage - 4,
                                scope.currentPage - 3,
                                scope.currentPage - 2,
                                scope.currentPage - 1,
                                scope.currentPage
                            ];
                        }
                    }
                    scope.list = data.list;
                });
            };
            scope.getData();
        }
    }
}]);