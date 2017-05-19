import * as pkg from '../../src';
import Pager from '../../src/pager';
import Pages from '../../src/pages';
import Paging from '../../src/paging';
import TerminalPager from '../../src/terminal-pager';
import suite from './_suite';

suite('package', ({ expect }) => {
  it('should expose Pager', () => {
    expect(pkg.Pager).to.eq(Pager);
  });

  it('should expose Pages', () => {
    expect(pkg.Pages).to.eq(Pages);
  });

  it('should expose Paging', () => {
    expect(pkg.Paging).to.eq(Paging);
  });

  it('should expose TerminalPager', () => {
    expect(pkg.TerminalPager).to.eq(TerminalPager);
  });
});
