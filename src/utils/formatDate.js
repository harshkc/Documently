const formatDate = (date) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join("-");
};

const toShortFormat = (providedDate) => {
  let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let day = providedDate.getDate();

  let monthIndex = providedDate.getMonth();
  let monthName = monthNames[monthIndex];

  let year = providedDate.getFullYear();

  return `${day}-${monthName}-${year}`;
};

export {formatDate, toShortFormat};
