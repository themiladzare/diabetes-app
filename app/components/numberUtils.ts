const toPersianDigits = (num: string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

export { toPersianDigits };
