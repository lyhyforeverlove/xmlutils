'use strict';
app.controller('TestPoolCtrl', function($scope) {
	$scope.name='教学管理';
})
app.controller('RoundController',function($scope){
	$scope.addErrorKnown = function(){
        var addHtml = $('.survey-knowledge').children('a');
        addHtml.removeClass("disabled");
        
        addHtml.on('click',function(){
        	var id = $(this).attr('id');
        	$("#selectKnow").append('<a id='+ id +' onclick="removehtml(\'' + id + '\')">'+$(this).html()+'</a>');
        	$(this).addClass("disabled");

        })
  }
  //判卷提交
  $scope.submit = function(){
      var val1 = $
  };  
})
function removehtml(id){
	$('.survey-knowledge').find('#'+id).removeClass("disabled");
	$('#'+id).remove();
}
app.controller('TabsDemoCtrl', ['$scope', function($scope) {
    $scope.tabs = [
      { title:'未分配', content:'未分配' },
      { title:'已分配', content:'已分配' }
    ];
}])
app.controller('tabDemoCtrl',function($scope,$window){
	$scope.tabs = [
		{title : '全科' ,content : '我是jquery内容'}
	];
	$scope.alertMe = function(){
		$window.alert('html5jq-FE学习平台欢迎您!')
	}
})
//分班
app.controller('ClassesCtrl', ['$scope', '$modal', '$log', '$http',function($scope, $modal, $log) {

	$scope.items = 'admin/common/classes.json';
	
	$scope.open = function (size) {
	  var modalInstance = $modal.open({
	    templateUrl: 'myModalContent.html',
	    controller: 'ModalInstanceCtrl',
	    size: size,
	    resolve: {
	      items: function () {
	        return $scope.items;
	      }
	    }

	  });

	  modalInstance.result.then(function (selectedItem) {
	    $scope.selected = selectedItem;
	  }, function () {
	    $log.info('Modal dismissed at: ' + new Date());
	  });
	};
}]);
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
	$scope.items = items;
	$scope.selected = {
	  item: $scope.items[0]
	};

	$scope.ok = function () {
	  $modalInstance.close($scope.selected.item);
	};

	$scope.cancel = function () {
	  $modalInstance.dismiss('cancel');
	};
}]);  

/*chart*/
app
  // Flot Chart controller 
  .controller('FlotChartDemoCtrl', ['$scope', function($scope) {
    $scope.d = [ [1,6.5],[2,6.5],[3,7],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7],[11,6.8],[12,7] ];

    $scope.d0_1 = [ [0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7] ];

    $scope.d0_2 = [ [0,4],[1,4.5],[2,7],[3,4.5],[4,3],[5,3.5],[6,6],[7,3],[8,4],[9,3] ];

    $scope.d1_1 = [ [10, 120], [20, 70], [30, 70], [40, 60] ];

    $scope.d1_2 = [ [10, 50],  [20, 60], [30, 90],  [40, 35] ];

    $scope.d1_3 = [ [10, 80],  [20, 40], [30, 30],  [40, 20] ];

    $scope.d2 = [];

    for (var i = 0; i < 20; ++i) {
      $scope.d2.push([i, Math.sin(i)]);
    }   

    $scope.d3 = [ 
      { label: "iPhone5S", data: 40 }, 
      { label: "iPad Mini", data: 10 },
      { label: "iPad Mini Retina", data: 20 },
      { label: "iPhone4S", data: 12 },
      { label: "iPad Air", data: 18 }
    ];

    $scope.refreshData = function(){
      $scope.d0_1 = $scope.d0_2;
    };

    $scope.getRandomData = function() {
      var data = [],
      totalPoints = 150;
      if (data.length > 0)
        data = data.slice(1);
      while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;
        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }
        data.push(y);
      }
      // Zip the generated y values with the x values
      var res = [];
      for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
      }
      return res;
    }

    $scope.d4 = $scope.getRandomData();
  }]);