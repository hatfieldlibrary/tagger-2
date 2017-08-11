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

describe('Collection resources', () => {

  let $httpBackend,
    $rootScope,
    FirstCollectionInArea,
    UpdatePublicationStatus,
    GetPublicationStatus,
    CollectionsByArea,
    CollectionById,
    CollectionAdd,
    CollectionDelete,
    CollectionUpdate,
    AreasForCollection,
    TagsForCollection,
    TypesForCollection,
    AreaTargetAdd,
    AreaTargetRemove,
    CollectionTagTargetAdd,
    CollectionTagTargetRemove,
    CollectionTypeTargetRemove,
    CollectionTypeTargetAdd,
    config;

  beforeEach(module('tagger'));

  beforeEach(inject((_$httpBackend_,
                     _$rootScope_,
                     _FirstCollectionInArea_,
                     _UpdatePublicationStatus_,
                     _GetPublicationStatus_,
                     _CollectionsByArea_,
                     _CollectionById_,
                     _CollectionAdd_,
                     _CollectionUpdate_,
                     _CollectionDelete_,
                     _AreasForCollection_,
                     _TagsForCollection_,
                     _TypesForCollection_,
                     _AreaTargetAdd_,
                     _AreaTargetRemove_,
                     _CollectionTagTargetAdd_,
                     _CollectionTagTargetRemove_,
                     _CollectionTypeTargetRemove_,
                     _CollectionTypeTargetAdd_,
                     _config_) => {

    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    FirstCollectionInArea = _FirstCollectionInArea_;
    UpdatePublicationStatus = _UpdatePublicationStatus_;
    GetPublicationStatus = _GetPublicationStatus_;
    CollectionById = _CollectionById_;
    CollectionsByArea = _CollectionsByArea_;
    CollectionAdd = _CollectionAdd_;
    CollectionDelete = _CollectionDelete_;
    CollectionUpdate = _CollectionUpdate_;
    AreasForCollection = _AreasForCollection_;
    TagsForCollection = _TagsForCollection_;
    TypesForCollection = _TypesForCollection_;
    AreaTargetAdd = _AreaTargetAdd_;
    AreaTargetRemove = _AreaTargetRemove_;
    CollectionTagTargetAdd = _CollectionTagTargetAdd_;
    CollectionTagTargetRemove = _CollectionTagTargetRemove_;
    CollectionTypeTargetRemove = _CollectionTypeTargetRemove_;
    CollectionTypeTargetAdd = _CollectionTypeTargetAdd_;
    config = _config_;

  }));

  it('should request first collection in the area.', () => {

    $httpBackend.expectGET(config.restHost + 't/collection/first/inArea/2').respond({title: 'test collection'});
    let result = FirstCollectionInArea.query({areaId: 2});
    $httpBackend.flush();
    expect(result.title).toEqual('test collection');

  });

  it('should request update of publication status.', () => {

    $httpBackend.expectGET(config.restHost + 't/collection/1/pubstatus/true').respond({status: 'success'});
    let result = UpdatePublicationStatus.query({collId: 1, status: true});
    $httpBackend.flush();
    expect(result.status).toEqual('success');

  });

  it('should request the publication status for the collection.', () => {

    $httpBackend.expectGET(config.restHost + 't/collection/1/pubstatus').respond({published: true});
    let result = GetPublicationStatus.query({collId: 1});
    $httpBackend.flush();
    expect(result.published).toEqual(true);

  });

  it('should request the collections in an area.', () => {

    $httpBackend.expectGET(config.restHost + 't/collection/area/1').respond([{title: 'test collection'}]);
    let result = CollectionsByArea.query({areaId: 1});
    $httpBackend.flush();
    expect(result[0].title).toEqual('test collection');

  });

  it('should request collection by id.', () => {

    $httpBackend.expectGET(config.restHost + 't/collection/id/1').respond({title: 'test collection'});
    let result = CollectionById.query({id: 1});
    $httpBackend.flush();
    expect(result.title).toEqual('test collection');

  });


  it('should request adding collection.', () => {
    let message = {
      title: 'new collection'
    };
    let response = {
      status: 'success',
      id: 1,
      collections: [{}]
    };
    $httpBackend.expectPOST(config.restHost + 't/collection/add', message).respond(response);
    let result = CollectionAdd.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
    expect(result.collections.length).toBe(1);
  });

  it('should request deletion of collection.', () => {
    let message = {
      id: 1
    };
    let response = {
      status: 'success'
    };
    $httpBackend.expectPOST(config.restHost + 't/collection/delete', message).respond(response);
    let result = CollectionDelete.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');

  });

  it('should request update of collection.', () => {
    let message = {
      id: 1,
      title: 'updated collection'
    };
    let response = {
      status: 'success'
    };
    $httpBackend.expectPOST(config.restHost + 't/collection/update', message).respond(response);
    let result = CollectionUpdate.save(message);
    $httpBackend.flush();
    expect(result.status).toEqual('success');
  });

  it('should request areas for collection.', () => {

    $httpBackend.expectGET(config.restHost + 't/collection/areas/1').respond([{title: 'test area'}]);
    let result = AreasForCollection.query({collId: 1});
    $httpBackend.flush();
    expect(result[0].title).toEqual('test area');

  });

  it('should request tags for collection.', () => {

    $httpBackend.expectGET(config.restHost + 't/subject/collection/1').respond([{name: 'test tag'}]);
    let result = TagsForCollection.query({collId: 1});
    $httpBackend.flush();
    expect(result[0].name).toEqual('test tag');

  });

  it('should request types for collection.', () => {

    $httpBackend.expectGET(config.restHost + 't/type/collection/1').respond([{name: 'test type'}]);
    let result = TypesForCollection.query({collId: 1});
    $httpBackend.flush();
    expect(result[0].name).toEqual('test type');

  });

  it('should request adding collection to area.', () => {

    $httpBackend.expectPOST(config.restHost + 't/collection/add/area').respond({status: 'success'});
    let result = AreaTargetAdd.save({collId: 1, areaId: 1});
    $httpBackend.flush();
    expect(result.status).toEqual('success');

  });

  it('should request removal of collection from area.', () => {

    $httpBackend.expectDELETE(config.restHost + 't/collection/1/remove/area/1').respond({status: 'success'});
    let result = AreaTargetRemove.delete({collId: 1, areaId: 1});
    $httpBackend.flush();
    expect(result.status).toEqual('success');

  });

  it('should request adding tag to collection.', () => {

    $httpBackend.expectPOST(config.restHost + 't/collection/add/tag').respond({status: 'success'});
    let result = CollectionTagTargetAdd.save({collId: 1, tagId: 1});
    $httpBackend.flush();
    expect(result.status).toEqual('success');

  });

  it('should request removal of tag from collection.', () => {

    $httpBackend.expectDELETE(config.restHost + 't/collection/1/remove/tag/1').respond({status: 'success'});
    let result = CollectionTagTargetRemove.delete({collId: 1, tagId: 1});
    $httpBackend.flush();
    expect(result.status).toEqual('success');

  });

  it('should request adding type to collection.', () => {

    $httpBackend.expectPOST(config.restHost + 't/collection/add/type').respond({status: 'success'});
    let result = CollectionTypeTargetAdd.save({collId: 1, typeId: 1});
    $httpBackend.flush();
    expect(result.status).toEqual('success');

  });

  it('should request removal of type from collection.', () => {

    $httpBackend.expectDELETE(config.restHost + 't/collection/1/remove/type/1').respond({status: 'success'});
    let result = CollectionTypeTargetRemove.delete({collId: 1, typeId: 1});
    $httpBackend.flush();
    expect(result.status).toEqual('success');

  });

  //
  // it('should update area.', () => {
  //   let message = {
  //     id: 1,
  //     title: 'test area',
  //     description: 'description',
  //     searchUrl: 'http://test.org',
  //     linkLabel: 'test label',
  //     url: ''
  //   };
  //   $httpBackend.expectPOST(config.restHost + 'area/update', message).respond({status: 'success'});
  //   let result = AreaUpdate.save(message);
  //   $httpBackend.flush();
  //   expect(result.status).toEqual('success');
  //
  // });

});
