import { view, Component, Events, Store } from '@storefront/core';

@view('gb-paging', require('./index.html'), require('./index.css'), [
  { name: 'showIcons', default: true },
  { name: 'showLabels', default: true },
  { name: 'numericLabels', type: 'boolean' },
  { name: 'labels', default: { first: 'First', next: 'Next', prev: 'Prev', last: 'Last' } },
  {
    name: 'icons', default: {
      // first: require('./double-arrow-left.png'),
      // next: require('./arrow-right.png'),
      // prev: require('./arrow-left.png'),
      // last: require('./double-arrow-right.png')
    }
  }
])
class Paging extends Component {

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

  updatePage = (page: Store.Page) =>
    this.set({
      ...this.props,
      ...page,
      backDisabled: page.current === 1,
      forwardDisabled: page.current === page.last,
      highOverflow: page.range[page.range.length - 1] !== page.last,
      lowOverflow: page.range[0] !== 1,
    })
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

    firstPage(): void;
    lastPage(): void;
    prevPage(): void;
    nextPage(): void;
  }
}

export default Paging;
