function isEqual(lhs: any, rhs: any): boolean {
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
}

const rhs = {
  a: 1,
  b: {
    c: 1,
    d: 2,
  },
};
const lhs = {
  a: `1`,
  b: {
    c: 1,
    d: 3,
  },
};

console.log(isEqual(lhs, rhs));
