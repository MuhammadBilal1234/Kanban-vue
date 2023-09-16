import type { Task } from "@/types/task";

export function generateUniqueId() {
  const timestamp = new Date().getTime();
  const randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueId = "";

  uniqueId += timestamp;

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * randomChars.length);
    uniqueId += randomChars.charAt(randomIndex);
  }

  return uniqueId;
}

export function findBoardProgressInPercentage(done: number, total: number) {
  const percentage = (done / total) * 100;
  return !isNaN(percentage) ? percentage.toFixed() : 0;
}

export function filterByDateRange(
  arrayOfObjects: Task[],
  startDate: Date,
  endDate: Date
) {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  startDateObj.setHours(0, 0, 0, 0);
  endDateObj.setHours(0, 0, 0, 0);

  const filteredArray = arrayOfObjects.filter((item) => {
    const estimatedDate = new Date(item.estimated_date);
    estimatedDate.setHours(0, 0, 0, 0);
    return estimatedDate >= startDateObj && estimatedDate <= endDateObj;
  });

  return filteredArray;
}
