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
        fjs.src = '/mieruca-hm-fc-custom.js?v=' + timestamp.getTime();
        fetch(fjs.src, {
            headers: {
                'Content-Type': fjs.type
            }
        }).then(r=>r.text()).then((t)=>{
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
                reopen: (url)=>{
                    // Close
                    (()=>{
                        const _ = window.__mieruca_heatmap.getVariablesFcCustom();
                        _.o.close();
                    }
                    )();
                    // Open
                    ((url)=>{
                        window.__mieruca_heatmap = new MierucaHM;
                        const _ = window.__mieruca_heatmap.getVariablesFcCustom();
                        _.t.local_url = url;
                        _.i.sendPageView();
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
