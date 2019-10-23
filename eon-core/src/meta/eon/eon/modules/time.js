eon.time = eon.time || {};

  eon.time.isLeapYear = function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  eon.time.getDaysInMonth = function (year, month) {
    return [31, eon.time.isLeapYear(parseInt(year)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][parseInt(month)];
  };

  eon.time.getMonthNames = function (locale, format) {
    var monthNames = [];
    format = format ? format : "long";
    for (var i = 0; i <= 11; i++) {
      monthNames.push(eon.time.getMonthName(locale, i, format));
    }
    return monthNames;
  };

  eon.time.getMonthName = function (locale, month, format) {
    var dummyDate = new Date(2000, month, 15);
    format = format ? format : "long";
    return dummyDate.toLocaleString(locale, { month: format });
  };

  eon.time.getWeekDays = function (locale, format) {
    var dayNames = [];
    var dummyDate;
    format = format ? format : "long";
    for (var i = 1; i <= 7; i++) {
      dummyDate = new Date(2000, 4, i);
      dayNames.push(dummyDate.toLocaleString(locale, { weekday: format }));
    }
    return dayNames;
  };

  eon.time.getWeekDay = function (year, month, day) {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(year, month, day).getDay()];
  };

  eon.time.getFirstWeekDay = function (locale, year, month, format) {
    var dummyDate = new Date(year, month, 1);
    format = format ? format : "long";
    return dummyDate.toLocaleString(locale, {
      weekday: format
    });
  };

  eon.time.getFirstWeekMonday = function (locale, year, month, format) {
    var monDay, monthDays;
    var firstWeekDay = eon.time.getFirstWeekDay(locale, year, month, format);
    var weekPosition = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].indexOf(firstWeekDay);
    // Check first month reached
    if (month === 0) {
      month = 11;
      year--;
    } else {
      month--;
    }
    // Get previous month days
    monthDays = eon.time.getDaysInMonth(year, month);
    monDay = (monthDays + 1) - weekPosition;
    return monDay;
  };

  eon.time.getDateWithFormat = function (date, format, locale) {

    if (date) {

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

    }

    return null;

  };

  eon.time.getFormatSeparator = function (format) {

    var dayFormat = (format.match(/[d|D]{1,2}/)) ? format.match(/[d|D]{1,2}/)[0] : undefined;
    var monthFormat = (format.match(/[M]{1,4}/)) ? format.match(/[M]{1,4}/)[0] : undefined;
    var yearFormat = (format.match(/[y|Y]{2,4}/)) ? format.match(/[y|Y]{2,4}/)[0] : undefined;

    format = format.replace(dayFormat, "");
    format = format.replace(monthFormat, "");
    format = format.replace(yearFormat, "");

    return format[0];

  };

  eon.time.getDateValueObjectFromString = function (value, format, includeTime) {

    var separator = eon.time.getFormatSeparator(format);

    var minutesFormat = (format.match(/[m]{1,2}/)) ? format.match(/[m]{1,2}/)[0] : null;
    var hoursFormat = (format.match(/[h]{1,2}/)) ? format.match(/[h]{1,2}/)[0] : null;
    var dayFormat = (format.match(/[d|D]{1,2}/)) ? format.match(/[d|D]{1,2}/)[0] : null;
    var monthFormat = (format.match(/[M]{1,4}/)) ? format.match(/[M]{1,4}/)[0] : null;
    var yearFormat = (format.match(/[y|Y]{2,4}/)) ? format.match(/[y|Y]{2,4}/)[0] : null;

    var splittedTime = value.indexOf(" ") ? value.split(" ")[1] : null;
    var splittedDate = value.indexOf(" ") ? value.split(" ")[0].split(separator) : value.split(separator);
    var splittedFormat = minutesFormat && hoursFormat ? format.split(" ")[0].split(separator) : format.split(separator);

    var dayIndex = splittedFormat.indexOf(dayFormat);
    var monthIndex = splittedFormat.indexOf(monthFormat);
    var yearIndex = splittedFormat.indexOf(yearFormat);

    var valueObj = {
      day: splittedDate[dayIndex] != "Invalid Date" ? splittedDate[dayIndex] : null,
      month: splittedDate[monthIndex] != "Invalid Date" ? splittedDate[monthIndex] : null,
      year: splittedDate[yearIndex] != "Invalid Date" ? splittedDate[yearIndex] : null
    }

    if (eon.util.isTrue(includeTime)) {
      valueObj.minutes = splittedTime ? splittedTime.split(":")[1] : null;
      valueObj.hours = splittedTime ? splittedTime.split(":")[0] : null;
    }

    return valueObj;

  };

  eon.time.getDateValueObjectFromDate = function (date, includeTime) {

    var valueObj = {
      day: date.toLocaleString([], { day: "numeric" }),
      month: date.toLocaleString([], { month: "numeric" }),
      year: date.toLocaleString([], { year: "numeric" })
    }

    if (eon.util.isTrue(includeTime)) {
      valueObj.hours = date.getHours();
      valueObj.minutes = date.getMinutes();
    }
    
    return valueObj;

  };

  eon.time.generateOutput = function (dateObj, format) {

    var minutesFormat = (format.match(/[m]{1,2}/)) ? format.match(/[m]{1,2}/)[0] : undefined;
    var hoursFormat = (format.match(/[h]{1,2}/)) ? format.match(/[h]{1,2}/)[0] : undefined;
    var dayFormat = (format.match(/[d|D]{1,2}/)) ? format.match(/[d|D]{1,2}/)[0] : undefined;
    var monthFormat = (format.match(/[M]{1,4}/)) ? format.match(/[M]{1,4}/)[0] : undefined;
    var yearFormat = (format.match(/[y|Y]{2,4}/)) ? format.match(/[y|Y]{2,4}/)[0] : undefined;

    var formatFn = function (text, format) {

      text = text ? text + "" : "";

      if (text.length > 0 && text.length < format.length) {
        for (var i = 0; i < (format.length - text.length); i++) {
          text = "0" + text;
        }
      }

      return text;

    };

    if (dateObj.minutes != null && minutesFormat) {
      var minutes = formatFn(dateObj.minutes, minutesFormat);
      format = format.replace(minutesFormat, minutes);
    }
    
    if (dateObj.hours != null && hoursFormat) {
      var hours = formatFn(dateObj.hours, hoursFormat);
      format = format.replace(hoursFormat, hours);
    }

    if (dateObj.day != null && dayFormat) {
      var day = formatFn(dateObj.day, dayFormat);
      format = format.replace(dayFormat, day);
    }

    if (dateObj.month != null && monthFormat) {
      var month = formatFn(dateObj.month, monthFormat);
      format = format.replace(monthFormat, month);
    }

    if (dateObj.year != null && yearFormat) {
      var year = formatFn(dateObj.year, yearFormat);
      format = format.replace(yearFormat, year);
    }

    return format;

  };

  eon.time.defaultLocale = {

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