"use server";

import { IActionError } from "@interface/app.interface";
import { errorService } from "@service/errorService";
import { normalizeError } from "@utils/normalizeActionError";

export const sampleCreateErrorAction = async() => {
   try {
    const result = await errorService();
    return result;
   } catch (error) {
      return normalizeError(error as IActionError);
   }
};

