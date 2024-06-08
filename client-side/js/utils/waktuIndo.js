// version1 
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
// version2
export const formatWaktuIndo = (objectDate) => {
    const dateObject = new Date(objectDate)
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const dayOfWeek = days[dateObject.getDay()];
    const dayOfMonth = dateObject.getDate();
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();
    const formattedDate = dayOfWeek + ', ' + dayOfMonth + ' ' + month + ' ' + year;
    return {
        formattedDate
    }
}