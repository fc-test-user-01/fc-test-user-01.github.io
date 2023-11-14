import * as wasm from "./test-wasm_bg.wasm";
import { __wbg_set_wasm } from "./test-wasm_bg.js";
__wbg_set_wasm(wasm);
export * from "./test-wasm_bg.js";

wasm.__wbindgen_start();
