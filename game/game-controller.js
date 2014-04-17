/**
 * Created by stas on 18.04.14.
 */
function GameCtrl($scope) {
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