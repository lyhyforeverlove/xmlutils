app.controller('areaCategoryCtrl', function($scope, $http,$resource, $stateParams, $modal, $state,$log) {
	// list
	$scope.items = [ 'angularjs', 'backbone', 'canjs', 'Ember', 'react' ];
	var host = $scope.app.host;
	$scope.checkBook = function(artType) {
			var url = host+'area/allPaperType?requestId=1';
			console.log("--------url="+url);
					$http.post(url,{artType:artType}).success(function(data){
						$scope.list = data.result;						
						console.log(data);
					}).error(function(data){
						console.log("fail");
					})
				}	

	// open click
	$scope.open = function(size,code) {
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
					},
					code: function(){
						return code;
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

var arr = [];
// modal controller
app.controller('ModalAreaCtrl', function($scope, $http,$modalInstance,items,host,code) {
	
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

	$scope.load = function(){
		var url = host+'/area/allProvince?requestId=1';
		$http.post(url).success(function(data){
			$scope.results = data.result;
			console.log(data);
		}).error(function(data){
			console.log("fail");
		})
	}
	$scope.save = function(obj){
	 	arr.push(obj);
		console.log("-------------------------------"+arr);
	}
	$scope.saveresult = function(obj){
		var url = host+'area/addRelation?requestId=1';
				$http.post(url,{testPaperTypeCode:code,provinceCodes:arr}).success(function(data){
					$scope.string = data.result;
					arr.length=0;
					console.log(data);

					$modalInstance.close($scope.selected.item);
				}).error(function(data){
					console.log("fail");
				})
			}
});