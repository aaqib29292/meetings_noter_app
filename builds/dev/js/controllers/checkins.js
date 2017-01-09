myApp.controller('CheckInsController',
  ['$scope', '$rootScope', '$location', '$routeParams', '$firebaseObject', '$firebaseArray',
  function($scope, $rootScope, $location, $routeParams, $firebaseObject, $firebaseArray) {



    $scope.whichmeeting = $routeParams.mId;
    $scope.whichuser = $routeParams.uId;

    var ref = firebase.database().ref()
      .child('users').child($scope.whichuser)
      .child('meetings').child($scope.whichmeeting)
      .child('checkins');

    var checkinsList = $firebaseArray(ref);
    $scope.checkins = checkinsList;

    checkinsList.$loaded().then(function(data) {
      $scope.checkinsLength = checkinsList.length;
    });

    checkinsList.$watch(function(data) {
      $scope.checkinsLength = checkinsList.length;
    });
    $scope.order = 'firstname';
    $scope.direction = null;
    $scope.query = '';
    $scope.recordId= '';

    $scope.addCheckin = function() {
      $firebaseArray(ref).$add({
        firstname: $scope.user.firstname,
        lastname: $scope.user.lastname,
        email: $scope.user.email,
        date: firebase.database.ServerValue.TIMESTAMP
      }).then(function() {
        $scope.user = null;
        $scope.myform.$setPristine();
        $scope.myform.$setUntouched();
      });
    }

    $scope.deleteCheckin = function(id) {
      var refDel = ref.child(id);
      var record = $firebaseObject(refDel);
      record.$remove(id);
    }

}]);
