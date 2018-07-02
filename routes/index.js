
/* GET home page. */
var redis =require('redis'),
    client=redis.createClient();
exports.index = function(req, res){
  res.render('index', { title: 'TODO APP' });
};
exports.about= function(req,res){
  res.render('index',{title:'about'});
};
exports.Todo=function(req,res){
  var todos =[];
  client.hgetall("TODO",function(err,objs){
      for(var k in objs){
          var newTodo={
              text:objs[k]
          };
          todos.push(newTodo);
      }
      res.render('todo',{todos:todos});


  });
};
exports.saveTodo=function(req,res){
        var newTodo={};
        newTodo.name=req.body['todo-text'];
        newTodo.id=newTodo.name.replace(" ","-");
        client.hset("TODO",newTodo.id,newTodo.name);
        res.redirect("back");
};
