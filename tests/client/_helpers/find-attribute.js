/**
 * Created by mspalti on 1/5/17.
 */

'use strict';

const findIn = (element, selector) => {
  return angular.element(element[0].querySelector(selector));
};
