export function terbilangIndonesia(angka) {
  const angkaTerbilang = [
    "nol",
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
    "dua belas",
    "tiga belas",
    "empat belas",
    "lima belas",
    "enam belas",
    "tujuh belas",
    "delapan belas",
    "sembilan belas",
    "dua puluh",
    "tiga puluh",
    "empat puluh",
    "lima puluh",
    "enam puluh",
    "tujuh puluh",
    "delapan puluh",
    "sembilan puluh",
  ];
  const angkaBilangan = ["", "ribu", "juta", "miliar", "triliun"];
  function convertToWords(number) {
    if (number < 20) {
      return angkaTerbilang[number];
    } else if (number < 100) {
      const tens = Math.floor(number / 10);
      const ones = number % 10;
      return ones === 0
        ? angkaTerbilang[tens + 18]
        : angkaTerbilang[tens + 18] + " " + angkaTerbilang[ones];
    } else if (number < 1000) {
      const hundreds = Math.floor(number / 100);
      const remainder = number % 100;
      if (remainder === 0) {
        return angkaTerbilang[hundreds] + " ratus";
      } else {
        return angkaTerbilang[hundreds] + " ratus " + convertToWords(remainder);
      }
    } else {
      let result = "";
      let part = 0;
      while (number > 0) {
        const partValue = number % 1000;
        if (partValue > 0) {
          result =
            convertToWords(partValue) +
            " " +
            angkaBilangan[part] +
            (result ? " " + result : "");
        }
        number = Math.floor(number / 1000);
        part++;
      }
      return result.trim();
    }
  }
  // Convert integer part
  const integerPart = Math.floor(angka);
  const integerWords = convertToWords(integerPart);
  // Convert decimal part (if exists)
  const decimalPart = angka % 1;
  let decimalWords = "";
  if (decimalPart > 0) {
    const decimalString = decimalPart.toFixed(2).split(".")[1];
    decimalWords = " koma";
    for (let i = 0; i < decimalString.length; i++) {
      decimalWords += " " + angkaTerbilang[parseInt(decimalString.charAt(i))];
    }
  }
  return integerWords + decimalWords + " rupiah";
}
export function numberToWordsEnglish(num) {
  const ones = [
    "zero",
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

  function convertToWords(number) {
    if (number === 0) {
      return ones[0];
    }
    let result = "";
    let part = 0;

    while (number > 0) {
      if (number % 1000 !== 0) {
        result =
          convertChunk(number % 1000) +
          " " +
          thousands[part] +
          (result ? " " + result : "");
      }
      number = Math.floor(number / 1000);
      part++;
    }

    return result.trim();
  }
  function convertChunk(number) {
    if (number === 0) {
      return "";
    }
    if (number < 20) {
      return ones[number];
    } else if (number < 100) {
      const tenPart = Math.floor(number / 10);
      const onePart = number % 10;
      return tens[tenPart] + (onePart !== 0 ? " " + ones[onePart] : "");
    } else {
      const hundredPart = Math.floor(number / 100);
      const remainder = number % 100;
      return (
        ones[hundredPart] +
        " hundred" +
        (remainder !== 0 ? " " + convertChunk(remainder) : "")
      );
    }
  }
  const integerPart = Math.floor(num);
  const integerWords = convertToWords(integerPart);
  // Handle decimal part
  const decimalPart = num % 1;
  let decimalWords = "";
  if (decimalPart > 0) {
    const decimalString = decimalPart.toFixed(2).split(".")[1];
    decimalWords = " point";
    for (let i = 0; i < decimalString.length; i++) {
      decimalWords += " " + ones[parseInt(decimalString.charAt(i))];
    }
  }
  return integerWords + decimalWords + " dollars";
}
