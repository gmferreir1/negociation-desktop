const strLimit = (string, limit) => {
  if (string) {
    if (string.length > limit) {
      return string.substring(0, limit) + "...";
    }
    return string;
  }

  return null;
};

const moneyFormat = (number, useSymbol) => {
  if (!number) {
    number = 0;
  }
  if (useSymbol) {
    return window.numeral(number).format("$0,0.00");
  }
  return window.numeral(number).format("0,0.00");
};

const wordUpper = text => {
  if (!text) return;
  let words = text.toLowerCase().split(" ");
  for (let a = 0; a < words.length; a++) {
    let w = words[a];
    if (w[0] !== "d" || w.slice(1) !== "e") {
      words[a] = !w[0] ? w[0] : w[0].toUpperCase() + w.slice(1);
    }
  }
  return words.join(" ");
};

const onlyNumber = text => {
  return !text ? "" : text.replace(/[^0-9]/g, "");
};

/**
 * Mascara telefone string
 * @param {*} v
 */
const maskPhone = phone => {
  phone = phone.replace(/\D/g, "");
  phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2");
  phone = phone.replace(/(\d)(\d{4})$/, "$1-$2");
  return phone;
};

const nl2br = (str, is_xhtml) => {
  var breakTag =
    is_xhtml || typeof is_xhtml === "undefined" ? "<br " + "/>" : "<br>";
  return (str + "").replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    "$1" + breakTag + "$2"
  );
};

const toUpperCase = (data, exclude = []) => {
  if (typeof data === "object") {
    if (exclude.length) {
      const props = Object.keys(data);
      props.map(key =>
        typeof data[key] === "string"
          ? (data[key] = exclude.includes(key)
              ? data[key]
              : data[key].toUpperCase())
          : data[key]
      );
    } else {
      const props = Object.keys(data);
      props.map(key =>
        typeof data[key] === "string"
          ? (data[key] = data[key].toUpperCase())
          : data[key]
      );
    }
  }

  return data;
};

const getMonthName = monthNumber => {
  const month = parseInt(monthNumber);

  if (month === 1) {
    return "janeiro";
  }

  if (month === 2) {
    return "fevereiro";
  }

  if (month === 3) {
    return "março";
  }

  if (month === 4) {
    return "abril";
  }

  if (month === 5) {
    return "maio";
  }

  if (month === 6) {
    return "junho";
  }

  if (month === 7) {
    return "julho";
  }

  if (month === 8) {
    return "agosto";
  }

  if (month === 9) {
    return "setembro";
  }

  if (month === 10) {
    return "outubro";
  }

  if (month === 11) {
    return "novembro";
  }

  if (month === 12) {
    return "dezembro";
  }
};

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const pagination = (items, page, per_page) => {
  var page = page || 1,
    per_page = per_page || 10,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page);
  return {
    page: page,
    perPage: per_page,
    //lastPage: page - 1 ? page - 1 : 1,
    //next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    //total_pages: total_pages,
    lastPage: total_pages,
    data: paginatedItems
  };
};

export {
  strLimit,
  moneyFormat,
  wordUpper,
  onlyNumber,
  maskPhone,
  nl2br,
  toUpperCase,
  getMonthName,
  formatBytes,
  pagination
};
