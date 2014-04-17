/**
 * Created by stas on 16.04.14.
 */

var zrApp = angular.module('app', ['ngRoute', 'ui.bootstrap']);

zrApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/coupons', {templateUrl: 'html/coupons.html', controller: CouponCtrl}).
        when('/game', {templateUrl: 'html/game.html', controller: GameCtrl}).
        when('/offer', {templateUrl: 'html/offer.html', controller: OfferCtrl}).
        otherwise({redirectTo: '/coupons'});
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


