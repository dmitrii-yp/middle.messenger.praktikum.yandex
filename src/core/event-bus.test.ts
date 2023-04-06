import sinon from 'sinon';
import { EventBus } from './event-bus';
import { expect } from 'chai';

let eventBus: EventBus;
const spy = sinon.spy();

beforeEach(() => {
  eventBus = new EventBus();
  spy.resetHistory();
});

describe('EventBus', () => {
  it('should register and fire events', () => {
    eventBus.on('test', spy);
    eventBus.emit('test');

    expect(spy.calledOnce).to.be.true;
  });

  it('should not fire event after its deletion', () => {
    eventBus.on('test', spy);
    eventBus.off('test', spy);
    eventBus.emit('test');

    expect(spy.calledOnce).to.be.false;
  });

  it('should not fire event after deletion of all events', () => {
    eventBus.on('test', spy);
    eventBus.deleteAllListeners();
    eventBus.emit('test');

    expect(spy.calledOnce).to.be.false;
  });
});
