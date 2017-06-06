import { Events } from '@storefront/core';
import Paging from '../../src/paging';
import suite from './_suite';

suite('Paging', ({ expect, spy }) => {
  let paging: Paging;

  beforeEach(() => paging = new Paging());

  describe('constructor()', () => {
    describe('state', () => {
      describe('firstPage()', () => {
        it('should call flux.switchPage() with state.first', () => {
          const switchPage = spy();
          const first = paging.state.first = <any>2;
          paging.flux = <any>{ switchPage };

          paging.state.firstPage();

          expect(switchPage).to.be.calledWith(first);
        });
      });

      describe('lastPage()', () => {
        it('should call flux.switchPage() with state.last', () => {
          const switchPage = spy();
          const last = paging.state.last = 4;
          paging.flux = <any>{ switchPage };

          paging.state.lastPage();

          expect(switchPage).to.be.calledWith(last);
        });
      });

      describe('prevPage()', () => {
        it('should call flux.switchPage() with state.previous', () => {
          const switchPage = spy();
          const previous = paging.state.previous = 3;
          paging.flux = <any>{ switchPage };

          paging.state.prevPage();

          expect(switchPage).to.be.calledWith(previous);
        });
      });

      describe('nextPage()', () => {
        it('should call flux.switchPage() with state.next', () => {
          const switchPage = spy();
          const next = paging.state.next = 10;
          paging.flux = <any>{ switchPage };

          paging.state.nextPage();

          expect(switchPage).to.be.calledWith(next);
        });
      });
    });
  });

  describe('init()', () => {
    it('should listen on PAGE_UPDATED event and call updatePage()', () => {
      const on = spy();
      paging.expose = () => null;
      paging.flux = <any>{ on };

      paging.init();

      expect(on).to.be.calledWith(Events.PAGE_UPDATED, paging.updatePage);
    });
  });

  describe('updatePage()', () => {
    it('should call set with updated values', () => {
      const page = <any>{
        sizes: {
          items: [10, 20, 30],
          selected: 0
        },
        current: 5,
        previous: 4,
        next: 6,
        last: 10,
        from: 41,
        to: 50
      };
      const set = paging.set = spy();
      paging.props = <any>{ limit: 5 };

      paging.updatePage(page);

      expect(set).to.be.calledWith({
        ...page,
        backDisabled: false,
        forwardDisabled: false,
        highOverflow: true,
        lowOverflow: true,
        limit: 5,
        range: [3, 4, 5, 6, 7]
      });
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

      expect(updateRange).to.eql([1, 2, 3]);
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

      expect(range).to.be.calledWith(1, limit);
    });

    it('should call range() when current page is close to lastPage', () => {
      const last = 10;
      const current = 8;
      const range = paging.range = spy();
      paging.props = <any>{ limit: 5 };

      paging.generateRange(last, current);

      expect(range).to.be.calledWith(6, 10);
    });

    it('should call range() when current page is in the middle', () => {
      const limit = 5;
      const last = 10;
      const current = 6;
      const range = paging.range = spy();
      paging.props = <any>{ limit };

      const updateRange = paging.generateRange(last, current);

      expect(range).to.be.calledWith(4, 8);
    });
  });

  describe('range()', () => {
    it('should return an array of numbers from low to high', () => {
      expect(paging.range(3, 10)).to.eql([3, 4, 5, 6, 7, 8, 9, 10]);
      expect(paging.range(2, 5)).to.eql([2, 3, 4, 5]);
      expect(paging.range(0, 1)).to.eql([0, 1]);
    });
  });
});
