import * as storefront from '@storefront/core';
import * as mock from 'mock-require';
import * as sinon from 'sinon';

sinon.stub(storefront, 'view');

mock('../src/pager/index.html', {});
mock('../src/pager/index.css', {});
mock('../src/pages/index.html', {});
mock('../src/pages/index.css', {});
mock('../src/paging/index.html', {});
mock('../src/paging/index.css', {});
mock('../src/terminal-pager/index.html', {});
mock('../src/terminal-pager/index.css', {});
