import { changeObjectProperty } from './utils';
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
    const result = changeObjectProperty(obj, path, value) as Indexed;

    expect(obj).to.haveOwnProperty('a');
  });
});
