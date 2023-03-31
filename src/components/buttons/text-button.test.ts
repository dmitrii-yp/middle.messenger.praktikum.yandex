import Router from '../../core/router';
import sinon from 'sinon';
import { expect } from 'chai';
import { TextButtonBase } from './text-button';

describe('TextButton', () => {
  const label = 'test';
  const href = '/';
  const red = false;
  const router = {} as typeof Router;
  const callback = sinon.stub<[string]>();

  beforeEach(() => {
    callback.reset();
  });

  it('should render without errors', () => {
    new TextButtonBase({
      label,
      href,
      red,
      router,
    });
  });

  it('should have label', () => {
    const button = new TextButtonBase({
      label,
      href,
      red,
      router,
    });

    expect(button.element?.textContent).to.eq(label);
  });

  it('should call router.go with passed route on click', () => {
    const button = new TextButtonBase({
      label,
      href,
      red,
      router: { go: callback } as unknown as typeof Router,
    });

    button.element?.click();

    expect(callback.calledWith(href)).to.eq(true);
  });
});
