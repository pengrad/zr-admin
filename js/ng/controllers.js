/**
 * Created by stas on 16.04.14.
 */

function CouponCtrl($scope) {
    $scope.offers = [
        {"id": -1, "name": "Loading offers..."}
    ];
    $scope.offer = $scope.offers[0];

//    $scope.offers = $firebase(new Firebase('https://pengrad-zr.firebaseio.com/offer_list'));
//    $scope.offers = OfferService;

    var offerRef = new Firebase('https://pengrad-zr.firebaseio.com/offer_list');
    offerRef.on('value', function (data) {
        $scope.offers = data.val();
        $scope.offer = $scope.offers[0];
    });

//    $http.get("/data/offers").success(function (data) {
//        $scope.offers = data;
//        $scope.offer = $scope.offers[0];
//    });

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

function GameCtrl($scope, $http) {
    var s = $scope;

    s.isVerify = true;
    s.isFeature = false;
    s.isVisible = false;

    s.textEn = true;
    s.textRu = false;

    s.category = [];
    s.links = [];

    s.enLogo = true;
    s.ruLogo = true;
    s.enBanner = true;
    s.ruBanner = true;
    s.screenCount = 5;
    s.ruScreens = true;

    s.categories = [
        {"id": '1', "name": 'Логические'},
        {"id": '2', "name": 'Шутеры'},
        {"id": '3', "name": 'Аркады'},
        {"id": '5', "name": 'Симуляторы'},
        {"id": '6', "name": 'Квесты'},
        {"id": '7', "name": 'Стратегии'},
        {"id": '8', "name": 'Спорт'},
        {"id": '9', "name": 'Социальные'}
    ];

    s.platforms = [
        {"id": '1', "name": 'iPhone/iPod'},
        {"id": '2', "name": 'iPad'},
        {"id": '3', "name": 'Android'},
        {"id": '4', "name": 'Windows Phone'},
        {"id": '5', "name": 'Online'}
    ];
    s.platform = s.platforms[2];

    s.imageFormats = [
        {"file": 'png', "name": 'PNG'},
        {"file": 'jpg', "name": 'JPG'}
    ];
    s.logoFormat = s.imageFormats[0];
    s.bannerFormat = s.imageFormats[0];
    s.screenFormat = s.imageFormats[1];


    s.addLink = function () {
        if (!s.linkText) return;
        s.links.push({platform: s.platform, link: s.linkText, id: new Date().getTime()});
        s.linkText = '';
    };

    s.del = function (linkId) {
        var oldLinks = s.links;
        $scope.links = [];
        angular.forEach(oldLinks, function (link) {
            if (link.id != linkId) s.links.push(link);
        });
    };

    s.send = function () {
        function fullToHtml(full) {
            var fullHtml = '';
            angular.forEach(full.split('\n'), function (line, key) {
                if (key == 0) fullHtml = line;
                else if (line) fullHtml += '<p>' + line + '</p>';
            });
            return fullHtml;
        }

        if (s.textEn) var enFullHtml = fullToHtml(s.enFull);
        if (s.textRu) var ruFullHtml = fullToHtml(s.ruFull);

        var data = {'isVerify': s.isVerify, 'isVisible': s.isVisible, 'isFeature': s.isFeature, 'category': s.category, 'links': s.links};
        if (s.textEn) data['en'] = {'title': s.enTitle, 'short': s.enShort, 'full': s.enFull, 'fullHtml': enFullHtml};
        if (s.textRu) data['ru'] = {'title': s.ruTitle, 'short': s.ruShort, 'full': s.ruFull, 'fullHtml': ruFullHtml};

        data.images = {'logoFormat': s.logoFormat, 'banner': s.enBanner, 'bannerFormat': s.bannerFormat, 'screens': s.screenCount, 'screenFormat': s.screenFormat, 'ruLogo': s.ruLogo, 'ruBanner': s.ruBanner, 'ruScreens': s.ruScreens};

        var result = queryNewGame(data);
        s.$emit('showDialog', result);
    };
}

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