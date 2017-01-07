myApp.factory('Authentication', ['$rootScope', '$location', "$firebaseObject", '$firebaseAuth', function($rootScope, $location, $firebaseObject, $firebaseAuth) {

  var ref = firebase.database().ref();
  var auth = $firebaseAuth();


  auth.$onAuthStateChanged(function(authUser) {
    if(authUser) {
      var userRef = ref.child('users').child(authUser.uid);
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
      console.log($rootScope.currentUser.firstname);
    } else {
      $rootScope.currentUser = '';
    }
  });

  var myObject =  {


    login : function(user) {
      auth.$signInWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(user) {
          $location.path('/meetings');
        }).catch(function(error) {
          $rootScope.message = error.message;
        })
    },  // login

    logout: function() {
      return auth.$signOut();
    }, // logout


    requrieAuth : function() {
      return auth.$requireSignIn();
    }, // require auth for pages


    register : function(user) {

      auth.$createUserWithEmailAndPassword(
         user.email,
         user.password
         ).then(function(regUser) {

         var regRef = ref.child('users')
          .child(regUser.uid).set({
            date: firebase.database.ServerValue.TIMESTAMP,
            regUser: regUser.uid,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
          });

          myObject.login(user);

       }).catch(function(error) {
         $rootScope.message = error.message;
       });
    }

  }

  return myObject;


}])
