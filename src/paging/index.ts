import { alias, configurable, tag, Events, Selectors, Store, StoreSections, Tag } from '@storefront/core';

@configurable
@alias('paging')
@tag('gb-paging', require('./index.html'))
class Paging {

  searchActions: Paging.Actions = {
    firstPage: () => this.actions.updateCurrentPage(this.state.first),
    lastPage: () => this.actions.updateCurrentPage(this.state.last),
    prevPage: () => this.actions.updateCurrentPage(this.state.previous),
    nextPage: () => this.actions.updateCurrentPage(this.state.next),
    switchPage: (page: number) => () => this.actions.updateCurrentPage(page)
  };

  pastPurchaseActions: Paging.Actions = {
    firstPage: () => this.actions.updatePastPurchaseCurrentPage(this.state.first),
    lastPage: () => this.actions.updatePastPurchaseCurrentPage(this.state.last),
    prevPage: () => this.actions.updatePastPurchaseCurrentPage(this.state.previous),
    nextPage: () => this.actions.updatePastPurchaseCurrentPage(this.state.next),
    switchPage: (page: number) => () => this.actions.updatePastPurchaseCurrentPage(page)
  };

  props: Paging.Props = {
    showIcons: true,
    showLabels: true,
    numericLabels: false,
    labels: { first: 'First', next: 'Next', prev: 'Prev', last: 'Last' },
    limit: 5,
    icons: {}
  };
  state: Paging.State = {
    range: [],
    firstPage: () => null,
    lastPage: () => null,
    prevPage: () => null,
    nextPage: () => null,
    switchPage: () => () => null,
  };

  init() {
    switch (this.props.storeSection) {
      case StoreSections.SEARCH:
        this.updatePage(this.select(Selectors.pageObject));
        this.flux.on(Events.PAGE_UPDATED, this.updatePage);
        this.set(this.searchActions);
        break;
      case StoreSections.PAST_PURCHASES:
        this.updatePage(this.select(Selectors.pastPurchasePageObject));
        this.flux.on(Events.PAST_PURCHASE_PAGE_UPDATED, this.updatePage);
        this.set(this.pastPurchaseActions);
        break;
    }
  }

  updatePage = (page: Store.Page) => {
    const range = this.generateRange(page.last, page.current);
    this.set({
      ...this.props,
      ...page,
      range,
      backDisabled: page.previous === null,
      forwardDisabled: page.next === null,
      highOverflow: range[range.length - 1] !== page.last,
      lowOverflow: range[0] !== 1,
    });
  }

  generateRange(lastPage: number, current: number) {
    const limit = this.props.limit;
    const last = Math.min(lastPage, limit);
    const border = Math.floor(limit / 2);
    if (current <= border) {
      return this.range(1, last);
    } else if (current >= lastPage - border) {
      return this.range(lastPage - last + 1, lastPage);
    } else {
      return this.range(current - border, current + border);
    }
  }

  range(low: number, high: number) {
    const arr = [];
    for (let i = low; i < high + 1; i++) {
      arr.push(i);
    }
    return arr;
  }
}

interface Paging extends Tag<Paging.Props, Paging.State> { }
namespace Paging {
  export interface Props extends Tag.Props {
    showIcons?: boolean;
    showLabels?: boolean;
    numericLabels?: boolean;
    labels?: {
      first?: string;
      last?: string;
      prev?: string;
      next?: string;
    };
    limit?: number;
    icons?: {
      first?: string;
      last?: string;
      prev?: string;
      next?: string;
    };
  }

  export interface Actions {
    firstPage(): void;
    lastPage(): void;
    prevPage(): void;
    nextPage(): void;
    switchPage(page: number): () => void;
  }

  export interface State extends Partial<Store.Page>, Props, Actions {
    highOverflow?: boolean;
    lowOverflow?: boolean;
    backDisabled?: boolean;
    forwardDisabled?: boolean;
    range: number[];

  }
}

export default Paging;
