// #################################################
// WARNING THIS LOGIC SHOULD USE ONLY IN SERVER SIDE
// #################################################
import crypto from "node:crypto";

const { CRYPTO_SECRET_KEY, CRYPTO_INIT_VECTOR_KEY, CRYPTO_ALGORITM } = process.env;

const secretKey_in_bytes = Buffer.from(CRYPTO_SECRET_KEY!, "hex");
const initVectorKey_in_bytes = Buffer.from(CRYPTO_INIT_VECTOR_KEY!, "hex");

export const decryptKey = (payload: string) => {
  const decipher = crypto.createDecipheriv(
    CRYPTO_ALGORITM!,
    secretKey_in_bytes!,
    initVectorKey_in_bytes!,
  );
  let decryptedData = decipher.update(payload, "hex", "utf8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
};

export const encryptKey = (payload: string) => {
  // the cipher function
  const cipher = crypto.createCipheriv(
    CRYPTO_ALGORITM!,
    secretKey_in_bytes,
    initVectorKey_in_bytes,
  );

  // encrypt the data
  let encryptedData = cipher.update(payload, "utf8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
};
