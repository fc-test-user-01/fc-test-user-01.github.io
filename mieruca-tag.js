window.__fid=window.__fid||[];
// https://app.mieru-ca.com/faber-extract/heat-map -> 対象のドメインの設定 -> タグ発行 -> __fid.push([ ID ])のIDをコピー -> 下のIDにコピーしたIDを上書き
__fid.push([535598560]);
// 集計対象のパス設定可 (特殊ケースのみ要変更)
const targetPath = `${location.protocol}://${location.host}${location.pathname}`;
// Heatmap集計Javascriptのパス (特殊ケースのみ要変更)
const heatmapJsPath = `/mieruca-hm-fc-custom.js`;

(function () {
    function mieruca() {
        if (typeof window.__fjsld != "undefined")
            return;
        window.__fjsld = 1;
        var fjs = {};
        fjs.type = 'application/javascript';
        var timestamp = new Date;
        fjs.src = heatmapJsPath + '?nocache=' + timestamp.getTime();
        fetch(fjs.src, {
            headers: {
                'Content-Type': fjs.type
            }
        }).then(r => r.text()).then((t) => {
            t = t.replace(`new MierucaHM`, `null`).replace(`window.__mieruca_heatmap.init()`, `window.__mieruca_heatmap=null`);
            const sTarget = `"use strict";`;
            const sInsert = `this.getVariablesFcCustom=()=>{return{e:e, t:t, o:o, i:i}};`;
            const tArray = t.split(sTarget);
            tArray[1] = `${sInsert}${tArray[1]}`;
            t = tArray.join(sTarget);
            const tDom = document.querySelector(`script`);
            const cDom = document.createElement(`script`);
            cDom.innerText = t;
            tDom.insertAdjacentElement(`beforeBegin`, cDom);

            const main = {
                open: (url) => {
                    window.__mieruca_heatmap = new MierucaHM;
                    const _ = window.__mieruca_heatmap.getVariablesFcCustom();
                    _.t.local_url = url;
                    window.__mieruca_heatmap.init();
                },
                close: () => {
                    const _ = window.__mieruca_heatmap.getVariablesFcCustom();
                    _.o.close();
                },
                reopen: (url) => {
                    (() => {
                        const _ = window.__mieruca_heatmap.getVariablesFcCustom();
                        _.o.close();
                    }
                    )();
                    ((url) => {
                        window.__mieruca_heatmap = new MierucaHM;
                        const _ = window.__mieruca_heatmap.getVariablesFcCustom();
                        _.t.local_url = url;
                        _.i.sendPageView();
                    }
                    )(url);
                },
            }

            const jobs = {
                canReopen: false,
                urlWithoutSearch: targetPath,
                init: (params = []) => {
                    try {
                        const search = (() => {
                            const _ = [];
                            for (const v of params) {
                                if (v) {
                                  _.push(v);
                                }
                            }
                            if (_.length > 0) {
                                return `?${_.join('&')}`;
                            }
                            return ``;
                        })();
                        main.open(`${jobs.urlWithoutSearch}${search}`);
                        jobs.canReopen = true;
                    } catch (e) {
                        console.warn(e);
                    }
                },
                move: (params = []) => {
                    try {
                        if (main !== undefined && jobs.canReopen === true) {
                            const search = (() => {
                                const _ = [];
                                for (const v of params) {
                                    if (v) {
                                        _.push(v);
                                    }
                                }
                                if (_.length > 0) {
                                    return `?${_.join('&')}`;
                                }
                                return ``;
                            }
                            )();
                            main.reopen(`${jobs.urlWithoutSearch}${search}`);
                        }
                    } catch (e) {
                        console.warn(e);
                    }
                },
            }

            window.__mierucaFcCustomCallBack(jobs);

        }
        );
    }
    setTimeout(mieruca, 500);
    document.readyState != "complete" ? (window.attachEvent ? window.attachEvent("onload", mieruca) : window.addEventListener("load", mieruca, false)) : mieruca();
}
)();