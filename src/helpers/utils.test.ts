import {
  changeObjectProperty,
  flatObject,
  stringifyQuery,
  isEqual,
} from './utils';
import { expect } from 'chai';

describe('ChangeObjectProperty helper', () => {
  let obj = {};
  const path = 'a.b.c';
  const value = 'test';

  beforeEach(() => {
    obj = {};
  });

  it('it should set a value by keypath', () => {
    const result = changeObjectProperty(obj, path, value) as Indexed;

    expect(result.a.b.c).to.eq(value);
  });

  it('it should return passed object parameter if it is not an object', () => {
    const notObj = 'string';

    const result = changeObjectProperty(notObj, path, value);

    expect(result).to.eq(notObj);
  });

  it('it should throw an Error if passed path parameter is not a string', () => {
    const path = 1;

    // @ts-ignore
    const result = () => changeObjectProperty({}, path, value);

    expect(result).to.throw(Error);
  });

  it('it should mutate past object without creating a new one', () => {
    // @ts-ignore
    changeObjectProperty(obj, path, value) as Indexed;

    expect(obj).to.haveOwnProperty('a');
  });
});

describe('flatObject helper', () => {
  it('it should return an empty object if passed object is empty', () => {
    const obj = {};

    const result = flatObject(obj);

    expect(result).to.deep.eq({});
  });

  it('it should return an empty object if passed object is not an object', () => {
    const obj = 'string';
    //@ts-ignore
    const result = flatObject(obj);

    expect(result).to.deep.eq({});
  });

  it('it should return an empty object if passed object is null', () => {
    const obj = null;
    //@ts-ignore

    const result = flatObject(obj);

    expect(result).to.deep.eq({});
  });

  it('it should return an empty object if passed object is undefined', () => {
    const obj = undefined;
    //@ts-ignore

    const result = flatObject(obj);

    expect(result).to.deep.eq({});
  });

  it('it should return a flat object if passed object is not empty', () => {
    const obj = {
      a: {
        b: {
          c: 'test',
        },
      },
      d: {
        e: 'test',
      },
    };

    const result = flatObject(obj);

    expect(result).to.deep.eq({ c: 'test', e: 'test' });
  });
});

describe('stringifyQuery helper', () => {
  //Write test for stringifyQuery helper

  it('it should return an empty string if passed object is empty', () => {
    const obj = {};

    const result = stringifyQuery(obj);

    expect(result).to.eq('');
  });

  it('it should return an empty string if passed object is not an object', () => {
    const obj = 'string';
    //@ts-ignore
    const result = stringifyQuery(obj);

    expect(result).to.eq('');
  });

  it('it should return an empty string if passed object is null', () => {
    const obj = null;
    //@ts-ignore

    const result = stringifyQuery(obj);

    expect(result).to.eq('');
  });

  it('it should return an empty string if passed object is undefined', () => {
    const obj = undefined;
    //@ts-ignore

    const result = stringifyQuery(obj);

    expect(result).to.eq('');
  });

  it('it should return a query string if passed object is not empty', () => {
    const obj = {
      a: 'test',
      b: 'test',
    };

    const result = stringifyQuery(obj);

    expect(result).to.eq('?a=test&b=test');
  });
});

// Write test for isEqual helper
describe('isEqual helper', () => {
  const obj1 = {
    a: 'test',
    b: {
      c: 'test',
    },
  };

  const obj2 = {
    a: 'test',
    b: {
      c: 'test',
    },
  };

  const obj3 = {
    a: 'test',
    b: 'test',
    c: 'test',
  };

  it('it should return true if passed objects are equal', () => {
    const result = isEqual(obj1, obj2);

    expect(result).to.eq(true);
  });

  it('it should return false if passed objects are not equal', () => {
    const result = isEqual(obj1, obj3);

    expect(result).to.eq(false);
  });

  it('it should return false if type of parameters mismatch', () => {
    const result = isEqual(obj1, 'test');

    expect(result).to.eq(false);
  });

  it('it should return false if any parameter is null', () => {
    const result = isEqual(obj1, null);

    expect(result).to.eq(false);
  });
});
