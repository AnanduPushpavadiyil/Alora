/**
 * Create an object composed of the picked object properties
 * @param {Record<string, any>} object - The source object
 * @param {Array<keyof T>} keys - An array of keys to pick from the object
 * @returns {Pick<T, keyof T>} - The object with the picked properties
 */
const pick = <T extends Record<string, unknown>>(
  object: T,
  keys: (keyof T)[]
): Partial<T> => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as Partial<T>);
};

export default pick;
