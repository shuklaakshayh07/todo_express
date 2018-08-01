
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
  var abc =[];
  client.hgetall("TODO",function(err,objs){
      if(objs)
      {// console.log(Object.keys(objs))
      for(var k in objs){//console.log('objectInLoop2',k,":",objs[k]);
            console.log('in loop',objs[k]);
            var obj=JSON.parse(objs[k]);
           console.log("after parsing check",k,obj.name);
          var newTodo={
              text:obj.name,
              date:obj.date,
              check:obj.check
          };
          abc.push(newTodo);
      }
    }
    else{
      abc=[];
    }
       res.render('todo',{todos:abc});


  });
};
exports.saveTodo=function(req,res){
        var newTodo={};
        newTodo.name=req.body['todo-text'];
        id=newTodo.name.replace(" ","-");
        newTodo.date=new Date();
        newTodo.check=false;
        newTodo=JSON.stringify(newTodo);
        console.log('savedObject',newTodo);
        client.hset("TODO",id,newTodo);
        res.redirect("back");
};
