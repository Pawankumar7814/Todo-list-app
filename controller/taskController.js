module.exports.home = function(req, res) {
    return res.status(200).render('home', { title: "Home page" });
}