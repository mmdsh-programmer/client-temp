// #################################################
// WARNING THIS LOGIC SHOULD USE ONLY IN SERVER SIDE
// #################################################

import crypto from "crypto";

export const decryptKey = (
  payload: string,
  cryptoSecretKey: string,
  cryptoInitVectorKey: string
) => {
    const decipher = crypto.createDecipheriv(
      process.env.CRYPTO_ALGORITM!,
      Buffer.from(cryptoSecretKey, "hex"),
      Buffer.from(cryptoInitVectorKey, "hex")
    );
    let decryptedData = decipher.update(payload, "hex", "utf8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
};

export const encryptKey = (
  payload: string,
  cryptoSecretKey: string,
  cryptoInitVectorKey: string
) => {
    // the cipher function
    const cipher = crypto.createCipheriv(
      process.env.CRYPTO_ALGORITM!,
      Buffer.from(cryptoSecretKey, "hex"),
      Buffer.from(cryptoInitVectorKey, "hex")
    );

    // encrypt the data
    let encryptedData = cipher.update(payload, "utf8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
};
