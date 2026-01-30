import { writeFile } from 'fs';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const SPREADSHEET_ID = '13gF0XdYzus_12JI7SM1BYsvsmL-TfygyJFkMEJDcgVI';
const API_KEY = 'AIzaSyCyaJZ7J4ptDaC7Ep8dWAytZt1LSeZzHgQ';
const OUTPUT_DIR = './app/i18n';

const secret = {
  apiKey: API_KEY,
};

// Initialize the sheet
const doc = new GoogleSpreadsheet(SPREADSHEET_ID, secret);

// Initialize Auth
const init = async () => {
  await doc.loadInfo();
};

const read = async () => {
  await doc.loadInfo();
  const result = {};

  for (const sheet of doc.sheetsByIndex) {
    const rows = await sheet.getRows({ limit: sheet.rowCount });
    await sheet.loadHeaderRow();
    const colTitles = sheet.headerValues;
    // Convert rows to key-value pairs
    let translations = {};
    rows.forEach((row) => {
      colTitles.slice(1).forEach((title) => {
        translations[title] = translations[title] || [];
        const key = row.get(colTitles[0]);
        translations = {
          ...translations,
          [title]: {
            ...translations[title],
            [key]: row.get(title) !== '' ? row.get(title) : undefined,
          },
        };
      });
    });
    result[sheet.title] = translations;
  }
  return result;
};

function parseDotNotation(str, val, obj) {
  let currentObj = obj;
  const keys = str.split('.');
  let i;
  const l = Math.max(1, keys.length - 1);
  let key;
  for (i = 0; i < l; ++i) {
    key = keys[i];
    currentObj[key] = currentObj[key] || {};
    currentObj = currentObj[key];
  }
  currentObj[keys[i]] = val;
  delete obj[str];
}

Object.expand = function (obj) {
  for (const key in obj) {
    if (key.indexOf('.') !== -1) {
      parseDotNotation(key, obj[key], obj);
    }
  }
  return obj;
};

const write = (data) => {
  for (const [key1, subData] of Object.entries(data)) {
    for (const [key2, _content] of Object.entries(subData)) {
      const filePath = `${OUTPUT_DIR}/${key2}/${key1}.json`;
      const tempObject = Object.expand(data[key1][key2]);

      writeFile(filePath, JSON.stringify(tempObject, null, 2), (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  }
};

init()
  .then(() => read())
  .then((data) => write(data))
  .then(() => {
    console.log('Success!');
  })
  .catch((err) => console.log('ERROR!!!!', err));
