FROM rust:1.73-bookworm

RUN apt update
RUN apt install vim curl npm git nmap -y

WORKDIR /usr/src/myapp
RUN cargo install wasm-pack
RUN cargo install cargo-generate

ENV USER=testuser
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN cargo generate --git https://github.com/rustwasm/wasm-pack-template --name wasm-game-of-life
WORKDIR /usr/src/myapp/wasm-game-of-life
RUN wasm-pack build
RUN npm init wasm-app www -y
WORKDIR /usr/src/myapp/wasm-game-of-life/www
RUN npm install
