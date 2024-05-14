import { formatDate } from "@angular/common";

export function setTodayDate() {
  let todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  return formatDate(todayDate, "yyyy-MM-dd", "en-US");
}
