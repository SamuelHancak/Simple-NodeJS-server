# Server Data API

This project provides a simple Express server that generates and serves random data. The server includes endpoints for retrieving all data, sorting data, getting data within a specified range, and paginating data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Development](#development)
- [License](#license)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/SamuelHancak/Simple-NodeJS-server
   cd Simple-NodeJS-server
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the server:

   ```sh
   node index.js
   ```

2. The server will be running on `http://localhost:4000`.

## Endpoints

### Get All Data

- **URL:** `/`
- **Method:** `GET`
- **Description:** Retrieves all the data.
- **Response:**
  ```json
  {
    "totalCount": 10000,
    "data": [ ... ]
  }
  ```

### Sort Data

- **URL:** `/sort/:col/:dir`
- **Method:** `GET`
- **Description:** Sorts data by a specific column in either ascending or descending order.
- **Parameters:**
  - [col](http://_vscodecontentref_/0) (number): The index of the column to sort the data by.
  - [dir](http://_vscodecontentref_/1) (string): The direction to sort the data ("ASC" for ascending or "DESC" for descending).
- **Response:**
  ```json
  {
    "totalCount": 10000,
    "data": [ ... ]
  }
  ```

### Get Range Data

- **URL:** `/range/:start/:end`
- **Method:** `GET`
- **Description:** Retrieves data within a specified index range.
- **Parameters:**
  - [start](http://_vscodecontentref_/2) (number): The starting index of the data range.
  - [end](http://_vscodecontentref_/3) (number): The ending index of the data range.
- **Response:**
  ```json
  {
    "totalCount": <count>,
    "data": [ ... ]
  }
  ```

### Get Paginated Data

- **URL:** `/pagination/:page/:pageSize`
- **Method:** `GET`
- **Description:** Retrieves paginated data.
- **Parameters:**
  - [page](http://_vscodecontentref_/4) (number): The current page number.
  - [pageSize](http://_vscodecontentref_/5) (number): The number of records per page.
- **Response:**
  ```json
  {
    "currentPage": <page>,
    "totalPages": <totalPages>,
    "totalCount": 10000,
    "data": [ ... ]
  }
  ```

## Development

### Generate Random Data

The [dataGenerator.js](http://_vscodecontentref_/6) script generates random data and saves it to [data.json](http://_vscodecontentref_/7). This script is automatically executed if [data.json](http://_vscodecontentref_/8) is not found when starting the server.

### Test HTTP Requests

You can use the [test.http](http://_vscodecontentref_/9) file to test the endpoints using the built-in HTTP client in Visual Studio Code.

## License

This project is licensed under the MIT License.
