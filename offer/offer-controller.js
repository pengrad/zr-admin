/**
 * Created by stas on 18.04.14.
 */
function OfferCtrl($scope) {
    var s = $scope;

    s.currencies = [
        {"id": 1, "name": "USD"},
        {"id": 2, "name": "RUB"}
    ];

    s.offerTypes = [
        {"id": 1, "name": "Standart"},
        {"id": 2, "name": "Premium"},
        {"id": 3, "name": "Bonus"},
        {"id": 4, "name": "Flyer"}
    ];

    s.countries = [
        {"id": 1, "name": "USA"},
        {"id": 2, "name": "Russia"}
    ];

    s.categories = [
        {"id": '1', "name": 'For Her'},
        {"id": '2', "name": 'For Him'},
        {"id": '3', "name": 'Beauty'},
        {"id": '4', "name": 'Style'},
        {"id": '5', "name": 'Electronics'},
        {"id": '6', "name": 'Entertainment'},
        {"id": '7', "name": 'Travel'}
    ];

    s.couponAlgs = [
        {"id": '1', "name": 'Default algorithm'},
        {"id": '2', "name": 'Default algorithm with QR'},
        {"id": '3', "name": 'Fixed codes algorithm'},
        {"id": '4', "name": 'MediaMarkt algorithm'}
    ];

    s.imageTypes = [
        {"id": 4, "name": "Offer picture"},
        {"id": 5, "name": "Offer banner"}
    ];

    s.offerOptions = [
        {"id": 1, "name": "Condition"},
        {"id": 2, "name": "Feature"}
    ];


    s.currency = s.currencies[1];
    s.offerType = s.offerTypes[0];
    s.couponAlg = s.couponAlgs[0];
    s.imageType = s.imageTypes[0];
    s.offerOption = s.offerOptions[0];
    s.images = [];

    s.addImage = function () {
        s.images.push({url: s.imageUrl, type: s.imageType, id: Math.floor(Math.random() * 1000000)});
        s.linkText = '';
    };

    s.removeImage = function (imageId) {
        var oldImages = s.images;
        s.images = [];
        angular.forEach(oldImages, function (image) {
            if (image.id != imageId) s.images.push(image);
        });
    }
}
