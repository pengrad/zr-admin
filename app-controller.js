/**
 * Created by stas on 18.04.14.
 */
function MainCtrl($scope, $modal) {

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

}
