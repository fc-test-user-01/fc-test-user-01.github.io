window.__fid = window.__fid || [];
__fid.push([535598560]);

(function() {
    function mieruca() {
        if (typeof window.__fjsld != "undefined")
            return;
        window.__fjsld = 1;
        var fjs = {};
        fjs.type = 'application/javascript';
        var timestamp = new Date;
        fjs.src = '/mieruca-hm-fc-custom.js?nocache=' + timestamp.getTime();
        fetch(fjs.src, {
            headers: {
                'Content-Type': fjs.type
            }
        }).then(r=>r.text()).then((t)=>{
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
            window.__mierucaFcCustom = {
                open: (url)=> {
                  window.__mieruca_heatmap = new MierucaHM;
                  const _ = window.__mieruca_heatmap.getVariablesFcCustom();
                  _.t.local_url = url;
                  window.__mieruca_heatmap.init();
                  console.log(_.o);
                },
                close: ()=> {
                  console.log(_.o);
                  const _ = window.__mieruca_heatmap.getVariablesFcCustom();
                  _.o.close();
                },
                reopen: (url)=>{
                    (()=>{
                        console.log(_.o);
                        const _ = window.__mieruca_heatmap.getVariablesFcCustom();
                        _.o.close();
                    }
                    )();
                    ((url)=>{
                        window.__mieruca_heatmap = new MierucaHM;
                        const _ = window.__mieruca_heatmap.getVariablesFcCustom();
                        _.t.local_url = url;
                        _.i.sendPageView();
                        console.log(_.o);
                    }
                    )(url);
                },
            }
        }
        );
    }
    setTimeout(mieruca, 500);
    document.readyState != "complete" ? (window.attachEvent ? window.attachEvent("onload", mieruca) : window.addEventListener("load", mieruca, false)) : mieruca();
}
)();
