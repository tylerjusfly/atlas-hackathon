const { faker } = require("@faker-js/faker/locale/en_NG");
const catController = require("../controllers/category");
let categories;

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

exports.generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.randomCategoryId = async () => {
  const max = categories.length - 1;
  const min = 0;
  let randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
  return categories[randomIndex]._id;
};

exports.generateFakeProducts = async (num) => {
  let result = [];
  for (let i = 0; i < num; i++) {
    result = [
      ...result,
      {
        name: faker.commerce.product(),
        description: faker.lorem.paragraph(),
        price: faker.finance.amount(),
        image: faker.image.fashion(),
        unit: this.generateRandomNumber(1, 100),
        category: await this.randomCategoryId(),
        specifications: [faker.word.adjective(), faker.word.adjective(), faker.word.adjective()],
      },
    ];
  }
  return result;
};

exports.preLoadCategories = async () => {
  categories = await catController.getCategoriesInternal();
};
