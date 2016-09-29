app.controller('areaCategoryCtrl', function($scope, $http,$resource, $stateParams, $modal, $state,$log) {
	// list
	$scope.items = [ 'angularjs', 'backbone', 'canjs', 'Ember', 'react' ];
	var host = $scope.app.host;
	$scope.checkBook = function(artType) {
			console.log(artType);
			var url = host+'area/allPaperType?requestId=1';
					$http.post(url,{artType:artType}).success(function(data){
						$scope.list = data.result;
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
				$scope.checkBook($scope.artType);
			}, function() {
			});
		}	
	});

var arr = [];

// modal controller
app.controller('ModalAreaCtrl', function($scope, $http,$modalInstance,items,host,code) {
	$scope.isSubmitted = true;
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
		}).error(function(data){
			console.log("fail");
		})
	}
	$scope.save = function(obj){
		if(arr.indexOf(obj)<0){
			arr.push(obj);
			$scope.isSubmitted = false;
		}else{
			for(var i =0;i<arr.length;i++){
				if(obj ==arr[i]){
					arr.splice(i,1);
				}
			}
			if(arr.length == 0){
				$scope.isSubmitted = true;
			}
		}
	};

	$scope.saveresult = function(obj){
		var url = host+'area/addRelation?requestId=1';
				$http.post(url,{testPaperTypeCode:code,provinceCodes:arr}).success(function(data){
					$scope.string = data.result;
					arr=[];
					$modalInstance.close();
				}).error(function(data){
					console.log("fail");
				})
			}
    });