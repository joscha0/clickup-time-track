const primaryColor = "#3373E3";
const backgroundColor = "#121212";
const borderColor = "1px solid #2f2f2f";
const backgroundColorLight = "#fff";
const borderColorLight = "1px solid #e5e5e5";

const calendarThemeDark = {
  common: {
    backgroundColor: backgroundColor,
    border: borderColor,
    holiday: {
      color: "#fff",
    },
  },
  week: {
    today: {
      color: primaryColor,
    },
    nowIndicatorLabel: {
      color: primaryColor,
    },
    nowIndicatorToday: {
      border: "1px solid " + primaryColor,
    },
    nowIndicatorPast: {
      border: "1px dashed " + primaryColor,
    },
    nowIndicatorBullet: {
      backgroundColor: primaryColor,
    },
    dayName: {
      borderLeft: borderColor,
      borderTop: borderColor,
      borderBottom: borderColor,
    },
    timeGrid: {
      borderRight: borderColor,
    },
    timeGridLeft: {
      borderRight: borderColor,
    },
    timeGridHalfHourLine: {
      borderBottom: "1px solid #2F2F2F59",
    },
    timeGridHourLine: {
      borderBottom: borderColor,
    },
    futureTime: {
      color: "#fff",
    },
  },
};

const calendarThemeLight = {
  common: {
    backgroundColor: backgroundColorLight,
    border: borderColorLight,
    holiday: {
      color: "#000",
    },
  },
  week: {
    today: {
      color: primaryColor,
    },
    nowIndicatorLabel: {
      color: primaryColor,
    },
    nowIndicatorToday: {
      border: "1px solid " + primaryColor,
    },
    nowIndicatorPast: {
      border: "1px dashed " + primaryColor,
    },
    nowIndicatorBullet: {
      backgroundColor: primaryColor,
    },
    dayName: {
      borderLeft: borderColorLight,
      borderTop: borderColorLight,
      borderBottom: borderColorLight,
    },
    timeGrid: {
      borderRight: borderColorLight,
    },
    timeGridLeft: {
      borderRight: borderColorLight,
    },
    timeGridHalfHourLine: {
      borderBottom: "1px solid #2F2F2F59",
    },
    timeGridHourLine: {
      borderBottom: borderColorLight,
    },
    futureTime: {
      color: "#000",
    },
  },
};

export { calendarThemeDark, calendarThemeLight };
