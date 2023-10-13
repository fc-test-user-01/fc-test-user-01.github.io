```
docker build -t my-rust-app .
```

```
docker run -it --rm \
  -v $(pwd)/dist:/usr/src/myapp/wasm-game-of-life/www/dist \
  --name my-rust-app my-rust-app \
  npm run build
```

```
docker rm -f my-rust-app
docker run -itd \
  -v $(pwd)/test:/usr/src/test \
  --name my-rust-app my-rust-app
docker exec -it my-rust-app /bin/bash
```
