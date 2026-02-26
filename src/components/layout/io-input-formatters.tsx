export type FormatPattern = "#" | "X" | "MM" | "AA" | string;

export const formatValue = (value: string, format?: string): string => {
  if (value == null || value === "" || !format) return value || "";

  let formattedValue = "";
  let valueIndex = 0;

  for (let i = 0; i < format.length && valueIndex < value.length; i++) {
    const formatChar = format[i];
    const valueChar = value[valueIndex];

    if (i + 1 < format.length && formatChar === format[i + 1]) {
      const pattern = formatChar + format[i + 1];

      if (pattern === "MM") {
        const month = value.substr(valueIndex, 2);
        if (/^(0[1-9]|1[0-2])$/.test(month)) {
          formattedValue += month;
          valueIndex += 2;
        } else if (/^[0-1]$/.test(value[valueIndex])) {
          formattedValue += value[valueIndex];
          valueIndex++;
        } else {
          valueIndex++;
        }
        i++;
        continue;
      } else if (pattern === "AA") {
        const year = value.substr(valueIndex, 2);
        if (/^\d{2}$/.test(year)) {
          formattedValue += year;
          valueIndex += 2;
        } else if (/\d/.test(value[valueIndex])) {
          formattedValue += value[valueIndex];
          valueIndex++;
        }
        i++;
        continue;
      }
    }

    switch (formatChar) {
      case "#":
        if (/\d/.test(valueChar)) {
          formattedValue += valueChar;
          valueIndex++;
        } else {
          valueIndex++;
        }
        break;
      case "X":
        if (/[a-zA-Z0-9]/.test(valueChar)) {
          formattedValue += valueChar;
          valueIndex++;
        } else {
          valueIndex++;
        }
        break;
      default:
        formattedValue += formatChar;
        if (valueChar === formatChar) {
          valueIndex++;
        }
        break;
    }
  }

  return formattedValue;
};

export const unFormatValue = (value: string, format?: string): string => {
  if (!format) return value;

  let unformatted = "";
  let valueIndex = 0;

  for (let i = 0; i < format.length && valueIndex < value.length; i++) {
    const formatChar = format[i];
    const valueChar = value[valueIndex];

    if (i + 1 < format.length && formatChar === format[i + 1]) {
      const pattern = formatChar + format[i + 1];

      if (pattern === "MM" || pattern === "AA") {
        if (/\d/.test(valueChar)) {
          unformatted += valueChar;
          if (
            valueIndex + 1 < value.length &&
            /\d/.test(value[valueIndex + 1])
          ) {
            unformatted += value[valueIndex + 1];
          }
          valueIndex += 2;
        } else {
          valueIndex++;
        }
        i++;
        continue;
      }
    }

    switch (formatChar) {
      case "#":
      case "X":
        if (/[a-zA-Z0-9]/.test(valueChar)) {
          unformatted += valueChar;
          valueIndex++;
        } else if (valueChar === formatChar) {
          valueIndex++;
        }
        break;
      default:
        if (valueChar === formatChar) {
          valueIndex++;
        }
        break;
    }
  }

  return unformatted;
};

export const getMaxLength = (format?: string): number => {
  if (!format) return 0;

  let length = 0;
  let i = 0;

  while (i < format.length) {
    const char = format[i];

    if (char === "#" || char === "X") {
      length++;
      i++;
    } else if (char === "M" || char === "A") {
      if (i + 1 < format.length && format[i + 1] === char) {
        length += 2;
        i += 2;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }

  return length;
};

export const validateFormat = (format?: string): boolean => {
  if (!format) return true;
  // Adicione validações específicas se necessário
  return true;
};
