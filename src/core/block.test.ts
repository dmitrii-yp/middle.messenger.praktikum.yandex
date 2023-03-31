import sinon from 'sinon';
import { expect } from 'chai';
import type BlockType from './block';
import proxyquire from 'proxyquire';

const eventBusMock = {
  on: sinon.stub(),
  emit: sinon.stub(),
};

const { default: Block } = proxyquire('./block', {
  './event-bus': {
    EventBus: class {
      on = eventBusMock.on;
      emit = eventBusMock.emit;
    },
  },
}) as { default: typeof BlockType };

describe('Block', () => {
  beforeEach(() => {
    eventBusMock.on.reset();
    eventBusMock.emit.reset();
  });

  class ComponentMock extends Block {}

  it('should fire init event on initialization', () => {
    new ComponentMock();

    expect(eventBusMock.emit.calledOnceWithExactly('init')).to.be.true;
  });

  // it('should fire protected componentDidMount on component-did-mount-dispatch', () => {
  //   let isCalled = false;

  //   class ComponentMock extends Block {
  //     componentDidMount() {
  //       isCalled = true;
  //     }
  //   }

  //   const component = new ComponentMock();

  //   component.dispatchEvent('component-did-mount');
  // });
});
