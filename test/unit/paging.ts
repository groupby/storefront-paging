import { Component, Events } from '@storefront/core';
import Paging from '../../src/paging';
import suite from './_suite';

suite('Paging', ({ expect, spy }) => {

  describe('state', () => {
    let paging: Paging;

    beforeEach(() => {
      Component.prototype.expose = () => null;
      Component.prototype.flux = <any>{ on: () => null };

      paging = new Paging();
    });

    describe('firstPage()', () => {
      it('should call flux.switchPage() with state.first', () => {
        const switchPage = paging.flux.switchPage = spy();
        const first = paging.state.first = <any>2;

        paging.state.firstPage();

        expect(switchPage.calledWith(paging.state.first)).to.be.true;
      });
    });

    describe('lastPage()', () => {
      it('should call flux.switchPage() with state.last', () => {
        const switchPage = paging.flux.switchPage = spy();
        const last = paging.state.last = 4;

        paging.state.lastPage();

        expect(switchPage.calledWith(last)).to.be.true;
      });
    });

    describe('prevPage()', () => {
      it('should call flux.switchPage() with state.previous', () => {
        const switchPage = paging.flux.switchPage = spy();
        const previous = paging.state.previous = 3;

        paging.state.prevPage();

        expect(switchPage.calledWith(previous)).to.be.true;
      });
    });

    describe('nextPage()', () => {
      it('should call flux.switchPage() with state.next', () => {
        const switchPage = paging.flux.switchPage = spy();
        const next = paging.state.next = 10;

        paging.state.nextPage();

        expect(switchPage.calledWith(next)).to.be.true;
      });
    });
  });

  describe('constructor()', () => {
    afterEach(() => delete Component.prototype.expose);

    it('should call expose()', () => {
      const expose = Component.prototype.expose = spy();
      Component.prototype.flux = <any>{ on: () => null };

      new Paging();

      expect(expose.calledWith('paging')).to.be.true;
    });

    it('should listen on PAGE_UPDATED event and call updatePage()', () => {
      const on = spy();
      Component.prototype.expose = () => null;
      Component.prototype.flux = <any>{ on };
      const paging = new Paging();

      expect(on.calledWith(Events.PAGE_UPDATED, paging.updatePage)).to.be.true;
    });
  });

  let paging: Paging;

  beforeEach(() => {
    Component.prototype.expose = () => null;
    Component.prototype.flux = <any>{ on: () => null };

    paging = new Paging();
  });

  describe('updatePage()', () => {
    it('should call set with updated values', () => {
      const page = <any>{
        sizes: {
          items: [10, 20, 30],
          selected: 0
        },
        current: 5,
        limit: 5,
        previous: 4,
        next: 6,
        last: 10,
        from: 41,
        to: 50,
        range: [1, 2, 3, 4, 5]
      };
      const set = paging.set = spy();
      paging.props = <any>{ limit: page.limit };

      paging.updatePage(page);

      expect(set.calledWith({
        ...page,
        backDisabled: false,
        forwardDisabled: false,
        highOverflow: true,
        lowOverflow: false,
        range: [3, 4, 5, 6, 7]
      })).to.be.true;
    });
  });

  describe('updateRange()', () => {
    // TODO: move to integration tests
    it('should return correct range when current page is close to firstPage', () => {
      const limit = 3;
      const last = 10;
      const current = 1;
      paging.props = <any>{ limit };

      const updateRange = paging.generateRange(last, current);

      expect(updateRange).to.eql([1,2,3]);
    });
    // TODO: move to integration tests
    it('should return correct range when current page is close to lastPage', () => {
      const limit = 5;
      const last = 10;
      const current = 8;
      paging.props = <any>{ limit };

      const updateRange = paging.generateRange(last, current);

      expect(updateRange).to.eql([6, 7, 8, 9, 10]);
    });
    // TODO: move to integration tests
    it('should return correct range when current page is in the middle', () => {
      const limit = 5;
      const last = 10;
      const current = 6;
      paging.props = <any>{ limit };

      const updateRange = paging.generateRange(last, current);

      expect(updateRange).to.eql([4, 5, 6, 7, 8]);
    });

    it('should call range() when current page is close to firstPage', () => {
      const limit = 3;
      const last = 10;
      const current = 1;
      const range = paging.range = spy();
      paging.props = <any>{ limit };

      paging.generateRange(last, current);

      expect(range.calledWith(1, limit)).to.be.true;
    });

    it('should call range() when current page is close to lastPage', () => {
      const last = 10;
      const current = 8;
      const range = paging.range = spy();
      paging.props = <any>{ limit: 5 };

      paging.generateRange(last, current);

      expect(range.calledWith(6, 10)).to.be.true;
    });

    it('should call range() when current page is in the middle', () => {
      const limit = 5;
      const last = 10;
      const current = 6;
      const range = paging.range = spy();
      paging.props = <any>{ limit };

      const updateRange = paging.generateRange(last, current);

      expect(range.calledWith(4, 8)).to.be.true;
    });
  });

  describe('range()', () => {
    it('should return an array of numbers from low to high', () => {
      expect(paging.range(3, 10)).to.eql([3,4,5,6,7,8,9,10]);
      expect(paging.range(2, 5)).to.eql([2,3,4,5]);
      expect(paging.range(0, 1)).to.eql([0,1]);
    });
  });
});
