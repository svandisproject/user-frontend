export interface SyncAwareService {
    loadInitial();

    isStorageEmpty();
    sync();
}
