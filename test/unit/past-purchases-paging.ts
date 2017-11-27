import { Events } from '@storefront/core';
import PastPurchasesPaging from '../../src/past-purchases-paging';
import suite from './_suite';

suite('PastPurchasesPaging', ({ expect, spy}) => {
  let paging: PastPurchasesPaging;

  beforeEach(() => paging = new PastPurchasesPaging());

  describe('constructor()', () => {
    describe('state', () => {
      it('should have initial value', () => {
        expect(paging.state.range).to.eql([]);
      });

      describe('firstPage()', () => {
        it('should call actions.updatePastPurchaseCurrentPage() with state.first', () => {
          const updatePastPurchaseCurrentPage = spy();
          const first = paging.state.first = <any>2;
          paging.actions = <any>{ updatePastPurchaseCurrentPage };

          paging.state.firstPage();

          expect(updatePastPurchaseCurrentPage).to.be.calledWith(first);
        });
      });

      describe('lastPage()', () => {
        it('should call actions.updatePastPurchaseCurrentPage() with state.last', () => {
          const updatePastPurchaseCurrentPage = spy();
          const last = paging.state.last = 4;
          paging.actions = <any>{ updatePastPurchaseCurrentPage };

          paging.state.lastPage();

          expect(updatePastPurchaseCurrentPage).to.be.calledWith(last);
        });
      });

      describe('prevPage()', () => {
        it('should call actions.updatePastPurchaseCurrentPage() with state.previous', () => {
          const updatePastPurchaseCurrentPage = spy();
          const previous = paging.state.previous = 3;
          paging.actions = <any>{ updatePastPurchaseCurrentPage };

          paging.state.prevPage();

          expect(updatePastPurchaseCurrentPage).to.be.calledWith(previous);
        });
      });

      describe('nextPage()', () => {
        it('should call actions.updatePastPurchaseCurrentPage() with state.next', () => {
          const updatePastPurchaseCurrentPage = spy();
          const next = paging.state.next = 10;
          paging.actions = <any>{ updatePastPurchaseCurrentPage };

          paging.state.nextPage();

          expect(updatePastPurchaseCurrentPage).to.be.calledWith(next);
        });
      });

      describe('updatePastPurchaseCurrentPage()', () => {
        it('should return page-switching function', () => {
          const updatePastPurchaseCurrentPage = spy();
          const changePage = paging.state.switchPage(4);
          paging.actions = <any>{ updatePastPurchaseCurrentPage };

          expect(changePage).to.be.a('function');

          changePage();

          expect(updatePastPurchaseCurrentPage).to.be.calledWith(4);
        });
      });
    });
  });

  describe('init()', () => {
    it('should listen on PAST_PURCHASE_PAGE_UPDATED event and call updatePage()', () => {
      const on = spy();
      paging.expose = () => null;
      paging.flux = <any>{ on };

      paging.init();

      expect(on).to.be.calledWith(Events.PAST_PURCHASE_PAGE_UPDATED, paging.updatePage);
    });
  });
});
