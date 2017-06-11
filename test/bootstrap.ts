import * as chai from 'chai';
import * as mock from 'mock-require';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);

mock('../src/pager/index.html', {});
mock('../src/pages/index.html', {});
mock('../src/pages/index.css', {});
mock('../src/paging/index.html', {});
mock('../src/terminal-pager/index.html', {});
