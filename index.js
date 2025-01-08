const fs = require("fs");
const { execSync } = require("child_process");
const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const dataFilePath = "./data.json";
if (!fs.existsSync(dataFilePath)) {
  console.log("data.json not found, generating...");
  execSync("node dataGenerator.js");
  console.log("data.json generated.");
}

const DATA_RAW = require("./data.json");

app.use(cors(corsOptions));

/**
 * GET endpoint to retrieve all the data.
 *
 * @returns {object} The total count of data and all the data.
 */
const getAllData = (_, res) => {
  res.json({
    totalCount: DATA_RAW.length,
    data: DATA_RAW,
  });
};

/**
 * GET endpoint for sorting data by a specific column in either ascending or descending order.
 *
 * @param {number} req.params.col - The index of the column to sort the data by.
 * @param {string} req.params.dir - The direction in which to sort the data ("ASC" for ascending or "DESC" for descending).
 * @returns {object} The total count of data and sorted data.
 * @throws {object} An error object if the specified column is not present in the data.
 */
const sortData = (req, res) => {
  const column = `column-${req.params.col}`;
  const dir = req.params.dir;

  if (!DATA_RAW[0].data.hasOwnProperty(column)) {
    return res.status(400).json({ error: `Invalid field: ${column}` });
  }

  DATA_RAW.sort((a, b) => {
    const valA = a.data[column].value;
    const valB = b.data[column].value;

    if (dir.toUpperCase() === "DESC") {
      return valB.localeCompare(valA);
    } else {
      return valA.localeCompare(valB);
    }
  });

  res.json({
    totalCount: DATA_RAW.length,
    data: DATA_RAW,
  });
};

/**
 * GET endpoint for data within a specified index range.
 *
 * @param {number} req.params.start - The starting index of the data range to return.
 * @param {number} req.params.end - The ending index of the data range to return.
 * @returns {object} The total count of data and data within the specified range.
 * @throws {object} An error object if the start or end parameter is not a number.
 */
const getRangeData = (req, res) => {
  const start = Number(req.params.start);
  const end = Number(req.params.end);

  if (isNaN(start) || isNaN(end)) {
    return res.status(400).json({ error: "Invalid range" });
  }

  const dataSliced = DATA_RAW.slice(start, end);
  res.json({
    totalCount: dataSliced.length,
    data: dataSliced,
  });
};

/**
 * GET endpoint for paginated data.
 *
 * @param {number} req.params.page - The current page to return.
 * @param {number} req.params.pageSize - The number of records to include per page.
 * @returns {object} The paginated data, including current page number, total number of pages, and the records for the current page.
 */
const getPaginatedData = (req, res) => {
  const page = parseInt(req.params.page) || 1;
  const pageSize = parseInt(req.params.pageSize) || 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const data = DATA_RAW.slice(startIndex, endIndex);

  res.json({
    currentPage: page,
    totalPages: Math.ceil(DATA_RAW.length / pageSize),
    totalCount: DATA_RAW.length,
    data,
  });
};

// Routes
app.get("/", getAllData);
app.get("/sort/:col/:dir", sortData);
app.get("/range/:start/:end", getRangeData);
app.get("/pagination/:page/:pageSize", getPaginatedData);

// Server start
app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
