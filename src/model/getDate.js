module.exports = function getDate(yesterday) {
    var today = new Date();
    var yes_day = new Date((new Date()).valueOf() - 1000*60*60*24);

    if (yesterday) {
        var yyyy = yes_day.getFullYear();
        var mm = yes_day.getMonth() + 1; //January is 0!
        var dd = yes_day.getDate();
    } else {
        var yyyy = today.getFullYear();
        var mm = today.getMonth() + 1; //January is 0!
        var dd = today.getDate();
    }
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;

}

