/**
 * Created by mspalti on 2/2/17.
 */
'use strict';

describe('tag resources', () => {

  let $httpBackend,
    $rootScope,
    SearchOptionType,
    CollectionTypeCount,
    CollectionLinkCount,
    config;

  beforeEach(module('tagger'));

  beforeEach(inject((_$httpBackend_,
                     _$rootScope_,
                     _SearchOptionType_,
                     _CollectionLinkCount_,
                     _CollectionTypeCount_,
                     _config_) => {

    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    SearchOptionType = _SearchOptionType_;
    CollectionLinkCount = _CollectionLinkCount_;
    CollectionTypeCount = _CollectionTypeCount_;
    config = _config_;

  }));

  it('should request repository type counts in area.', () => {

    $httpBackend.expectGET(config.restHost + 'collection/repoTypeByArea/1').respond([{repoType: 'DEFAULT', count: 2}]);
    let result = SearchOptionType.query({areaId: 1});
    $httpBackend.flush();
    expect(result[0].repoType).toEqual('DEFAULT');

  });

  it('should request collection link type counts in area.', () => {

    $httpBackend.expectGET(config.restHost + 'collection/count/linkTypes/byArea/1').respond([{browseType: 'link', count: 2}]);
    let result = CollectionLinkCount.query({areaId: 1});
    $httpBackend.flush();
    expect(result[0].browseType).toEqual('link');

  });

  it('should request collection type counts in area.', () => {

    $httpBackend.expectGET(config.restHost + 'collection/count/types/byArea/1').respond([{ctype: 'dig', count: 2}]);
    let result = CollectionTypeCount.query({areaId: 1});
    $httpBackend.flush();
    expect(result[0].ctype).toEqual('dig');

  });

});

