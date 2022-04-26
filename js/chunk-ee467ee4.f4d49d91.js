(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ee467ee4"],{"027b":function(t,e,a){},"12b2":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"admin-form"},[a("form",{on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleSubmit.apply(null,arguments)}}},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"name"}},[t._v("Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.name,expression:"restaurant.name"}],staticClass:"form-control",attrs:{id:"name",type:"text",name:"name",placeholder:"Enter name",autocomplete:"off",required:""},domProps:{value:t.restaurant.name},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"name",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"categoryId"}},[t._v("Category")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.categoryId,expression:"restaurant.categoryId"}],staticClass:"form-control",attrs:{id:"categoryId",name:"categoryId",required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.restaurant,"categoryId",e.target.multiple?a:a[0])}}},t._l(t.categories,(function(e){return a("option",{key:e.id,domProps:{value:e.id}},[t._v(" "+t._s(e.name)+" ")])})),0)]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"tel"}},[t._v("Tel")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.tel,expression:"restaurant.tel"}],staticClass:"form-control",attrs:{id:"tel",type:"text",name:"tel",placeholder:"Enter telephone number",autocomplete:"off"},domProps:{value:t.restaurant.tel},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"tel",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"address"}},[t._v("Address")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.address,expression:"restaurant.address"}],staticClass:"form-control",attrs:{id:"address",type:"text",placeholder:"Enter address",name:"address",autocomplete:"off"},domProps:{value:t.restaurant.address},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"address",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"opening-hours"}},[t._v("Opening Hours")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.openingHours,expression:"restaurant.openingHours"}],staticClass:"form-control",attrs:{id:"opening-hours",type:"time",name:"opening_hours",autocomplete:"off"},domProps:{value:t.restaurant.openingHours},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"openingHours",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"description"}},[t._v("Description")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.description,expression:"restaurant.description"}],staticClass:"form-control",attrs:{id:"description",rows:"6",name:"description"},domProps:{value:t.restaurant.description},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"description",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"image"}},[t._v("Image")]),t.restaurant.image?a("img",{staticClass:"d-block img-thumbnail mb-3",attrs:{src:t.restaurant.image,width:"200",height:"200"}}):t._e(),a("input",{staticClass:"form-control-file",attrs:{id:"image",type:"file",name:"image",accept:"image/*",autocomplete:"off"},on:{change:t.handleFileChange}})]),a("div",{staticClass:"btn-area"},[a("button",{staticClass:"btn btn-outline-info submit",attrs:{type:"submit",disabled:t.isProcessing}},[t._v(" Submit ")])])])])])},n=[],s=a("1da1"),i=a("5530"),o=(a("96cf"),a("d9e2"),a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("9861"),a("b0c0"),a("be6c")),u=a("2fa3"),c={props:{initialRestaurant:{type:Object,default:function(){return{name:"",categoryId:"",tel:"",address:"",description:"",image:"",openingHours:""}}},isProcessing:{type:Boolean,default:!1}},data:function(){return{restaurant:{name:"",categoryId:"",tel:"",address:"",description:"",image:"",openingHours:""},categories:[]}},watch:{initialRestaurant:function(t){this.restaurant=Object(i["a"])(Object(i["a"])({},this.restaurant),t)}},created:function(){this.fetchCategories(),this.restaurant=Object(i["a"])(Object(i["a"])({},this.restaurant),this.initialRestaurant)},methods:{fetchCategories:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o["a"].categories.get();case 3:if(a=e.sent,r=a.data,"error"!==r.status){e.next=7;break}throw new Error(r.message);case 7:t.categories=r.categories,t.isLoading=!1,e.next=15;break;case 11:e.prev=11,e.t0=e["catch"](0),t.isLoading=!1,u["a"].fire({icon:"error",title:"無法取得餐廳類別，請稍後再試"});case 15:case"end":return e.stop()}}),e,null,[[0,11]])})))()},handleFileChange:function(t){var e=t.target.files;if(0===e.length)this.restaurant.image="";else{var a=window.URL.createObjectURL(e[0]);this.restaurant.image=a}},handleSubmit:function(t){if(this.restaurant.name)if(this.restaurant.categoryId){var e=t.target,a=new FormData(e);this.$emit("after-submit",a)}else u["a"].fire({icon:"warning",title:"請選擇餐廳類別"});else u["a"].fire({icon:"warning",title:"請填寫餐廳名稱"})}}},d=c,l=(a("5302"),a("2877")),m=Object(l["a"])(d,r,n,!1,null,"331c3af7",null);e["a"]=m.exports},5302:function(t,e,a){"use strict";a("bf9b")},6945:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"form"},[t.isLoading?r("Spinner",{staticClass:"form-spinner"}):r("div",{staticClass:"form-container py-3 px-3 mb-5"},[r("AdminRestaurantForm",{attrs:{"initial-restaurant":t.restaurant,"is-processing":t.isProcessing},on:{"after-submit":t.handleAfterSubmit}})],1),r("div",{staticClass:"back"},[r("button",{staticClass:"btn btn-link back-btn",attrs:{type:"button"},on:{click:function(e){return t.$router.back()}}},[r("img",{staticClass:"back-icon",attrs:{src:a("0142")}})])]),r("BottomNavTabsForPage",{staticClass:"bottom-navtabs"})],1)},n=[],s=a("5530"),i=a("1da1"),o=(a("96cf"),a("d9e2"),a("b0c0"),a("a4d3"),a("e01a"),a("12b2")),u=a("be6c"),c=a("2fa3"),d=a("2375"),l=a("a2e7"),m={name:"AdminRestaurantEdit",components:{AdminRestaurantForm:o["a"],Spinner:d["a"],BottomNavTabsForPage:l["a"]},data:function(){return{restaurant:{id:-1,name:"",categoryId:"",tel:"",address:"",description:"",image:"",openingHours:""},isProcessing:!1,isLoading:!0}},created:function(){var t=this.$route.params.id;this.fetchRestaurant(t)},beforeRouteUpdate:function(t,e,a){var r=t.params.id;this.fetchRestaurant(r),a()},methods:{handleAfterSubmit:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,e.isProcessing=!0,a.next=4,u["a"].restaurants.update({restaurantId:e.restaurant.id,formData:t});case 4:if(r=a.sent,n=r.data,"error"!==n.status){a.next=8;break}throw new Error(n.message);case 8:e.$router.push({name:"admin-restaurants"}),c["a"].fire({icon:"success",title:"已成功修改該餐廳資料！"}),a.next=16;break;case 12:a.prev=12,a.t0=a["catch"](0),e.isProcessing=!1,c["a"].fire({icon:"error",title:"無法更新餐廳資料，請稍後再試"});case 16:case"end":return a.stop()}}),a,null,[[0,12]])})))()},fetchRestaurant:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,n,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,u["a"].restaurants.getDetail({restaurantId:t});case 3:r=a.sent,n=r.data,i=n.restaurant,e.restaurant=Object(s["a"])(Object(s["a"])({},e.restaurant),{},{id:i.id,name:i.name,categoryId:i.CategoryId,tel:i.tel,address:i.address,description:i.description,image:i.image,openingHours:i.opening_hours}),e.isLoading=!1,a.next=14;break;case 10:a.prev=10,a.t0=a["catch"](0),e.isLoading=!1,c["a"].fire({icon:"error",title:"無法取得餐廳資料，請稍後再試"});case 14:case"end":return a.stop()}}),a,null,[[0,10]])})))()}}},p=m,f=(a("9cb9"),a("2877")),g=Object(f["a"])(p,r,n,!1,null,"1a303a6b",null);e["default"]=g.exports},"9cb9":function(t,e,a){"use strict";a("027b")},be6c:function(t,e,a){"use strict";a("b0c0");var r=a("2fa3");e["a"]={categories:{get:function(){return r["b"].get("/admin/categories")},create:function(t){var e=t.name;return r["b"].post("/admin/categories",{name:e})},update:function(t){var e=t.categoryId,a=t.name;return r["b"].put("/admin/categories/".concat(e),{name:a})},delete:function(t){var e=t.categoryId;return r["b"].delete("/admin/categories/".concat(e))}},restaurants:{create:function(t){var e=t.formData;return r["b"].post("/admin/restaurants",e)},get:function(){return r["b"].get("/admin/restaurants")},getDetail:function(t){var e=t.restaurantId;return r["b"].get("/admin/restaurants/".concat(e))},update:function(t){var e=t.restaurantId,a=t.formData;return r["b"].put("/admin/restaurants/".concat(e),a)},deleteRestaurant:function(t){var e=t.restaurantId;return r["b"].delete("/admin/restaurants/".concat(e))}},users:{get:function(){return r["b"].get("/admin/users")},update:function(t){var e=t.userId,a=t.isAdmin;return r["b"].put("/admin/users/".concat(e),{isAdmin:a})}}}},bf9b:function(t,e,a){},e01a:function(t,e,a){"use strict";var r=a("23e7"),n=a("83ab"),s=a("da84"),i=a("e330"),o=a("1a2d"),u=a("1626"),c=a("3a9b"),d=a("577e"),l=a("9bf2").f,m=a("e893"),p=s.Symbol,f=p&&p.prototype;if(n&&u(p)&&(!("description"in f)||void 0!==p().description)){var g={},v=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:d(arguments[0]),e=c(f,this)?new p(t):void 0===t?p():p(t);return""===t&&(g[e]=!0),e};m(v,p),v.prototype=f,f.constructor=v;var b="Symbol(test)"==String(p("test")),h=i(f.toString),y=i(f.valueOf),w=/^Symbol\((.*)\)[^)]+$/,C=i("".replace),x=i("".slice);l(f,"description",{configurable:!0,get:function(){var t=y(this),e=h(t);if(o(g,t))return"";var a=b?x(e,7,-1):C(e,w,"$1");return""===a?void 0:a}}),r({global:!0,forced:!0},{Symbol:v})}}}]);
//# sourceMappingURL=chunk-ee467ee4.f4d49d91.js.map