//mentions
export const Mention = (text) => {
  const regex = /\B@[a-zA-Z0-9_-]+/gm;
  return (text = text.replace(regex, (match) => {
    return `<a id="test"  href=${
      match !== "@everyone"
        ? `/profile/settings?user=${match.substring(1)}`
        : `#`
    } >${match}</a>`;
  }));
};

export const MentionFilter = (text, username) => {
  var matchingText = text.match(/\B@[a-zA-Z0-9_-]+/gm);
  var parse = matchingText
    ? matchingText.map((val) => {
        return val.replace("@", "");
      })
    : [];

  if (username) parse.push(username);

  return parse;
};

//calendar
export const WeekDays = () => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days;
};

export const Months = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months;
};

export const DateFormat = (monthFormat) => {
  const formatter = new Intl.DateTimeFormat("en", {
    month: monthFormat,
  });
  return formatter;
};

export const DateOrdinal = (number) => {
  let index = (number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10;
  var ordinal = number > 0 ? ["th", "st", "nd", "rd"][index] : "";
  return ordinal;
};

export const GroupEntriesByMonthAndYear = (data) => {
  var months = Months();

  return data
    ? data.reduce((acc, entry) => {
        const createdAt = new Date(entry.createdAt);
        const yearMonth = `${months[
          createdAt.getMonth()
        ].toString()} ${createdAt.getFullYear()}`;

        if (!acc[yearMonth]) {
          acc[yearMonth] = [];
        }

        acc[yearMonth].push(entry);
        return acc;
      }, {})
    : "";
};
