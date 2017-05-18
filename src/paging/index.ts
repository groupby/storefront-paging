import { view, Component, Events, Store } from '@storefront/core';

@view('gb-paging', require('./index.html'), require('./index.css'), [
  { name: 'showIcons', default: true },
  { name: 'showLabels', default: true },
  { name: 'numericLabels', type: 'boolean' },
  { name: 'labels', default: { first: 'First', next: 'Next', prev: 'Prev', last: 'Last' } },
  { name: 'limit', default: 5 },
  {
    name: 'icons', default: {
      // first: require('./double-arrow-left.png'),
      // next: require('./arrow-right.png'),
      // prev: require('./arrow-left.png'),
      // last: require('./double-arrow-right.png')
    },
  }
])
class Paging extends Component {

  props: Paging.Props;
  state: Partial<Paging.State> = {
    firstPage: () => this.flux.switchPage(this.state.first),
    lastPage: () => this.flux.switchPage(this.state.last),
    prevPage: () => this.flux.switchPage(this.state.previous),
    nextPage: () => this.flux.switchPage(this.state.next),
  };

  constructor() {
    super();
    this.expose('paging');
    this.flux.on(Events.PAGE_UPDATED, this.updatePage);
  }

  updatePage = (page: Store.Page) => {
      this.set({
      ...this.props,
      ...page,
      backDisabled: page.previous === null,
      forwardDisabled: page.next === null,
      highOverflow: page.range[page.range.length - 1] !== page.last,
      lowOverflow: page.range[0] !== 1,
      range: this.updateRange(page.current),
    })
  }

  updateRange(current: number) {
    console.log('-------- updatin range ---------');
    console.log(this.props.limit);
    console.log(this);
    const limit = this.props.limit;
    return [1,2, 3, 4, 5];
  }
}

namespace Paging {
  export interface Props {
    showIcons?: boolean;
    showLabels?: boolean;
    numericLabels?: boolean;
    labels?: {
      first?: string;
      last?: string;
      prev?: string;
      next?: string;
    };
    limit: number;
    icons?: {
      first?: string;
      last?: string;
      prev?: string;
      next?: string;
    };
  }

  export interface State extends Store.Page, Props {
    highOverflow?: boolean;
    lowOverflow?: boolean;
    backDisabled?: boolean;
    forwardDisabled?: boolean;
    range: number[];

    firstPage(): void;
    lastPage(): void;
    prevPage(): void;
    nextPage(): void;
  }
}

export default Paging;
