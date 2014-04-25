var deep = require("deepjs");

// to run : deep.Unit.run("js::./units/user.js").log()

var unit = {
    title:"app : user test cases",
    stopOnError:false,
    setup:function(){},
    clean:function(){},
    tests : {
   		getPublicFail:function(){
   			return deep.roles("public")
   			.store("user")
   			.get()
   			.fail(function(e){
   				if(e.status == 403)
   					return "lolipop";
   			})
   			.equal("lolipop");
   		},
   		rangePublicFail:function(){
   			return deep.roles("public")
   			.store("user")
   			.range(0,10)
   			.fail(function(e){
   				if(e.status == 403)
   					return "lolipop";
   			})
   			.equal("lolipop");
   		},
   		postPublicFail:function(){
   			return deep.roles("public")
   			.store("user")
   			.post({ email:"bloup@bloup.com", password:"test" })
   			.fail(function(e){
   				if(e.status == 403)
   					return "lolipop";
   			})
   			.equal("lolipop");
   		},
   		putPublicFail:function(){
   			return deep.roles("public")
   			.store("user")
   			.put({ id:"e1", email:"bloup@bloup.com", password:"test" })
   			.fail(function(e){
   				if(e.status == 403)
   					return "lolipop";
   			})
   			.equal("lolipop");
   		},
   		patchPublicFail:function(){
   			return deep.roles("public")
   			.store("user")
   			.put({ id:"e1", email:"bloup@bloup.com" })
   			.fail(function(e){
   				if(e.status == 403)
   					return "lolipop";
   			})
   			.equal("lolipop");
   		},
   		delPublicFail:function(){
   			return deep.roles("public")
   			.store("user")
   			.del("e1")
   			.fail(function(e){
   				if(e.status == 403)
   					return "lolipop";
   			})
   			.equal("lolipop");
   		}
    }
};


module.exports = unit;