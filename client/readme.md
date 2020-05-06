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
## All links should be imported from i18n
```
import { Link } from 'lib/i18n'
```
## All links and dynamic routes should be like here
###https://github.com/isaachinman/next-i18next/issues/413#issuecomment-548024784