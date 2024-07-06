export function formatRupiah1(angka) {
  let number_string = angka.toString().replace(/[^,\d]/g, "");
  let split = number_string.split(",");
  let sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  let ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  if (angka === "0") {
    return "";
  }
  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }
  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return "Rp " + rupiah;
}
export function disFormatRupiah1(angka) {
  let price = angka
    .replace(/^Rp\s*/, "")
    .replace(/\./g, "")
    .replace(/,/g, ".");
  return parseFloat(price);
}

export function formatRupiah2(input) {
  let formattedValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(input);
  return formattedValue;
}
