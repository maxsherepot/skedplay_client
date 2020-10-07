import watcher from './viewedResourcesWatcher';

Nova.booting((Vue, router) => {
    watcher.watch(router);
});
