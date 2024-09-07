export const DateFormat = (date: string) => {
  const dateObj = new Date(date);

  let month: any = dateObj.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  return `${dateObj.getFullYear()}-${month}-${dateObj.getDate()}`;
};
