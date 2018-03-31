vcomet.time = vcomet.time || {};

vcomet.time.isLeapYear = function (year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
};

vcomet.time.getDaysInMonth = function (year, month) {
  return [31, vcomet.time.isLeapYear(parseInt(year)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][parseInt(month)];
};

vcomet.time.getMonthNames = function (locale, format) {
  var monthNames = [];
  format = format ? format : "long";
  for (var i = 0; i <= 11; i++) {
    monthNames.push(vcomet.time.getMonthName(locale, i, format));
  }
  return monthNames;
};

vcomet.time.getMonthName = function (locale, month, format) {
  var dummyDate = new Date(2000, month, 15);
  format = format ? format : "long";
  return dummyDate.toLocaleString(locale, { month: format });
};

vcomet.time.getWeekDays = function (locale, format) {
  var dayNames = [];
  var dummyDate;
  format = format ? format : "long";
  for (var i = 1; i <= 7; i++) {
    dummyDate = new Date(2000, 4, i);
    dayNames.push(dummyDate.toLocaleString(locale, { weekday: format }));
  }
  return dayNames;
};

vcomet.time.getWeekDay = function (year, month, day) {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(year, month, day).getDay()];
};

vcomet.time.firstWeekDay = function (locale, year, month, format) {
  var dummyDate = new Date(year, month, 1);
  format = format ? format : "long";
  return dummyDate.toLocaleString(locale, {
    weekday: format
  });
};

vcomet.time.getDateWithFormat = function (date, format, locale) {
  var dayFormat = format.match(/[d|D]{1,2}/)
    ? format.match(/[d|D]{1,2}/)[0]
    : undefined;
  var monthFormat = format.match(/[M]{1,4}/)
    ? format.match(/[M]{1,4}/)[0]
    : undefined;
  var yearFormat = format.match(/[y|Y]{2,4}/)
    ? format.match(/[y|Y]{2,4}/)[0]
    : undefined;
  var dayType, monthType, yearType, dayString, monthString, yearString;
  if (yearFormat) {
    yearType = yearFormat.length > 1 ? "numeric" : "2-digit";
    yearString = formatedMonth = date.toLocaleString([locale], {
      year: yearType
    });
    format = format.replace(yearFormat, yearString);
  }
  if (dayFormat) {
    dayType = dayFormat.length > 1 ? "2-digit" : "numeric";
    dayString = formatedMonth = date.toLocaleString([locale], {
      day: dayType
    });
    format = format.replace(dayFormat, dayString);
  }
  if (monthFormat) {
    switch (monthFormat.length) {
      case 1:
        monthType = "numeric";
        break;
      case 3:
        monthType = "short";
        break;
      case 4:
        monthType = "long";
        break;
      default:
        monthType = "2-digit";
    }
    monthString = formatedMonth = date.toLocaleString([locale], {
      month: monthType
    });
    format = format.replace(monthFormat, monthString);
  }
  return format;
};

vcomet.time.defaultLocale = {

  months: {

    long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  },

  weekdays: {

    long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    min: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  }

};
