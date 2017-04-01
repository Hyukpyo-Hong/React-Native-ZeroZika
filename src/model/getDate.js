module.exports = function getDate(yesterday) {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = today.getMonth() + 1; //January is 0!

    if (yesterday) {
        var dd = today.getDate() - 1;
    } else {
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