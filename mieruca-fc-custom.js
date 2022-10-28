class CMierucaFcCustom {
    // params : array
    constructor(params) {
        this.ready = false;
        this.setParams(params);
        window.__mierucaFcCustomCallBack = (jobs) => {
            this.jobs = jobs;
            this.jobs.init(this.getParams());
            this.ready = true;
        }
    }
    // params : array
    move(params) {
        this.setParams(params);
        if (this.jobs === undefined) {
            return;
        }
        try {
            this.jobs.move(this.getParams());
        } catch (e) {
            console.warn(e);
        }
    }
    // params : array
    setParams(params) {
        this.params = params
    }
    getParams() {
        return this.params
    }
}
window.__mierucaFcCustom = new CMierucaFcCustom(['type=fn', `preview=1`]);