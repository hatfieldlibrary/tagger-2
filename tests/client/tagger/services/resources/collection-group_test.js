/*
 * Copyright (c) 2017.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Created by mspalti on 2/2/17.
 */
'use strict';

/*jshint expr: true*/

describe('collection group resources', () => {

  let $httpBackend,
    $rootScope,
    Category,
    CategoryForCollection,
    CategoryList,
    CategoryByArea,
    CategoryCountByArea,
    CategoryUpdate,
    CategoryAdd,
    CategoryDelete,
    testCategoryName,
    config;

  beforeEach(module('tagger'));

  beforeEach(inject((_$httpBackend_,
                     _$rootScope_,
                     _Category_,
                     _CategoryForCollection_,
                     _CategoryList_,
                     _CategoryByArea_,
                     _CategoryCountByArea_,
                     _CategoryUpdate_,
                     _CategoryAdd_,
                     _CategoryDelete_,
                     _config_) => {

    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    Category = _Category_;
    CategoryForCollection = _CategoryForCollection_;
    CategoryList = _CategoryList_;
    CategoryByArea = _CategoryByArea_;
    CategoryCountByArea = _CategoryCountByArea_;
    CategoryUpdate = _CategoryUpdate_;
    CategoryAdd = _CategoryAdd_;
    CategoryDelete = _CategoryDelete_;
    config = _config_;

  }));

  beforeEach(() => {
    testCategoryName = 'test category';
  });

  it('should request category by id.', () => {

    $httpBackend.expectGET(config.restHost + 't/category/byId/1').respond({title: testCategoryName});
    let result = Category.query({id: 1});
    $httpBackend.flush();
    expect(result.title).toEqual(testCategoryName);

  });

  it('should request category for collection.', () => {

    $httpBackend.expectGET(config.restHost + 't/category/getCollections/1').respond([{title: testCategoryName}]);
    let result = CategoryForCollection.query({collId: 1});
    $httpBackend.flush();
    expect(result[0].title).toEqual(testCategoryName);
    // Added for documentation purposes.  The data model permits
    // multiple collection categories for a collection, but in practice
    // the number is restricted to one category per collection.
    expect(result.length).toBe(1);

  });

  it('should list of all categories.', () => {

    $httpBackend.expectGET(config.restHost +  't/category/show/list').respond([{title: testCategoryName}]);
    let result = CategoryList.query();
    $httpBackend.flush();
    expect(result[0].title).toEqual(testCategoryName);

  });


  it('should request categories assigned to an area.', () => {

    $httpBackend.expectGET(config.restHost + 't/category/byArea/1').respond([{title: testCategoryName}]);
    let result = CategoryByArea.query({areaId: 1});
    $httpBackend.flush();
    expect(result[0].title).toEqual(testCategoryName);

  });

  it('should request category counts for an area.', () => {

    $httpBackend.expectGET(config.restHost + 't/category/count/1').respond([{title: testCategoryName, count: 1}]);
    let result = CategoryCountByArea.query({areaId: 1});
    $httpBackend.flush();
    expect(result[0].title).toEqual(testCategoryName);

  });


  it('should delete category.', () =>{
    let message = {id: 1};
    $httpBackend.expectPOST(config.restHost + 't/category/delete', message).respond({status: 'success'});
    let result = CategoryDelete.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
  });

  it('should add category.', () =>{
    let message = {title: 'new category'};
    $httpBackend.expectPOST(config.restHost + 't/category/add', message).respond({status: 'success'});
    let result = CategoryAdd.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
  });

  it('should update category.', () =>{
    let message = {

      title: 'update category',
      url:'',
      description:'',
      linkLabel: '',
      id: 1,
      areaId: 1

    };
    $httpBackend.expectPOST(config.restHost + 't/category/update', message).respond({status: 'success'});
    let result = CategoryUpdate.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
  });



});
