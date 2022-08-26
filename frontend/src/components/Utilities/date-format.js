export const DateFormat = () => {
  let d = new Date();
  //one month offset atleast
  let month = (d.getMonth() + 2).toString();
  let day = d.getDate().toString();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [year, month, day].join("-");
};
