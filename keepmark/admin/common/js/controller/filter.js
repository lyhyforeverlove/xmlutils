app.controller('ParentFilterCtrl', function($scope,CalcService) {
  // I'm the sibling, but want to act as parent
  $scope.getData = function(){
        CalcService.filterData()
                .then(function(data) {
                    $scope.filterData = data.filterData;
                    $scope.citys = [];
                    $scope.districts = [];
                    $scope.regionText = {};
                    $scope.$watch('selectedProvince', function(newValue, oldValue) {
                        //debugger;
                        //console.log(newValue, oldValue);
                        if (newValue != oldValue) {
                            var i = 0,
                            len = $scope.filterData.length;
                            if (!newValue) { //判断选择的是否选择类型，如果没有则重置学科
                                $scope.citys = [];
                                $scope.districts = [];
                                return;
                            }
                            for (i; i < len; i++) {
                                if ($scope.filterData[i].id == $scope.selectedProvince) {
                                    $scope.citys = $scope.filterData[i].category;
                                    $scope.regionText.selectedProvinceText = $scope.filterData[i].departmentName;
                                    //console.log('省名', $scope.regionText.selectedProvinceText);
                                }
                            }
                            $scope.districts = [];
                        }
                    });
                    $scope.$watch('selectedCity', function(newValue, oldValue) {
                        //debugger;
                        if (newValue != oldValue) {
                            if (!newValue) { //作用同上
                                $scope.districts = [];
                                return;
                            }
                            var i = 0,
                            len = $scope.citys.length;
                            for (i; i < len; i++) {
                                if ($scope.citys[i].id == $scope.selectedCity) {
                                    $scope.districts = $scope.citys[i].teachMaterial;
                                    $scope.regionText.selectedCityText = $scope.citys[i].subjectName;
                                    //console.log('市名', $scope.regionText.selectedCityText);
                                }
                            }
                        }
                    });
                    $scope.districtObj = {};
                    $scope.$watch('selectedDstrict', function(newValue, oldValue) {
                        if (newValue != oldValue) {
                            var i = 0,
                            len = $scope.districts.length;
                            for (i; i < len; i++) {
                                if ($scope.districts[i].id == $scope.selectedDstrict) {
                                    $scope.districtObj = $scope.districts[i];
                                    $scope.regionText.selectedDstrictText = $scope.districts[i].name;
                                    //console.log('区名', $scope.regionText.selectedDstrictText);
                                }
                            }
                        }
                    });
                })
    }
});