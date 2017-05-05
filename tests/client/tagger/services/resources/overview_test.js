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

    $httpBackend.expectGET(config.restHost + 't/collection/repoTypeByArea/1').respond([{repoType: 'DEFAULT', count: 2}]);
    let result = SearchOptionType.query({areaId: 1});
    $httpBackend.flush();
    expect(result[0].repoType).toEqual('DEFAULT');

  });

  it('should request collection link type counts in area.', () => {

    $httpBackend.expectGET(config.restHost + 't/collection/count/linkTypes/byArea/1').respond([{browseType: 'link', count: 2}]);
    let result = CollectionLinkCount.query({areaId: 1});
    $httpBackend.flush();
    expect(result[0].browseType).toEqual('link');

  });

  it('should request collection type counts in area.', () => {

    $httpBackend.expectGET(config.restHost + 't/collection/count/types/byArea/1').respond([{ctype: 'dig', count: 2}]);
    let result = CollectionTypeCount.query({areaId: 1});
    $httpBackend.flush();
    expect(result[0].ctype).toEqual('dig');

  });

});

