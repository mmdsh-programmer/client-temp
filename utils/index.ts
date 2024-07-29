import moment from "moment-jalaali";
import { ERepoGrouping, ERoles } from "@interface/enums";

export const logger = (key: string, newValue: any, oldValue: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      `############################################################################  ${key}`
    );
    console.log("newValue -->", newValue);
    console.log("oldValue -->", oldValue);
    console.log(
      "####################################################################################"
    );
  }
};

export const translateRoles = (role?: ERoles) => {
  switch (role) {
    case ERoles.owner:
      return "مالک";
    case ERoles.admin:
      return "مدیر";
    case ERoles.editor:
      return "ویرایشگر";
    case ERoles.writer:
      return "نویسنده";
    default:
      return "مهمان";
  }
};

export const toPersinaDigit = (digits: number | string): string => {
  const fa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return digits.toString().replaceAll(/\d/g, (w) => {
    return fa[+w];
  });
};

export const FaDate = (standardTime: string) => {
  try {
    moment.loadPersian({
      dialect: "persian-modern",
    });
    return toPersinaDigit(
      moment(standardTime, "YYYY-MM-DDTHH:mm:ssZ").format(
        "HH:mm:ss | jDD jMMMM jYYYY"
      )
    );
  } catch {
    return "-";
  }
};

export const FaDateFromTimestamp = (timestamp: number) => {
  const newDate = new Date(timestamp);
  try {
    const standardTime = `${newDate.getFullYear()}-${`0${
      newDate.getMonth() + 1
    }`.slice(-2)}-${`0${newDate.getDate()}`.slice(
      -2
    )}T${`0${newDate.getHours()}`.slice(-2)}:${`0${newDate.getMinutes()}`.slice(
      -2
    )}:${`0${newDate.getSeconds()}`.slice(-2)}`;
    return FaDate(standardTime);
  } catch {
    return "-";
  }
};

export const preventNegativeValues = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  return ["e", "E", "+", "-"].includes(event.key) && event.preventDefault();
};

export const preventPasteNegative = (
  event: React.ClipboardEvent<HTMLInputElement>
) => {
  const { clipboardData } = event;
  const pastedData = Number.parseFloat(clipboardData.getData("text"));

  if (pastedData < 0) {
    event.preventDefault();
  }
};

export const slugify = (text: string) => {
  const slug = text
    .replaceAll(/\s+/g, "-") // Replace spaces with -
    .replaceAll(/-+/g, "-") // Replace multiple - with single -
    .toLowerCase(); // Convert the slug to lowercase

  return slug;
};

export const IsJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
};
