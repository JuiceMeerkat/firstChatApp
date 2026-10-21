import util from "util";

export const intercept = async(req, res, next) => {
    // req = util.inspect(req);

    console.log('req.keys : ', req.keys);

    console.log('*intercept*')
    console.log('req : ', req);
    // console.log('res : ', res);
    // while (1) {}
    next();
}