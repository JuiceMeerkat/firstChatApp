export const checkLogState = (req, res, next) => {
    console.log('*checkLogState*')
    // console.log('req : ', req);
    console.log('req.headers : ', req.headers);


    if (req.headers.Authorization) {
        console.log("*checkLogState* yep we've got a header autho")
    } else {
        console.log('No we do not')
    }
    next();
}