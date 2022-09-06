export const getTodayData = () => {
  const today = new Date();
  return today.toLocaleDateString();
};
