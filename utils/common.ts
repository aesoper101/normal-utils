export const isDate = (val: unknown): val is Date => val instanceof Date;
export const isFunction = (val: unknown): val is Function =>
  typeof val === "function";
export const isString = (val: unknown): val is string =>
  typeof val === "string";
export const isSymbol = (val: unknown): val is symbol =>
  typeof val === "symbol";
export const isBool = (val: unknown) => typeof val === "boolean";
export const isNumber = (val: unknown) => typeof val === "number";
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === "object";

export const objectToString = Object.prototype.toString;

export const toTypeString = (value: unknown): string =>
  objectToString.call(value);

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key);

export const isArray = Array.isArray;
export const isMap = (val: unknown): val is Map<any, any> =>
  toTypeString(val) === "[object Map]";
export const isSet = (val: unknown): val is Set<any> =>
  toTypeString(val) === "[object Set]";

export const toRawType = (value: unknown): string => {
  return toTypeString(value).slice(8, -1);
};

export const isHTMLElement = (val: unknown) =>
  toRawType(val).startsWith("HTML");
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

export const isNull = (val: unknown) => val === null;
export const isDef = (val: unknown) => val === undefined;

export const isEmpty = (val: unknown) => {
  return (
    (!val && val !== 0 && val !== "") ||
    (isArray(val) && !val.length) ||
    (isObject(val) && !Object.keys(val).length)
  );
};
