function dateSet() {
    var today = new Date();
    var yes_day = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24);

    var ymm = yes_day.getMonth() + 1; //January is 0!
    var ydd = yes_day.getDate();
    if (ydd < 10) {
        ydd = '0' + ydd;
    }
    if (ymm < 10) {
        ymm = '0' + ymm;
    }
    var mm = today.getMonth() + 1; //January is 0!
    var dd = today.getDate();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var date = {
        yesterday: ymm + '-' + ydd,
        today: mm + '-' + dd
    }
    return date;

}

function check(forecast, yesterday, today) {
    var result = {
        yesterday: false,
        today: false,
        season: false,
        temp: false,
        result: false,
    }
    dateset = dateSet();
    var total = forecast.concat(yesterday).concat(today);

    var count = 0;
    var temp_sum = 0;

    total.map((x) => {
        let val = x.weather.icon.charAt(0);
        let date = x.datetime.slice(5, 10);
        if ((date === dateset.yesterday && val === 'd') || (date === dateset.yesterday && val === 'r')) {
            result.yesterday = true;
        }
        else if ((date === dateset.today && val === 'd') || (date === dateset.today && val === 'r')) {
            result.today = true;
        }
        if (date === dateset.today) {
            count++;
            temp_sum += x.temp;
        }
    })

    if ((temp_sum / count) >= 50) {
        result.temp = true
    } 
    var month = parseInt(dateset.today.slice(0, 2));
    if (month >= 4 && month <= 10) {
        result.season = true;
    }

    return result;

}

module.exports = function compute_risk(forecast, yesterday, today) {

    var risk_set = check(forecast.data, yesterday.data, today.data);
    if (risk_set.season && risk_set.temp && risk_set.yesterday && !risk_set.today) {
        risk_set.result = true;
    }
    return risk_set;

}

