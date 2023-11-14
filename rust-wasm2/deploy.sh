#!/bin/bash

set +x

cp -r ./* ../../fc-test-user-01.github.io/rust-wasm2/.
git -C "../../fc-test-user-01.github.io/" add . && git -C "../../fc-test-user-01.github.io/" commit -m "m"
git -C "../../fc-test-user-01.github.io/" push
