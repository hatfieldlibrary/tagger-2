/**
 * Created by mspalti on 1/5/17.
 */

const findIn = (element, selector) => {
  return angular.element(element[0].querySelector(selector));
};
