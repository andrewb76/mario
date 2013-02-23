
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log('get index');
  res.render('index', { title: 'Express' });
};
