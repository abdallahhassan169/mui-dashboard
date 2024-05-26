import { config } from "../../config/default.js";
import { generateOTP } from "./otp.js";
import CryptoJS from "crypto-js";
import { create } from "apisauce";
export const syncErrors = {
  inSync: 1,
  invlidServerKeyId: 2,
  invalidSharedKey: 3,
  outOfSync: 4,
};
// import crypto from "crypto-browserify";
const backend = config.backend;
const sessionObject = {};
export const initClientKeys = async () => {
  // //console.log(backend.url);
  const api = create({
    baseURL: backend.url,
  });
  const serverPublicResponse = await api.get(`/auth/pk`, {});
  const serverPublic = serverPublicResponse.data.publicKey;
  const serverKeyId = serverPublicResponse.data.keyId;

  // //console.log(serverPublic);
  const serverPublicKey = hex2Arr(serverPublic);
  // //console.log(`Alice's publicKey: ${serverPublicKey}`);
  const keyParams = {
    name: "ECDH",
    namedCurve: "P-521", //can be "P-256", "P-384", or "P-521"
  };

  try {
    const clientKeyObject = await window.crypto.subtle.generateKey(
      keyParams,
      false, // no need to make Bob's private key exportable
      ["deriveKey", "deriveBits"]
    );
    const clientPublicKeyBuffer = await window.crypto.subtle.exportKey(
      "raw",
      clientKeyObject.publicKey
    );
    const clientPublicKeyHex = buf2Hex(clientPublicKeyBuffer); // =====> Client Public Key
    const serverKeyImported = await window.crypto.subtle.importKey(
      "raw",
      serverPublicKey,
      keyParams,
      true,
      []
    );
    const sharedSecret = await window.crypto.subtle.deriveBits(
      {
        ...keyParams,
        public: serverKeyImported,
      },
      clientKeyObject.privateKey,
      528 /* algoritm is 521 so key length must be dividable by 8 then 528 is the nearest */
    );
    sessionObject.sharedKey = buf2Hex(sharedSecret);
    sessionObject.publicKey = clientPublicKeyHex;
    sessionObject.serverKeyId = serverKeyId;
    return validateSsession();
  } catch (err) {
    // console.error(err);
    return syncErrors.outOfSync;
  }
};
export const setToken = (token) => {
  sessionObject.token = token;
};
export const getToken = () => {
  return sessionObject.token;
};
export const validateSsession = async () => {
  try {
    const api = create({
      baseURL: backend.url,
    });
    const checkObject = await createTunnleObject();
    const result = await api.post(`/auth/shared`, checkObject);

    // //console.log(+result.data);
    if (+result.data === syncErrors.inSync)
      generateOTP(sessionObject.sharedKey);
    return +result.data;
  } catch (e) {
    return syncErrors.outOfSync;
  }
};
export const createTunnleObject = async () => {
  const nounceHash = await hmacSha256(
    sessionObject.sharedKey,
    sessionObject.serverKeyId
  );
  return {
    // sharedSecret: sessionObject.sharedKey,
    publicKey: sessionObject.publicKey,
    serverKeyId: sessionObject.serverKeyId,
    nounceHash,
    otp: await generateOTP(sessionObject.sharedKey),
    // aes: await aesEncrypt(sessionObject.sharedKey, JSON.stringify(config)),
  };
};
export const aesEncrypt = async (sharedKey, message) => {
  const enc = await CryptoJS.AES.encrypt(message, sharedKey);
  return enc.toString();
};
export const aesDecrypt = async (sharedKey, message) => {
  const enc = await CryptoJS.AES.decrypt(message, sharedKey);
  return enc.toString();
};
export const defaultAesEncrypt = async (message) => {
  const data = await aesEncrypt(sessionObject.sharedKey, message);

  return {
    data,
    publicKey: sessionObject.publicKey,
    serverKeyId: sessionObject.serverKeyId,
  };
};
export const defaultAesDecrypt = async (message) => {
  const data = await aesDecrypt(sessionObject.sharedKey, message);
  return {
    data,
    publicKey: sessionObject.publicKey,
    serverKeyId: sessionObject.serverKeyId,
  };
};
const hmacSha256 = async (key, message) => {
  const sha256 = await CryptoJS.HmacSHA256(message, key);
  return CryptoJS.enc.Hex.stringify(sha256);
};
const hex2Arr = (str) => {
  if (!str) {
    return new Uint8Array();
  }
  const arr = [];
  for (let i = 0, len = str.length; i < len; i += 2) {
    arr.push(parseInt(str.substr(i, 2), 16));
  }
  return new Uint8Array(arr);
};

export const buf2Hex = (buf) => {
  return Array.from(new Uint8Array(buf))
    .map((x) => ("00" + x.toString(16)).slice(-2))
    .join("");
};
