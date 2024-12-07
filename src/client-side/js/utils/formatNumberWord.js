export function terbilangIndonesia(angka) {
  const satuan = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
    "sebelas",
  ];

  function terbilang(angka) {
    if (angka < 12) {
      return satuan[angka];
    } else if (angka < 20) {
      return terbilang(angka - 10) + " belas";
    } else if (angka < 100) {
      return (
        terbilang(Math.floor(angka / 10)) + " puluh " + terbilang(angka % 10)
      );
    } else if (angka < 200) {
      return "seratus " + terbilang(angka - 100);
    } else if (angka < 1000) {
      return (
        terbilang(Math.floor(angka / 100)) + " ratus " + terbilang(angka % 100)
      );
    } else if (angka < 2000) {
      return "seribu " + terbilang(angka - 1000);
    } else if (angka < 1000000) {
      return (
        terbilang(Math.floor(angka / 1000)) + " ribu " + terbilang(angka % 1000)
      );
    } else if (angka < 1000000000) {
      return (
        terbilang(Math.floor(angka / 1000000)) +
        " juta " +
        terbilang(angka % 1000000)
      );
    } else if (angka < 1000000000000) {
      return (
        terbilang(Math.floor(angka / 1000000000)) +
        " milyar " +
        terbilang(angka % 1000000000)
      );
    } else if (angka < 1000000000000000) {
      return (
        terbilang(Math.floor(angka / 1000000000000)) +
        " triliun " +
        terbilang(angka % 1000000000000)
      );
    }
  }

  return angka === 0 ? "nol" : terbilang(angka);
}
export function numberToWordsEnglish(num) {
  if (num === 0) return "zero";

  const belowTwenty = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const thousands = ["", "thousand", "million", "billion", "trillion"];

  function helper(n) {
    if (n < 20) return belowTwenty[n];
    else if (n < 100)
      return (
        tens[Math.floor(n / 10)] + (n % 10 ? " " + belowTwenty[n % 10] : "")
      );
    else if (n < 1000)
      return (
        belowTwenty[Math.floor(n / 100)] +
        " hundred" +
        (n % 100 ? " " + helper(n % 100) : "")
      );
    return "";
  }

  function toWords(n) {
    if (n === 0) return "";
    let index = 0;
    let words = "";
    while (n > 0) {
      if (n % 1000 !== 0) {
        words =
          helper(n % 1000) +
          (index ? " " + thousands[index] + " " : "") +
          words;
      }
      n = Math.floor(n / 1000);
      index++;
    }
    return words.trim();
  }

  return toWords(num);
}
