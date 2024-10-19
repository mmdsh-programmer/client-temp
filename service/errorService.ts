import { NotFoundError } from "@utils/error";

export const errorService = async() => {
    throw new NotFoundError(["منبع مورد نظر پیدا نشد"], { data: { referenceNumber: "1234" } });
};