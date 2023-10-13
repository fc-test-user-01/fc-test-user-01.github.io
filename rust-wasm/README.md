```
docker build -t my-rust-app .
```

```
docker run -it --rm \
  -v $(pwd)/dist:/usr/src/myapp/wasm-game-of-life/www/dist \
  --name my-rust-app my-rust-app \
  npm run build
```
