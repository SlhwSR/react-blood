export const judgArr = function (params) {
    let res = false;
    if (params instanceof Object) {
        Object.keys(params).forEach(key => {
            if (Array.isArray(params[key])) {
                res = true;
            }
        })
    }
    return res;
}