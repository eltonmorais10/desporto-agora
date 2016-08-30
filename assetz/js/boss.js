// A simple module with no dependencies
angular.module("boss", [])
  .controller("boss", function ($scope)
  {
    $scope.currentTab = 'index.tpl.html';

    $scope.onClickTab = function (tabUrl) {
        $scope.currentTab = tabUrl;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
  });