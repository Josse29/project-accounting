export const timeIndonesian = () => {
  const now = new Date();
  const optionsDMY = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const optionsH = {
    hour: "numeric",
  };
  const optionsM = {
    minute: "numeric",
  };
  const optionsS = {
    second: "numeric",
  };
  const indonesiaDayMonthYear = now.toLocaleString("id-ID", optionsDMY);
  const indonesiaHour = now.toLocaleString("id-ID", optionsH);
  const indonesiaMinute = now.toLocaleString("id-ID", optionsM);
  const indonesiaSecond = now.toLocaleString("id-ID", optionsS);
  return {
    indonesiaDayMonthYear,
    indonesiaHour,
    indonesiaMinute,
    indonesiaSecond,
  };
};
