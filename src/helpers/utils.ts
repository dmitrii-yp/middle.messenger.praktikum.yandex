export const flatObject = (obj: Record<string, any>) => {
  const result: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(result, flatObject(obj[key]));
    } else {
      result[key] = obj[key];
    }
  });
  return result;
};
