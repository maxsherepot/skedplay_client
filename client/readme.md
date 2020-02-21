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