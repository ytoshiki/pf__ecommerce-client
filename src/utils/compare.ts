export const compareProfit = (a: { sold: number }, b: { sold: number }) => {
  if (a.sold < b.sold) {
    return 1;
  }
  if (a.sold > b.sold) {
    return -1;
  }
  return 0;
};
