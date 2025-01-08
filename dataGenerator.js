const fs = require("fs");
const faker = require("faker");

const generateRandomData = (count, cols) => {
  const data = [];
  const colorTypes = ["info", "normal", "gray", "error"];

  for (let i = 1; i <= count; i++) {
    const values = {};
    for (let j = 1; j <= cols; j++) {
      values[`column-${j}`] = { value: faker.random.word() };
    }

    const record = {
      id: i,
      colorType: colorTypes[Math.floor(Math.random() * colorTypes.length)],
      data: values,
    };

    data.push(record);
  }

  return data;
};

const jsonData = JSON.stringify(generateRandomData(10000, 8), null, 2);

fs.writeFile("data.json", jsonData, (err) => {
  if (err) throw err;
  console.log("Random data has been written to randomData.json");
});
