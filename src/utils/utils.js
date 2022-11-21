exports.uniqueId = (l) => {
  return `${l}-xxxxxxxxx`.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

exports.convertToSlug = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

exports.removeWhiteSpaces = (str) => {
  return str
    .toLowerCase()
    .replace(/\s{2,}/g, " ")
    .trim();
};
