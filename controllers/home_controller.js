module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    // res.cookie('newCookie', 'i have set it')
    return res.render('home', {
        title: "Home"
    });
}