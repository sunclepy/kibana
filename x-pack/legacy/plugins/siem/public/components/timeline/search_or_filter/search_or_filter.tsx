/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { EuiFlexGroup, EuiFlexItem, EuiSuperSelect, EuiToolTip } from '@elastic/eui';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import {
  Filter,
  FilterManager,
  IIndexPattern,
} from '../../../../../../../../src/plugins/data/public';
import { BrowserFields } from '../../../containers/source';
import { KueryFilterQuery, KueryFilterQueryKind } from '../../../store';
import { KqlMode, EventType } from '../../../store/timeline/model';
import { DispatchUpdateReduxTime } from '../../super_date_picker';
import { DataProvider } from '../data_providers/data_provider';
import { QueryBarTimeline } from '../query_bar';

import { options } from './helpers';
import * as i18n from './translations';
import { PickEventType } from './pick_events';

const timelineSelectModeItemsClassName = 'timelineSelectModeItemsClassName';
const searchOrFilterPopoverClassName = 'searchOrFilterPopover';
const searchOrFilterPopoverWidth = '352px';

// SIDE EFFECT: the following creates a global class selector
const SearchOrFilterGlobalStyle = createGlobalStyle`
  .${timelineSelectModeItemsClassName} {
    width: 350px !important;
  }

  .${searchOrFilterPopoverClassName}__popoverPanel {
    width: ${searchOrFilterPopoverWidth};

    .euiSuperSelect__listbox {
      width: ${searchOrFilterPopoverWidth} !important;
    }
  }
`;

interface Props {
  applyKqlFilterQuery: (expression: string, kind: KueryFilterQueryKind) => void;
  browserFields: BrowserFields;
  dataProviders: DataProvider[];
  eventType: EventType;
  filterManager: FilterManager;
  filterQuery: KueryFilterQuery;
  filterQueryDraft: KueryFilterQuery;
  from: number;
  fromStr: string;
  indexPattern: IIndexPattern;
  isRefreshPaused: boolean;
  kqlMode: KqlMode;
  timelineId: string;
  updateKqlMode: ({ id, kqlMode }: { id: string; kqlMode: KqlMode }) => void;
  refreshInterval: number;
  setFilters: (filters: Filter[]) => void;
  setKqlFilterQueryDraft: (expression: string, kind: KueryFilterQueryKind) => void;
  setSavedQueryId: (savedQueryId: string | null) => void;
  filters: Filter[];
  savedQueryId: string | null;
  to: number;
  toStr: string;
  updateEventType: (eventType: EventType) => void;
  updateReduxTime: DispatchUpdateReduxTime;
}

const SearchOrFilterContainer = styled.div`
  margin: 5px 0 10px 0;
  user-select: none;
  .globalQueryBar {
    padding: 0px;
    .kbnQueryBar {
      div:first-child {
        margin-right: 0px;
      }
    }
  }
`;

SearchOrFilterContainer.displayName = 'SearchOrFilterContainer';

const ModeFlexItem = styled(EuiFlexItem)`
  user-select: none;
`;

ModeFlexItem.displayName = 'ModeFlexItem';

export const SearchOrFilter = React.memo<Props>(
  ({
    applyKqlFilterQuery,
    browserFields,
    dataProviders,
    eventType,
    indexPattern,
    isRefreshPaused,
    filters,
    filterManager,
    filterQuery,
    filterQueryDraft,
    from,
    fromStr,
    kqlMode,
    timelineId,
    refreshInterval,
    savedQueryId,
    setFilters,
    setKqlFilterQueryDraft,
    setSavedQueryId,
    to,
    toStr,
    updateEventType,
    updateKqlMode,
    updateReduxTime,
  }) => (
    <>
      <SearchOrFilterContainer>
        <EuiFlexGroup data-test-subj="timeline-search-or-filter" gutterSize="xs">
          <ModeFlexItem grow={false}>
            <EuiToolTip content={i18n.FILTER_OR_SEARCH_WITH_KQL}>
              <EuiSuperSelect
                data-test-subj="timeline-select-search-or-filter"
                hasDividers={true}
                itemLayoutAlign="top"
                itemClassName={timelineSelectModeItemsClassName}
                onChange={(mode: KqlMode) => updateKqlMode({ id: timelineId, kqlMode: mode })}
                options={options}
                popoverClassName={searchOrFilterPopoverClassName}
                valueOfSelected={kqlMode}
              />
            </EuiToolTip>
          </ModeFlexItem>
          <EuiFlexItem data-test-subj="timeline-search-or-filter-search-container">
            <QueryBarTimeline
              applyKqlFilterQuery={applyKqlFilterQuery}
              browserFields={browserFields}
              dataProviders={dataProviders}
              filters={filters}
              filterManager={filterManager}
              filterQuery={filterQuery}
              filterQueryDraft={filterQueryDraft}
              from={from}
              fromStr={fromStr}
              kqlMode={kqlMode}
              indexPattern={indexPattern}
              isRefreshPaused={isRefreshPaused}
              refreshInterval={refreshInterval}
              savedQueryId={savedQueryId}
              setFilters={setFilters}
              setKqlFilterQueryDraft={setKqlFilterQueryDraft}
              setSavedQueryId={setSavedQueryId}
              timelineId={timelineId}
              to={to}
              toStr={toStr}
              updateReduxTime={updateReduxTime}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <PickEventType eventType={eventType} onChangeEventType={updateEventType} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </SearchOrFilterContainer>
      <SearchOrFilterGlobalStyle />
    </>
  )
);

SearchOrFilter.displayName = 'SearchOrFilter';
