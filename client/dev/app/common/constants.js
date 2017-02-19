/*
 * Copyright (c) 2016.
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
 * Created by mspalti on 12/14/16.
 */
'use strict';

/**
 * Constants used in application. This may be an incomplete list!
 */
taggerConstants.constant('Constant', {

  defaultBrowseType: 'link',
  defaultCollectionType: 'dig',
  defaultRepoType: 'DEFAULT'

});

/**
 * Dialog types.
 */
taggerConstants.constant('DialogTypes', {

  COLLECTION: 'dialog.collection',
  AREA: 'dialog.area',
  GROUP: 'dialog.group',
  TAG: 'dialog.tag',
  IMAGE: 'dialog.image',
  TOGGLE_TAG: 'dialog.toggle-tag-area',   // dialog for area maintainer tag/area toggle
  TAG_AREA_SELECT: 'dialog.tag-area.select',  // dialog for the administrator tag/area selector
  CONTENT_TYPE: 'dialog.content-type'

});
