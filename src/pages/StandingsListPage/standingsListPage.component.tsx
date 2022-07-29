import { memo, useEffect, useMemo, useState } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { useGetDriverStandingsQuery } from '../../api/driverStandings.api';
import { FROM_F1_SEASON_YEAR, FIRST_F1_SEASON_YEAR } from '../../constants';
import { StandingsListItem } from '../../interfaces/standingsLists';
import { StandingListCard } from '../../components/StandingListCard';
import styles from './standingsListPage.module.scss';
import { Loader } from '../../components/common/Loader';
import { Modal } from '../../components/common/Modal';
import { ResultsPage } from '../ResultsPage';

const SEASONS_PER_PAGE = 5;

const INIT_OFFSET = FROM_F1_SEASON_YEAR - FIRST_F1_SEASON_YEAR;

export const StandingsListPage = memo(function StandingsListPage() {
  const [selectedSeason, setSelectedSeason] = useState<StandingsListItem | null>(null);
  const [offset, setOffset] = useState<number>(INIT_OFFSET);
  const [standingsList, setStandingsList] = useState<StandingsListItem[]>([]);

  const { content, pagination, loading } = useGetDriverStandingsQuery(
    { limit: SEASONS_PER_PAGE, offset },
    {
      selectFromResult: ({ data, isLoading }) => ({
        content: data?.standingsLists,
        pagination: data?.pagination,
        loading: isLoading,
      }),
    },
  );

  useEffect(() => {
    if (content) {
      setStandingsList((currentState) => [...currentState, ...content]);
    }
  }, [content]);

  const isItemLoaded = (index: number) => !!standingsList[index];

  const itemCount: number = useMemo(() => (pagination ? Number(pagination.total) - INIT_OFFSET : 0), [pagination]);

  if (loading) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className={styles.list}>
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              itemCount={itemCount}
              loadMoreItems={() => setOffset(offset + SEASONS_PER_PAGE)}
              isItemLoaded={isItemLoaded}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  height={height}
                  width={width}
                  itemCount={itemCount}
                  itemSize={120}
                  itemData={standingsList}
                  ref={ref}
                  onItemsRendered={onItemsRendered}
                >
                  {(listProps: ListChildComponentProps<StandingsListItem[]>) => (
                    <StandingListCard
                      onClickCallback={(item) => setSelectedSeason(item)}
                      totalItems={itemCount}
                      {...listProps}
                    />
                  )}
                </List>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </div>
      {selectedSeason && (
        <Modal onClose={() => setSelectedSeason(null)}>
          <ResultsPage season={selectedSeason} />
        </Modal>
      )}
    </>
  );
});

export default StandingsListPage;
