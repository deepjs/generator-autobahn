var deep = require("deepjs/deep");
require("deep-mongo");
require("deepjs/lib/stores/collection");

//_________________________________________________________ MAPS DEFINITION 
var services = {
	//____________________________________________________________ FULL USER STORE
	"/user": deep.ocm({
		dev:deep.Collection(null, deep.Shared([{ id:"u1", email:"test@test.com", password:deep.utils.Hash("test123"), roles:["user"]}])),
		prod: deep.Mongo(null, "mongodb://127.0.0.1:27017/yourdb", "user"),
		admin:{
			schema:{
				properties:{
					password:{ "private":true, transformers:[deep.transformers.Hash], type:"string", required:true, readOnly:true },	
					email:{ type:"string", required:true, format:"email", readOnly:true },
					roles:{ type:'array', items:{ type:'string', 'enum':['admin', 'user'] } }
				},
				additionalProperties:false
			}
		},
		user: {
			backgrounds: ["this::../admin", deep.store.AllowOnly("get")],
			schema:{
				ownerRestriction:true
			}
		},
		"public": deep.store.AllowOnly()
	}, {
		protocol: "user",
		group: ["env", "roles"]
	}),
	
	//____________________________________________________________ TEST STORE
	"/test": deep.ocm({
		admin: deep.Collection(null, deep.Shared([{ id:"e1", label:"hello" }, { id:"e2", label:"world" }]), { 
			properties:{ 
				label:{ type:"string", required:true } 
			},
			additionalProperties:false
		}),
		user: {
			backgrounds: ["this::../admin", deep.store.Restrictions("del", "flush")]
		},
		"public": {
			backgrounds: ["this::../user", deep.store.AllowOnly("get", "range")]
		}
	}, {
		protocol: "test",
		group: "roles"
	})
};




module.exports = services;