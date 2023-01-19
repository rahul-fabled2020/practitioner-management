export function convertTo12HourTime(timestamp: string | Date | number) {
  const date: Date = new Date(timestamp);

  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return hours + ':' + minutes + ' ' + ampm;
}

export function convertToYYYYMMDD(timestamp: string | Date | number) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  let month: number | string = date.getMonth() + 1; // getMonth() is zero-based
  let day: number | string = date.getDate();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  return year + '-' + month + '-' + day;
}
