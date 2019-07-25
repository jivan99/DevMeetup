export default time24 => {
    var tmpArr = time24.split(':'),
      time12;
    if (+tmpArr[0] == 12) {
      time12 = tmpArr[0] + ':' + tmpArr[1] + ' pm';
    } else {
      if (+tmpArr[0] == '00') {
        time12 = '12:' + tmpArr[1] + ' am';
      } else {
        if (+tmpArr[0] > 12) {
          time12 = +tmpArr[0] - 12 + ':' + tmpArr[1] + ' pm';
        } else {
          time12 = +tmpArr[0] + ':' + tmpArr[1] + ' am';
        }
      }
    }
    return time12;
}
