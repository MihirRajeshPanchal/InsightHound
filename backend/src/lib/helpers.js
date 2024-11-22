export function parseBody(body, entityAttributes) {
  const parsedBody = {};
  entityAttributes.forEach((attribute) => {
    const { name, type } = attribute;
    const value = body[name];
    if (value === undefined || value === null) return;
    switch (type) {
      case "string":
        parsedBody[name] = String(value);
        break;
      case "number":
        parsedBody[name] = Number(value);
        if (isNaN(parsedBody[name])) {
          throw new Error(`Invalid number for field "${name}"`);
        }
        break;
      case "boolean":
        if (value === "true" || value === true) {
          parsedBody[name] = true;
        } else if (value === "false" || value === false) {
          parsedBody[name] = false;
        } else {
          throw new Error(`Invalid boolean for field "${name}"`);
        }
        break;
      case "Date":
        const dateValue = new Date(value);
        if (isNaN(dateValue.getTime())) {
          throw new Error(`Invalid date for field "${name}"`);
        }
        parsedBody[name] = dateValue;
        break;
      case "string[]":
        if (Array.isArray(value)) {
          parsedBody[name] = value.map((val) => String(val));
        } else {
          throw new Error(`Invalid array of strings for field "${name}"`);
        }
        break;
      case "number[]":
        if (Array.isArray(value)) {
          parsedBody[name] = value.map((val) => {
            const numVal = Number(val);
            if (isNaN(numVal)) {
              throw new Error(`Invalid number in array for field "${name}"`);
            }
            return numVal;
          });
        } else {
          throw new Error(`Invalid array of numbers for field "${name}"`);
        }
        break;
      case "boolean[]":
        if (Array.isArray(value)) {
          parsedBody[name] = value.map((val) => {
            if (val === "true" || val === true) return true;
            if (val === "false" || val === false) return false;
            throw new Error(`Invalid boolean in array for field "${name}"`);
          });
        } else {
          throw new Error(`Invalid array of booleans for field "${name}"`);
        }
        break;
      case "Date[]":
        if (Array.isArray(value)) {
          parsedBody[name] = value.map((val) => {
            const dateArrayValue = new Date(val);
            if (isNaN(dateArrayValue.getTime())) {
              throw new Error(`Invalid date in array for field "${name}"`);
            }
            return dateArrayValue;
          });
        } else {
          throw new Error(`Invalid array of dates for field "${name}"`);
        }
        break;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  });
  return parsedBody;
}
