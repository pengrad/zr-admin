/**
 * Created by stas on 16.04.14.
 */

var zrApp = angular.module('app', ['ngRoute', 'ui.bootstrap']);

zrApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/coupons', {templateUrl: 'coupons/coupons.html', controller: CouponCtrl}).
        when('/game', {templateUrl: 'game/game.html', controller: GameCtrl}).
        when('/offer', {templateUrl: 'offer/offer.html', controller: OfferCtrl}).
        otherwise({redirectTo: '/coupons'});
}]);

