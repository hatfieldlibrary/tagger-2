/**
 * Created by mspalti on 1/5/17.
 */

describe('Area Main Component', () => {

  let parentScope;
  let element;
  const scheduler = new Rx.TestScheduler();


  beforeEach(angular.mock.module('tagger'));

  // 1:
  beforeEach(inject(($compile, $rootScope) => {

    // 2:
    parentScope = $rootScope.$new();
    //parentScope.someAttr = 'SOME_VALUE';

    // 3:
    element = angular.element(`<areas-component"></areas-component>`);
    $compile(element)(parentScope);

    // 4:
    parentScope.$digest();



  }));

  it('displays initial value of some attr', () => {

    // 5:
    const someAttrValue = findIn(element, '.js-test-areas').text();
    expect(someAttrValue).toEqual('SOME_VALUE');

  });

  it('displays changed value of some attr', () => {

    // 6:
    parentScope.someAttr = 'CHANGED_VALUE';
    parentScope.$digest();

    const someAttrValue = findIn(element, '.js-test-areas').text();
    expect(someAttrValue).toEqual('CHANGED_VALUE');

  });
});
