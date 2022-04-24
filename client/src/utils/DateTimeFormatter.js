export const DateFormat = (date) => {
  if (!date) {
    return undefined;
  }
  console.log(date);
  const diff = dateDiff(date, Date.now());
  if (diff < 1) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (diff > 1) {
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (diff > 365) {
    return date.toLocaleDateString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
};
const dateDiff = (d1, d2) => {
  if (d1 && d2) {
    const diff = d1 - d2;
    const dateDiff = diff / (1000 * 3600 * 24);
    return Math.abs(dateDiff);
  }
  return undefined;
};
