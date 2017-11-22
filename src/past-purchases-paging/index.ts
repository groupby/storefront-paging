import { alias, configurable, tag, Events, Store, Tag } from '@storefront/core';
import { Paging } from '../';

@configurable
@alias('paging')
@tag('gb-past-purchases-paging', require('./index.html'))
class PastPaging extends Paging {

  state: Paging.State = {
    range: [],
    firstPage: () => this.actions.updatePastPurchaseCurrentPage(this.state.first),
    lastPage: () => this.actions.updatePastPurchaseCurrentPage(this.state.last),
    prevPage: () => this.actions.updatePastPurchaseCurrentPage(this.state.previous),
    nextPage: () => this.actions.updatePastPurchaseCurrentPage(this.state.next),
    switchPage: (page: number) => () => this.actions.updatePastPurchaseCurrentPage(page)
  };

  init() {
    this.flux.on(Events.PAST_PURCHASE_PAGE_UPDATED, this.updatePage);
  }
}

export default PastPaging;
