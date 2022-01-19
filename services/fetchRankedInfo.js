const { google } = require("googleapis");
const privateKey = process.env.KEY
const spreadsheetId = process.env.SHEETID;
const email = process.env.EMAIL;
const accessScopes = ["https://www.googleapis.com/auth/spreadsheets"];

export default async function fetchData() {
  const client = await authenticateGoogleSheetsClient();
  const totalData = {};
  let range = "";

  // ranked info
  range = "'Ranked Pool History'";
  try {
    const ranked = await client.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });
    totalData.ranked = ranked;
  } catch (err) {
    console.log(err);
    totalData.ranked = [];
  }

  // map info
  range = "'raw_data'";
  try {
    const maps = await client.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });
    totalData.maps = maps;
  } catch (err) {
    console.log(err);
    totalData.maps = [];
  }

  const processedRankedMaps = mergeData(totalData.ranked.data.values, totalData.maps.data.values);
  totalData.rankedInfo = processedRankedMaps;

  return processedRankedMaps;
}

function mergeData(rankedInfo, maps) {
  // if empty
  if (rankedInfo.length <= 0 || maps.length <= 0) return [];

  let rankedCodes = [];
  let selectedInfo = [];

  // get list of ranked map codes of the most current season
  let row = rankedInfo.length;
  let col = rankedInfo[0].length;
  // first two rows are just headings in the sheets; skipped
  for (let i = 2; i < row; i++) {
    let curr = rankedInfo[i][col - 1];
    if (typeof curr !== "undefined") {
      rankedCodes.push(curr);
    }
  }

  // merge codes with all maps
  row = maps.length;
  col = maps[0].length;
  const equalCode = (heading) => heading === 'code';
  let codeIndex = maps[0].findIndex(equalCode);
  let headings = maps[0];

  // first row is heading; skipped
  for (let i = 1; i < row; i++) {
    let currRow = maps[i];
    if (rankedCodes.includes(currRow[codeIndex])) {
      let infoObj = {}
      for (let j =0; j < headings.length; j++){
        infoObj[headings[j]] = typeof currRow[j] === 'undefined' ? '' : currRow[j]
      }
      selectedInfo.push(infoObj);
    }
  }
  return selectedInfo;
}

async function authenticateGoogleSheetsClient() {
  const client = new google.auth.JWT(
    email,
    null,
    privateKey,
    accessScopes,
    null
  );
  await client.authorize();
  return google.sheets({
    version: "v4",
    auth: client,
  });
}
