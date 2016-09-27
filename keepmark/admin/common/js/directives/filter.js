angular.module('app')
.directive('detailMessage', function() {
    return {
        restrict: 'EC',
        templateUrl: 'admin/common/tpl/filter.html',
        transclude: true,
        replace: true
    };
})
.filter('limitToNum', function() {  
   return function(input, num) {  
      if(input.length>num){
        input = input.substring(0,num)+"...";
      }
      return input;  
   };  
}).filter('strToUrl',function($sce){
    return function(str){
        if(!str || typeof  str != "string")return "";
        return $sce.trustAsHtml(str.replace(/http:\/\/.*?\.(mp3|jpg|jpeg|png|gif)/ig, function(w){
            if(/mp3$/i.test(w)){
                return '<audio src="' + w + '"/>'
            }else{
                return '<img class="media-middle" style="max-width: 100%;" src="' + w + '"/>'
            }
        }));
    }
}).filter('questionStrToArr',function(){
    return function(str){
        if(angular.isArray(str)){
            return str;
        }else if( typeof str !== "string" || !/^\s*\[.*\]\s*$/.test(str)){
            return [];
        }else{
            try{
                return angular.fromJson(str);
            }catch(e){
                return [];
            }
        }
    }
}).filter('translator',function(){
    return function(input,dictionary,code,name){
        if(angular.isArray(dictionary))
        for(var i =0;i<dictionary.length;i++){
            if(dictionary[i][code]==input){
                return dictionary[i][name];
            }
        }
        return input;
    }
});