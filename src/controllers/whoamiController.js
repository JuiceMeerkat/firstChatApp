export const whoamiController = (req, res, next) => {
    
    console.log('req.user : ', req.user);
    return res.json({
        "status": 200,
        "req.user": req.user
    })
}