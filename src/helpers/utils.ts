export const flatObject = (obj: Indexed) => {
  if (typeof obj !== 'object' || obj === null) {
    return {};
  }

  const result: Indexed = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(result, flatObject(obj[key]));
    } else {
      result[key] = obj[key];
    }
  });
  return result;
};

export const stringifyQuery = (data: Indexed<string>) => {
  if (typeof data !== 'object' || data === null) {
    return '';
  }
  
  const params = Object.entries(data).map(([key, value]) => `${key}=${value}`);
  return params.length ? `?${params.join('&')}` : '';
};

const mutateObject = (lhs: Indexed, rhs: Indexed): Indexed => {
  for (const property in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, property)) {
      continue;
    }

    try {
      if (rhs[property].constructor === Object) {
        rhs[property] = mutateObject(
          lhs[property] as Indexed,
          rhs[property] as Indexed
        );
      } else {
        lhs[property] = rhs[property];
      }
    } catch (e) {
      lhs[property] = rhs[property];
    }
  }

  return lhs;
};

export const changeObjectProperty = (
  obj: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown => {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );

  return mutateObject(obj, result);
};

export const isEqual = (lhs: any, rhs: any) => {
  if (typeof lhs !== typeof rhs) {
    return false;
  }

  if (typeof lhs !== 'object' || lhs === null || rhs === null) {
    return lhs === rhs;
  }

  if (Array.isArray(lhs) !== Array.isArray(rhs)) {
    return false;
  }

  const keysLhs = Object.keys(lhs);
  const keysRhs = Object.keys(rhs);

  if (keysLhs.length !== keysRhs.length) {
    return false;
  }

  for (const key of keysLhs) {
    if (!keysRhs.includes(key)) {
      return false;
    }

    if (!isEqual(lhs[key], rhs[key])) {
      return false;
    }
  }

  return true;
};
