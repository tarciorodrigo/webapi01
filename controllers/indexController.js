/* GET home page. */
function getIndex(req, res, next) {
    res.render('index', { title: 'Express' });
};
  
module.exports = {
    getIndex
};