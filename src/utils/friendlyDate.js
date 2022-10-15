import {formatDate} from "./sjzhuanh";

//传入("yyyy-MM-dd hh:mm:ss"格式的时间),计算现在与其的时间差别
function friendlyDate(timestamp) {
    let formats = {
        'year': '%n% 年前',
        'month': '%n% 月前',
        'day': '%n% 天前',
        'hour': '%n% 小时前',
        'minute': '%n% 分钟前',
        'second': '%n% 秒前',
    };
    if (!Object.is((Number)(timestamp), NaN)) {
        timestamp = (Number)(timestamp)
        timestamp = new Date(timestamp);
        timestamp = formatDate(timestamp, "yyyy-MM-dd hh:mm:ss");
    }
    let now = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
    let years3 = parseInt(timestamp[0] + timestamp[1] + timestamp[2] + timestamp[3]);
    let months3 = parseInt(timestamp[5] + timestamp[6]);
    let days3 = parseInt(timestamp[8] + timestamp[9]);
    let hours3 = parseInt(timestamp[11] + timestamp[12]);
    let minutes3 = parseInt(timestamp[14] + timestamp[15]);
    let seconds3 = parseInt(timestamp[17] + timestamp[18]);
    let years2 = parseInt(now[0] + now[1] + now[2] + now[3]);
    let months2 = parseInt(now[5] + now[6]);
    let days2 = parseInt(now[8] + now[9]);
    let hours2 = parseInt(now[11] + now[12]);
    let minutes2 = parseInt(now[14] + now[15]);
    let seconds2 = parseInt(now[17] + now[18]);

    let seconds = seconds2 - seconds3
    let minutes = minutes2 - minutes3
    let hours = hours2 - hours3
    let days = days2 - days3
    let months = months2 - months3
    let years = years2 - years3

    let diffType = '';
    let diffValue = 0;
    if (years > 0) {            //大于1年直接显示时间
        // diffType = 'year';
        // diffValue = years;
        return timestamp
    } else {
        if (months > 0) {          //大于一个月直接显示时间
            // diffType = 'month';
            // diffValue = months;
            return months3 + "月" + days3 + "日 " + hours3 + ":" + minutes3 + ":" + seconds3
        } else {
            if (days > 0) {
                if (days > 15) {     //大于15天直接显示时间
                    return months3 + "月" + days3 + "日 " + hours3 + ":" + minutes3 + ":" + seconds3
                }
                diffType = 'day';
                diffValue = days;
            } else {
                if (hours > 0) {
                    diffType = 'hour';
                    diffValue = hours;
                } else {
                    if (minutes > 0) {
                        diffType = 'minute';
                        diffValue = minutes;
                    } else {
                        diffType = 'second';
                        diffValue = seconds === 0 ? (seconds = 1) : seconds;
                    }
                }
            }
        }
    }
    return formats[diffType].replace('%n%', diffValue);
}

// function hello(str){
// 	return str
// }
export {
    friendlyDate
}
