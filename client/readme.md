###Deploy commands
#### Common
```
docker exec -it skidplay_nextjs npm install
docker exec -it skidplay_nextjs npm run build
```
#### Init
```
docker exec -it skidplay_nextjs sh -> NODE_ENV=production forever start start.js
```
#### Update
```
docker exec -it skidplay_nextjs sh -> NODE_ENV=production forever restart start.js
```

# IMPORTANT MOMENTS
## All links should be
```
import Link from 'components/SlashedLink';
```
## All links and dynamic routes should be like here
###https://github.com/isaachinman/next-i18next/issues/413#issuecomment-548024784

https://github.com/pavel-grom/next-i18next-url/commit/5bd9ead2aacf5b1ffba6583262eac66e398ce84a
```
href.pathname = href.pathname.replace(/[\[\]]/g, '');

if (!/\/$/g.test(as)) {
  as += '/';
}

if (!/\/$/g.test(href.pathname)) {
  href.pathname += '/';
}
```