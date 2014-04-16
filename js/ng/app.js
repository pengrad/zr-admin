/**
 * Created by stas on 16.04.14.
 */

var zrApp = angular.module('app', ['ngRoute', 'ui.bootstrap', 'firebase']);

zrApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

//    $locationProvider.html5Mode(true);

    $routeProvider.
        when('/coupons', {templateUrl: 'html/coupons.html', controller: CouponCtrl}).
        when('/game', {templateUrl: 'html/game.html', controller: GameCtrl}).
        when('/offer', {templateUrl: 'html/offer.html', controller: OfferCtrl}).
        otherwise({redirectTo: '/coupons'});
}]);

zrApp.factory("OfferService", ["$firebase", function ($firebase) {
    var ref = new Firebase('https://pengrad-zr.firebaseio.com/offer_list');
    return $firebase(ref);
}]);

zrApp.controller('MainCtrl', ['$scope', '$modal', function ($scope, $modal) {

    $scope.$on('showDialog', function (event, data) {
        $modal.open({
            templateUrl: 'myModalContent.html',
            controller: ModalInstanceCtrl,
            resolve: {
                result: function () {
                    return data;
                }
            }
        });
    });


    var ModalInstanceCtrl = function ($scope, $modalInstance, result) {

        $scope.result = result;

        $scope.ok = function () {
            $modalInstance.close();
        };
    };

}]);


