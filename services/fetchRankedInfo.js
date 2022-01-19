const { google } = require("googleapis");

const privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC8hSJY5EBt2341\nPkh79aDJfUEb4HETczbTYuVJavol8Uvwk30hWgKdFXYPtW5s0N8WsZCIJdsjRq87\nY+M7WLMCOqIZlwjcJybdQUdmJgh481d/1AxUVnHYqmtPhVio0MRw2tUyozLXMgu2\nrAO6t7aBnZtKeARjCUWvcaIFMmC5VFPbw0sahBWP0tmeIbhSnhVJh9JvWKWhM7e0\nWZFaVxjZBYkZpyP3qcnm3YGNNqf8k5PFekUTwah2oLUsbod2DhV6oJ4uWq+UlSdN\nNmyWo4O6KxhXGgQERMNmEgzGYNPt9WfufiakxqeKYPt2PShP+3dvELgQ5oyt3TrU\nY8mV38g7AgMBAAECggEABrYClAGEHaULqB+QewEyeRnBYJmrzNJ0KDBEE0oAn6so\nVecaND69CxSBgGuoA62n02n8yCv40hepE0cqBqnQrYqizKBoy1WFd6jkPsmp0Yxw\nF/fXfIUbRmhCq7EGh/Pumknf/w56N9jrO9SByXrSv2h557vABDqHRYiZCPBTKyW6\nkZeC6d+6H92tTvktdJhkmK8/fwlNNPL0xJCufPp44xLrjdC2ALxnpZNqYf9fDHAn\naXyrDped3sjz3mjPf97/b6LGTbMOT0Y6oPViHZfXk184kaphg3fTT1m7u6ndyLr6\neUThnK2AM9FGJ4RbvCv07fMJYkhKj26Gc+hn5I7v4QKBgQD7kGACuwA6+jGlRol1\nkBqm9jubdpougTXK+AA0wLOGD9e7h7aklJeyM22Z5QzlsrQp2NlkUOAVmdnNtOHR\nVbF0MG5ZGETSzXwnRme3aKgwvRhVPIF9Ct/tgr9xfFEj91oIwxTjR7sg6giezvod\nA/uDrEjYOdWg6g4VVdCy8lVS6wKBgQC/2CmeeAY2lTZrBquizGfeIbeCw4wSlbbZ\nzhN1N4tykzaDM8MW4AIjxfmCxQyQ0j6tAjyGbMdoPjySmyMpRKC9F3pefdm6uabI\nJ0lEmWl5evSz3ScL+8VP/4S+eBUD11wlGGOR+n7BaBxz1E39TZHhxoPqOryOTitV\nEdkCH43r8QKBgG9d0fNDf+2cF2BYor/l5LanaWoAjm8qCntpYQX5jUA7QUEm6odf\ntOxR8iJgEV6ax0GDW3Iaj6lga9iyTAoVSrLqQd+1a7p694yXkZDThynUfLI3UAfg\nSZPm/wOpim5GsZgRbOzVM5V1pg1QCc/QlIcNPU5kBBvxofx1+idOOtGzAoGBAIhE\na7OTP56PuDqnX0zg8jpXKrloWttsmpf1B98v2A5HQOZK4x0heoOcgRGBE97eaASN\n3R4CsFV8N5xPM9eBVsdZoOLzc69tZWkwdpuSeNgAHUaRJMYfTNT5A3ojY5H57Aqx\nWzB6hISuhd9Egy0UZzW+wz6iAAL4xVDEv6cBcNaRAoGBAKc8m5gnLMrXOQIrUf55\nTVcirnyFVR6Zs2v9jFQFNKn+BVtG34EqtIg/mRroNaiMrp5+5apX+FoY3KC19fSb\nOTsQGU6C+sdE0rDMH89DUpKNeSCknNXIGV9qQ0KOeTwLFLUxdO036w0t14vyzN02\nP94iDNaiQ0+I1rX6WnT7uWvy\n-----END PRIVATE KEY-----\n"
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
