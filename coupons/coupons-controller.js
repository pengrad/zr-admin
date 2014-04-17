/**
 * Created by stas on 18.04.14.
 */
function CouponCtrl($scope, $http) {
    $scope.offers = [
        {"id": -1, "name": "Loading offers..."}
    ];
    $scope.offer = $scope.offers[0];

    $http.get("https://pengrad-zr.firebaseio.com/offer_list.json").success(function (data) {
        $scope.offers = data;
        $scope.offer = $scope.offers[0];
    });

    $scope.codes = "";

    $scope.codesArray = function () {
        if (!$scope.codes || !$scope.codes.trim().length) return [];
        return $scope.codes.trim().split('\n');
    };

    $scope.sendCodes = function () {
        var codes = $scope.codesArray();
        var offerId = $scope.inputId ? $scope.inputId : $scope.offer.id;
        var data = {"codes": codes, "offerId": offerId};
        var result = queryCoupons(data);
        $scope.$emit('showDialog', result);
    };
}