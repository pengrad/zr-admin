/**
 * User: stas
 * Date: 14.03.14  0:21
 */

String.prototype.format = String.prototype.f = function () {
    var s = this, i = arguments.length;
    while (i--) s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    return s;
};

function queryCoupons(data) {
    var offer = data.offerId;
    var codes = data.codes;
    if (!offer) return "no offer";
    if (codes.length < 1) return "empty codes";

    var query = "select * from billing.offer_promo_code where OfferId = {0} and Code in ('{1}'".f(offer, codes[0]);
    for (var i = 1; i < codes.length; i++)
        query += ",'{0}'".f(codes[i]);
    query += ");\n\n";

    query += "insert billing.offer_promo_code(offerid, code) values ({0}, '{1}')".f(offer, codes[0]);
    for (var i = 1; i < codes.length; i++)
        query += ",({0}, '{1}')".f(offer, codes[i]);
    query += ";\n";

    query += "update billing.offer_billing set CouponLimit = CouponLimit + {0} where OfferId = {1};\n".f(codes.length, offer);
    query += "call info.syncOffer();";

    return query;
}

function queryNewGame(data) {
    var query = "\
use info;\n\
set @loginid = SET;\n\
set @gameid = SET;\n\n\
insert game (GameId, DeveloperId, GameDatePublish, GameHash, GameVersion, isVerify, isFeature, isVisible, MaxPtsHour, GameName) values\n";

    query += "(@gameid, @loginid, now(), md5(@gameid), '1.0', {0}, {1}, {2}, 5000, concat('{3} (Alawar) (', @gameid, ')'));\n\n"
        .f(data.isVerify ? 1 : 0, data.isFeature ? 1 : 0, data.isVisible ? 1 : 0, data.en.title ? data.en.title : data.ru.title);

    query += "insert game_category_cross (GameId, CategoryId) values\n";
    query += "(@gameid, {0})".f(data.category[0].id);
    for (var i = 1; i < data.category.length; i++) query += ", (@gameid, {0})".f(data.category[i].id);
    query += ";\n\n";

    if (data.links.length > 0) {
        query += "insert game_platform_cross (GameId, PlatformId, GameLink) values\n";
        query += "(@gameid, {0}, '{1}')".f(data.links[0].platform.id, data.links[0].link);
        for (var i = 1; i < data.links.length; i++)
            query += ", (@gameid, {0}, '{1}')".f(data.links[0].platform.id, data.links[0].link);
        query += ";\n\n";
    }

    // text
    if (data.en || data.ru) query += "insert dictionary (DictSrcId, LanguageId, ObjectId, TextTypeId, DictName) values\n";
    if (data.en) {
        query += '(9, 1, @gameid, 1, "{0}"),\n'.f(data.en.title);
        query += '(10, 1, @gameid, 1, "{0}"),\n'.f(data.en.short);
        query += '(11, 1, @gameid, 1, "{0}"),\n'.f(data.en.full);
        query += '(11, 1, @gameid, 2, "{0}")'.f(data.en.fullHtml);
        if (!data.ru) query += ";\n\n";
    }
    if (data.ru) {
        if (data.en) query += ",\n";
        query += '(9, 2, @gameid, 1, "{0}"),\n'.f(data.ru.title);
        query += '(10, 2, @gameid, 1, "{0}"),\n'.f(data.ru.short);
        query += '(11, 2, @gameid, 1, "{0}"),\n'.f(data.ru.full);
        query += '(11, 2, @gameid, 2, "{0}");\n'.f(data.ru.fullHtml);
    }

    // images
    var img = data.images;
    query += "\ninsert image (ImageTypeId, ImageObjectId, ImageNum, ImageLink) values\n";
    query += "(1, @gameid, 1, concat('http://img.zeerabbit.com/games/',@gameid,'_logo.{0}'))".f(img.logoFormat.file);
    if (img.banner) query += ",\n(2, @gameid, 1, concat('http://img.zeerabbit.com/games/banners/',@gameid,'_banner.{0}'))".f(img.bannerFormat.file);
    for (var i = 1; i <= img.screens; i++) {
        query += ",\n(3, @gameid, {0}, concat('http://img.zeerabbit.com/games/',@gameid,'_sc{0}.{1}'))".f(i, img.screenFormat.file);
    }
    query += ";\n\n";

    if (img.ruBanner || img.ruLogo || img.ruScreens) {
        query += "insert image_lang (ImageId, LanguageId, ImageLink)\n";
        query += "select imageid, 2, concat(substring(ImageLink, 1, length(ImageLink)-4), '_ru', substring(ImageLink, length(ImageLink)-3))\n";
        query += "from image where imageobjectid=@gameid and imagetypeid in ({0}, {1}, {2});"
            .f(img.ruLogo ? 1 : -1, img.ruBanner ? 2 : -1, img.ruScreens ? 3 : -1);
    }
    return query;
}