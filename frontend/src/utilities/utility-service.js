export const Mention = (text) => {
  const regex = /\B@[a-zA-Z0-9_-]+/gm;
  return (text = text.replace(regex, (match) => {
    return `<a id="test"  href=${
      match !== "@everyone" ? `/profile?user=${match.substring(1)}` : `#`
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
