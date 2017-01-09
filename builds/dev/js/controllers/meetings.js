myApp.controller('MeetingsController',
  ['$scope', '$firebaseAuth', '$firebaseArray',
  function($scope, $firebaseAuth, $firebaseArray) {

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();

    auth.$onAuthStateChanged(function(authUser) {

      if(authUser) {
        var meetingsRef = ref.child('users').child(authUser.uid).child('meetings');
        var meetingsInfo = $firebaseArray(meetingsRef); // As an array

        $scope.meetings = meetingsInfo;

        meetingsInfo.$loaded().then(function(data) {
          $scope.howManyMeetings = meetingsInfo.length;
        });

        meetingsInfo.$watch(function(data) {
          $scope.howManyMeetings = meetingsInfo.length;
        });


        $scope.addMeeting = function() {
          datentime = $scope.meetingdatetime;
          meetingsInfo.$add({
            name: $scope.meetingname,
            purpose: $scope.meetingpurpose,
            datetime: Date.parse(datentime),
            place: $scope.meetingplace,
            createddate: firebase.database.ServerValue.TIMESTAMP
          }).then(function() {
            console.log($scope.meetingdatetime);
            $scope.meetingname= $scope.meetingpurpose = $scope.meetingdatetime = $scope.meetingplace = '';
            $scope.myform.$setUntouched();
          });
        }

        $scope.deleteMeeting = function(key) {
          meetingsInfo.$remove(key);
        }

      }

    });
}]);
