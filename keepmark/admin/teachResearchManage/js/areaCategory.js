/*app.controller('GroupsDetailCtrl', function($scope, $http,$resource, $stateParams, $modal, $state) {
    $scope.name = "诊断试卷组详情";

});
*/

app.controller('areaCategoryCtrl', function($scope, $http,$resource, $stateParams, $modal, $state,$log) {
	// list
	$scope.items = [ 'angularjs', 'backbone', 'canjs', 'Ember', 'react' ];
	// open click
	$scope.open = function(size) {
		var modalInstance = $modal.open({
			templateUrl : 'myModelContent.html',
			controller : 'ModalAreaCtrl', // specify controller for modal
			size : size,
			resolve : {
				items : function() {
					return $scope.items;
				},
				host : function(){
					return $scope.app.host;
				}
			}
		});
		// modal return result
		modalInstance.result.then(function(selectedItem) {
			$scope.selected = selectedItem;
		}, function() {
			$log.info('Modal dismissed at: ' + new Date())
		});
	}
})
// modal controller
app.controller('ModalAreaCtrl', function($scope, $modalInstance, items) {
	
	$scope.items = items;
	
	$scope.selected = {
		item : $scope.items[0]
	};
	// ok click
	$scope.ok = function() {
		$modalInstance.close($scope.selected.item);
	};
	// cancel click
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	}
});