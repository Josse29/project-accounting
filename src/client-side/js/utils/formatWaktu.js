// version1
export const timeIndonesian = () => {
  const now = new Date();
  const optionsDDMY = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const indonesiaDDMY = now.toLocaleString("id-ID", optionsDDMY);
  const indonesiaHour = ("0" + now.getHours()).slice(-2);
  const indonesiaMinute = ("0" + now.getMinutes()).slice(-2);
  const indonesiaSecond = ("0" + now.getSeconds()).slice(-2);
  return {
    indonesiaDDMY,
    indonesiaHour,
    indonesiaMinute,
    indonesiaSecond,
  };
};
// version2
export const formatWaktuIndo = (objectDate) => {
  const dateObject = new Date(objectDate);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const dayOfWeek = days[dateObject.getDay()];
  const dayOfMonth = dateObject.getDate();
  const month = months[dateObject.getMonth()];
  const year = dateObject.getFullYear();
  const formattedDate =
    dayOfWeek + ", " + dayOfMonth + " " + month + " " + year;
  return formattedDate;
};
export const getTimeNow = () => {
  let now = new Date();
  let year = now.getFullYear();
  let month = ("0" + (now.getMonth() + 1)).slice(-2);
  let day = ("0" + now.getDate()).slice(-2);
  let hours = ("0" + now.getHours()).slice(-2);
  let minutes = ("0" + now.getMinutes()).slice(-2);
  let seconds = ("0" + now.getSeconds()).slice(-2);
  let formattedDDMY = `${year}-${month}-${day}`;
  let formattedHMS = `${hours}:${minutes}:${seconds}`;
  return { formattedDDMY, formattedHMS };
};
