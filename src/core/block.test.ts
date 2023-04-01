import sinon from 'sinon';
import type BlockType from './block';
import proxyquire from 'proxyquire';
import { expect } from 'chai';

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

  it('should have a 6-character id', () => {
    const component = new ComponentMock();

    expect(component.id).to.have.lengthOf(6);
  });
});
