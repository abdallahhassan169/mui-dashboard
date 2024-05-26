import * as tunnle from "../../tunnle/index";

const isObject = (value) => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};
export const packFiles = (files) => {
  const frmData = new FormData();
  const meta = []; // Array Contains File Meta
  files.forEach((file, i) => {
    meta.push([
      file[0],
      {
        name: file[1].file ? file[1].file.name : null,
        extension: file[1].file ? file[1].file.extension : null,
        category: file[1].category,
        comment: file[1].comment,
        field: file[0],
        id: +file[1].id,
        op: +file[1].op,
      },
    ]);
    frmData.append(file[0], file[1].file.getRawFile());
  });
  // //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  frmData.append("DASH_meta", JSON.stringify(Object.fromEntries(meta)));
  return frmData;
};
export const pack_form_data = (params) => {
  let plainData = params ?? {};
  const objectArray = Object.entries(plainData);
  if (!objectArray || !objectArray.length)
    return { has_files: false, data: plainData };
  // //console.log("********** OBJECT ARRAY ***********");
  // //console.log(objectArray);
  const fileList = objectArray.filter(
    (x) => isObject(x[1]) && x[1]["is+form+file"] && x[1].file
  );

  if (!fileList || !fileList.length)
    return { has_files: false, data: plainData };
  // //console.log("********** fileList ***********");
  // //console.log(fileList);
  let dataList = objectArray.filter(
    (x) => !(isObject(x[1]) && x[1]["is+form+file"] && x[1].file)
  );
  const frmData = packFiles(fileList);
  // //console.log(pack);
  // //console.log("********** dataList ***********");
  // //console.log(dataList);
  const bodyList = dataList;
  // //console.log("BODY ARRRRRRRRRRAY");
  // //console.log(bodyList);
  const bodyJson = Object.fromEntries(bodyList);
  // //console.log("********** bodyList Json ***********");
  // //console.log(bodyJson);
  const stringified = JSON.stringify(bodyJson);
  // //console.log("STRINGIFIEDDDDDDDDDDDDDDDD");
  // //console.log(stringified);
  frmData.append("DASH_body", stringified);
  const result = { has_files: true, data: frmData };
  // //console.log("FINAAAAAAAAAAAAAAAAAAAAAAAAAALLLLLLLLLLLLLLLLLLL");
  // //console.log(result);
  return result;
};
export const manage_params = async (params, tunnleObject) => {
  // //console.log("In Post 1");
  let plainData = pack_form_data(params);
  // //console.log("PLAAAAAAAAAAAAAAAAIN DATA >>");
  // //console.log(plainData);
  let encData = plainData.data;
  // //console.log(encData);
  if (!plainData.has_files) {
    if (tunnleObject.is_enc && Boolean(plainData)) {
      encData = await tunnle.defaultAesEncrypt(JSON.stringify(encData));
    }
    return { has_files: plainData.has_files, encData };
  }
  return { has_files: plainData.has_files, encData };
};
