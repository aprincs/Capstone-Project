'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";

    menuFactory.query(
        function (response) {
            $scope.dishes = response;
            $scope.showMenu = true;

        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

  $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "standard";

                }
                else if (setTab === 3) {
                    $scope.filtText = "estate";

                }
                else if (setTab === 4) {
                    $scope.filtText = "4wd";

                }
				else if (setTab === 5) {
                    $scope.filtText = "pcvan";
                }
                else {
                    $scope.filtText = "";
                }
            };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

}])

.controller('ContactController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };

    var channels = [{
        value: "tel",
        label: "Tel."
    }, {
        value: "Email",
        label: "Email"
    }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

    $scope.sendFeedback = function () {


        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
            $scope.invalidChannelSelection = true;
        } else {
            $scope.invalidChannelSelection = false;
            feedbackFactory.save($scope.feedback);
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: ""
            };
            $scope.feedback.mychannel = "";
            $scope.feedbackForm.$setPristine();
        }
    };
}])

.controller('DishDetailController', ['$scope', '$state', '$stateParams', 'menuFactory', 'commentFactory', function ($scope, $state, $stateParams, menuFactory, commentFactory) {

    $scope.dish = {};
    $scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.dish = menuFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    $scope.feedback = {
				rating:"5", 
				comment:"", 
				author:"", 
				date:"" 
	};

    $scope.submitComment = function () {

        $scope.feedback.date = new Date().toISOString();
		
		commentFactory.save({id: $stateParams.id}, $scope.feedback);
        $state.go($state.current, {}, {reload: true});    
        $scope.commentForm.$setPristine();

        $scope.feedback = {
				rating:"5", 
				comment:"", 
				author:"", 
				date:"" 
		};
    }
}])

// implement the IndexController and About Controller here

.controller('HomeController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
    $scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.dish = menuFactory.query({
            featured: "true"
        })
        .$promise.then(
            function (response) {
                var dishes = response;
                $scope.dish = dishes[0];
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
}])

.controller('AboutController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.showDish = false;
		$scope.message = "Loading ...";
		
		$scope.dish = menuFactory.query({
            featured: "true"
        })
        .$promise.then(
            function (response) {
                var dishes = response;
                $scope.dish1 = dishes[0];
				$scope.dish2 = dishes[1];
				$scope.dish3 = dishes[2];
				$scope.dish4 = dishes[3];

                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

}])
;