import * as wasm from "./hello_world_wasm_bg.wasm";
import { __wbg_set_wasm } from "./hello_world_wasm_bg.js";
__wbg_set_wasm(wasm);
export * from "./hello_world_wasm_bg.js";
