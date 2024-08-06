import { isCustomIcon } from '../modeler/util';

describe('isCustomIcon', function () {
  it('empty string is not a custom icon', function () {
    const icon = '';
    expect(isCustomIcon(icon)).toBeFalse();
  });

  it('data URL with SVG payload is a custom icon', function () {
    const icon =
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjQ4cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjQ4cHgiIGZpbGw9IiMwMDAwMDAiPjxnPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iMjQiIHdpZHRoPSIyNCIvPjxwYXRoIGQ9Ik0xOSwzSDVDMy44OSwzLDMsMy45LDMsNXYxNGMwLDEuMSwwLjg5LDIsMiwyaDE0YzEuMSwwLDItMC45LDItMlY1QzIxLDMuOSwyMC4xMSwzLDE5LDN6IE0xOSwxOUg1VjdoMTRWMTl6IE0xNywxMkg3di0yIGgxMFYxMnogTTEzLDE2SDd2LTJoNlYxNnoiLz48L2c+PC9zdmc+';
    expect(isCustomIcon(icon)).toBeTrue();
  });

  it('data URL with PNG payload is a custom icon', function () {
    const icon =
      'data:image/png;base64,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';
    expect(isCustomIcon(icon)).toBeTrue();
  });

  it('SVG is not a custom icon', function () {
    const icon =
      '<svg viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
    expect(isCustomIcon(icon)).toBeFalse();
  });
});
