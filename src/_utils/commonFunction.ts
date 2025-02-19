import { SnackbarMessage, OptionsObject } from "notistack";
/**
 * Obfuscates a string by replacing all characters except the first two and last two with asterisks (*).
 *
 * If the input string is less than or equal to 4 characters long, the function will return the string unchanged.
 *
 * @param {string} input - The string to be obfuscated.
 * @returns {string} The obfuscated string with only the first two and last two characters visible.
 *
 * @example
 * // returns "ab****yz"
 * obfuscateString("abcdefghyz");
 *
 * @example
 * // returns "test"
 * obfuscateString("test"); // Strings with 4 or fewer characters are not obfuscated
 */
export const obfuscateString = (input: string): string => {
  if (input.length <= 4) {
    return input;
  }
  const firstTwo = input.slice(0, 2);
  const lastTwo = input.slice(-2);
  const obfuscatedPart = "*".repeat(input.length - 4);
  return firstTwo + obfuscatedPart + lastTwo;
};

/**
 * Copies the provided text to the clipboard using the Clipboard API.
 *
 * If the copy operation is successful, a toast notification is shown indicating success.
 * If the operation fails, a toast notification shows the error message.
 *
 * @param {string} text - The text to be copied to the clipboard.
 * @param {Function} [enqueueSnackbar] - Optional function to display a notification.
 * @returns {Promise<void>} A promise that resolves when the copy operation is complete.
 */
export const copyToClipboard = async (
  text: string,
  enqueueSnackbar?: (message: SnackbarMessage, options?: OptionsObject) => void
): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    if (enqueueSnackbar) {
      enqueueSnackbar("Copied to clipboard!", { variant: "info" });
    }
  } catch (err) {
    if (enqueueSnackbar) {
      enqueueSnackbar(`Failed to copy text: ${err}`, { variant: "error" });
    }
  }
};

/**
 * Calculates a future date by adding a specified number of days to the current date.
 *
 * @param {number} days - The number of days to add to the current date. Defaults to 365 if not provided.
 * @returns {Date} The calculated future date.
 */
export const daysCount = (days: number) => {
  const date = new Date();
  days = days || 365;
  date.setTime(+date + days * 86400000); // 24 * 60 * 60 * 1000
  return date;
};

/**
 * Converts an object into a query string, omitting keys with empty, null, or undefined values.
 *
 * @param {Record<string, string | number | boolean | null | undefined>} obj - The object to be converted.
 * @returns {string} The resulting query string.
 *
 * @example
 * // Returns "name=John&age=30&active=true"
 * objectToQueryString({ name: "John", age: 30, active: true, empty: null });
 */
export const objectToQueryString = (
  obj: Record<string, string | number | boolean | null | undefined>
): string => {
  const str: string[] = [];
  for (const data in obj) {
    if (obj.hasOwnProperty(data)) {
      if (obj[data] !== "" && obj[data] !== null && obj[data] !== undefined) {
        str.push(
          encodeURIComponent(data) + "=" + encodeURIComponent(String(obj[data]))
        );
      }
    }
  }
  return str.join("&");
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/[^\w\s-]/g, "") // Remove all non-word characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-"); // Replace multiple hyphens with a single one
};

export function fileToBase64(
  file: string | File | Blob | MediaSource
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Check if the input is a URL (string) or a File/Blob
    if (typeof file === "string" && file.startsWith("http")) {
      // If the file is a URL, fetch it and convert it to Base64
      fetch(file)
        .then((response) => response.blob()) // Convert response to Blob
        .then((blob) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(blob); // Read file as Data URL (Base64 encoded)
        })
        .catch((error) =>
          reject(new Error("Failed to fetch the URL: " + error.message))
        );
    } else if (file instanceof Blob) {
      // Handle Blob or File directly
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file); // Read file as Data URL (Base64 encoded)
    } else {
      reject(new Error("Provided input is not a valid file, blob, or URL"));
    }
  });
}

/**
 * Truncates a string to a specified length and appends "..." if the string exceeds that length.
 *
 * @param {string} str - The string to be truncated. Defaults to an empty string if not provided.
 * @param {number} num - The maximum length of the string. Defaults to 150 if not provided.
 * @returns {string} - The truncated string with "..." if it exceeds the specified length, or the original string if it doesn't.
 */
export const getShortContent = (str = "", num = 150): string => {
  const str_len = str?.length; // Get the length of the string
  if (str_len > num) {
    return str.substring(0, num) + "..."; // Truncate the string and append "..."
  }
  return str; // Return the original string if it's within the limit
};
/**
 * Utility function to get the start and end dates of the current month.
 *
 * @returns An object containing `startDate` and `endDate` in YYYY-MM-DD format.
 */
export const getMonthStartAndEndDates = (): {
  startDate: string;
  endDate: string;
} => {
  // Get the current date
  const now = new Date();

  // Calculate the first day of the current month
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);

  // Calculate the last day of the current month
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // Helper function to format a Date object as a string in YYYY-MM-DD format
  const formatDate = (date: Date): string => date.toISOString().split("T")[0];

  // Return the formatted start and end dates
  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
};
import moment from "moment";

/**
 * Formats a given date as "Today", "Tomorrow", or "MMM D, YYYY".
 * @param passDate - The date to format (string or Date).
 * @returns A string representing the formatted date.
 */
export function formatDate(passDate: string | Date): string {
  const today = moment().startOf("day");
  const givenDate = moment(passDate).startOf("day");

  const diffDays = givenDate.diff(today, "days");

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Tomorrow";
  } else {
    return givenDate.format("MMM D, YYYY");
  }
}

export const calculateDurationWithDate = (
  date: string,
  startTime: string,
  endTime: string
): string => {
  // Combine date with start and end times to create full Date objects
  const startDateTime = new Date(`${date}T${startTime}`);
  const endDateTime = new Date(`${date}T${endTime}`);

  // Calculate the difference in milliseconds
  const durationMs = endDateTime.getTime() - startDateTime.getTime();

  // Check if end time is before start time (this handles cases where the end time could be on the next day)
  if (durationMs < 0) {
    // Adjust for cases where the end time is past midnight
    const nextDay = new Date(startDateTime.getTime());
    nextDay.setDate(nextDay.getDate() + 1);
    return calculateDurationWithDate(
      nextDay.toISOString().split("T")[0],
      startTime,
      endTime
    );
  }

  // Convert the difference to hours and minutes
  const hours = Math.floor(durationMs / 1000 / 60 / 60);
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / 1000 / 60);

  // Return the duration as a string in the format "HH:MM"
  return `${hours}h ${minutes}m`;
};
export const timePassed = (
  date: string | number | Date,
  shortForm = false
): string => {
  const beforeDate = new Date(date).getTime();
  const nowTime = Date.now();
  const diff = nowTime - beforeDate;

  if (diff < 1000) return shortForm ? "now" : "just now";

  const intervals: { [key: string]: [number, string, string] } = {
    y: [31556926000, "yr", "year"],
    mo: [2629744000, "mo", "month"],
    w: [604800000, "wk", "week"],
    d: [86400000, "d", "day"],
    h: [3600000, "hr", "hour"],
    min: [60000, "min", "minute"],
  };

  for (const [key, [value, short, long]] of Object.entries(intervals)) {
    if (diff >= value) {
      const count = Math.floor(diff / value);
      return shortForm
        ? `${count} ${short}`
        : `${count} ${long} ${count > 1 ? "s" : ""} ago`;
    }
  }

  return shortForm ? "now" : "just now";
};
