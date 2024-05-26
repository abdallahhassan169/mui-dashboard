/* https://www.npmjs.com/package/notp */

import * as base32 from "hi-base32";
import totp from "totp-generator";
export const generateOTP = async (key) => {
  try {
    // key = "dddd";
    const encoded = base32.encode(key);
    return totp(encoded);
  } catch (err) {
    //console.log(err);
    return false;
  }
};
