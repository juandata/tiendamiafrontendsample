const addDaysFromDate = (date: Date, days: number) => {
  const dateCopy = new Date(date);

  if (days >= 1) {
    dateCopy.setDate(date.getDate() + days);
  } else {
    dateCopy.setDate(date.getDate() - days);
  }

  return dateCopy;
};

export { addDaysFromDate };
