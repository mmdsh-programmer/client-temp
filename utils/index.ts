import { ERoles } from "@interface/enums";
import { IRepo } from "@interface/repo.interface";
import moment from "moment-jalaali";

const logger = (key: string, newValue: any, oldValue: any) => {
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

export const logEffect =
  (atomName) =>
  {return ({ onSet }) => {
    onSet((newValue, oldValue) => {
      logger(atomName, newValue, oldValue);
    });
  };};

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

export const translateVersionStatus = (status: string, state: string) => {
  let translated;
  let className;
  switch (status) {
    case "private":
    case "accepted":
      {
        (translated = "تایید شده"),
          (className = "label bg-gray-50 text-success-normal ");
      }
      break;
    case "editing":
      {
        (translated = "پیش نویس"),
          (className = "label text-secondary bg-gray-50");
      }
      break;
    case "pending":
      translated = "در انتظار تایید";
      if (state === "draft") {
        translated = "در انتظار تایید مدیر مخزن";
      } else if (state === "version") {
        translated = "در انتظار عمومی شدن";
      }
      break;
    case "rejected":
      translated = "رد شده";
      break;

    case "public":
      {
        (translated = "عمومی"), (className = "label text-info bg-gray-50");
      }
      break;
    default:
      translated = status;
  }
  return {
    translated,
    className: `${className} flex items-center justify-center h-6 !px-2 rounded-full`,
  };
};

export const toPersinaDigit = (digits: number | string): string => {
  const fa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return digits.toString().replaceAll(/\d/g, (w) => {
    return fa[+w];
  });
};

export const toEnglishDigit = (persianDigit: string): string => {
  return persianDigit.replaceAll(/[۰-۹]/g, (d) => {
    return "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString();
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

export const stripPemHeaders = (pem: string) => {
  return pem.replace(/-{5}BEGIN [ A-Z]+-{5}|-{5}END [ A-Z]+-{5}|\r?\n|\r/g, "");
};

export const addPemHeaders = (
  content: string,
  type: string = "CERTIFICATE"
) => {
  const header = `-----BEGIN ${type}-----\n`;
  const footer = `\n-----END ${type}-----`;
  const formattedContent = content.match(/.{1,64}/g)?.join("\n") || content; // Splits content into lines of 64 characters

  return `${header}${formattedContent}${footer}`;
};

export const mapOrder = (array: IRepo[], order: number[]) => {
  const inSortList = array.filter((repo) => {
    return order.includes(repo.id);
  });

  const notInSortList = array.filter((repo) => {
    return !order.includes(repo.id);
  });

  inSortList.sort((a, b) => {
    return order.indexOf(a.id) - order.indexOf(b.id);
  });

  return [...inSortList, ...notInSortList];
};

export const bracketStringify = (data: Record<string, any>): string => {
  const queryString = Object.keys(data)
    .map(key => {
      const value = data[key];
      if (Array.isArray(value)) {
        return value.map(item => 
{return `${encodeURIComponent(key)}[]=${encodeURIComponent(item)}`;}).join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");
  return queryString;
};
export const checkFormat = (fileExtension?: string) => {
  const extension = fileExtension?.toLowerCase();
  if (
    extension?.includes("png")
    || extension?.includes("jpeg")
    || extension?.includes("jpg")
    || extension?.includes("image")
    || extension?.includes("webp")
    || extension?.includes("jfif")
  ) {
    return "image";
  }
  if (
    extension?.includes("m4v")
    || extension?.includes("avi")
    || extension?.includes("mpg")
    || extension?.includes("mp4")
    || extension?.includes("ogg")
    || extension?.includes("mov")
  ) {
    return "video";
  }
  if (
    extension?.includes("m4a")
    || extension?.includes("flac")
    || extension?.includes("mp3")
    || extension?.includes("wav")
    || extension?.includes("wma")
    || extension?.includes("aac")
  ) {
    return "audio";
  }
  if (extension?.includes("pdf")) {
    return "pdf";
  }
};
export const fileSize = (size: number) => {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (
    `${+(size / 1024 ** i).toFixed(2) * 1
    } ${
      ["بایت", "کیلوبایت", "مگابایت", "گیگابایت", "ترابایت"][i]}`
  );
};
