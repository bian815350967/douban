(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-83fafdbe"],{"5c3a":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"movie-details"},[a("fixed-top",{attrs:{titleName:e.titleName}},[a("router-link",{staticClass:"link",attrs:{to:"/"}},[e._v("首页")])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:e.movieData.name,expression:"movieData.name"}]},[a("div",{staticClass:"wrap"},[a("div",{staticClass:"cont-a"},[e.movieData.avatars?a("div",{staticClass:"left-avatar"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.movieData.avatars.medium,expression:"movieData.avatars.medium"}],attrs:{alt:""}})]):e._e(),a("div",{staticClass:"right-c"},[a("h1",[e._v(e._s(e.movieData.name))]),a("p",[e._v(e._s(e.movieData.name_en))]),a("div",[e._v("出生日期："+e._s(e.movieData.birthday))]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.movieData.born_place,expression:"movieData.born_place"}]},[e._v("出生地："+e._s(e.movieData.born_place))]),a("div",[e._v("性别："+e._s(e.movieData.gender))]),a("div",[e._v("职业："+e._s(e.getGenres2(e.movieData.professions)))])])]),e._m(0)]),a("div",{staticClass:"movie-c"},[a("p",[e._v("剧情简介：")]),a("div",{staticClass:"summary",domProps:{innerHTML:e._s(e.replaceString(e.movieData.summary))}})]),a("div",{staticClass:"people-w"},[a("h5",[e._v("最受好评的作品")]),a("ul",{staticClass:"people-uls"},e._l(e.movieData.works,function(t,i){return a("li",{key:i,staticClass:"people-list",on:{click:function(a){return e.gotoDetails(t.subject.id)}}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.subject,expression:"item.subject"}],staticClass:"flex-item"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.subject.images,expression:"item.subject.images"}],staticClass:"imgs-w"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.subject.images.medium,expression:"item.subject.images.medium"}],attrs:{alt:""}})]),a("p",{staticClass:"name-p"},[e._v(e._s(t.subject.title))])])])}),0)]),a("div",{staticClass:"people-w"},[a("h5",[e._v("影人图片")]),a("ul",{staticClass:"people-uls"},e._l(e.movieData.photos,function(e,t){return a("li",{key:t,staticClass:"people-list"},[a("div",{staticClass:"flex-item"},[a("div",{staticClass:"imgs-w"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.image,expression:"item.image"}],attrs:{alt:""}})])])])}),0)])]),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.movieData.name,expression:"!movieData.name"}],staticClass:"loading-w"},[a("cube-loading"),a("p",{staticClass:"text"},[e._v("正在加载中...")])],1)],1)},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"btn-w"},[a("div",{staticClass:"btn-list"},[e._v("想看")]),a("div",{staticClass:"btn-list"},[e._v("评分")])])}],n=(a("a481"),a("ac6a"),{data:function(){return{currentIndex:0,movieData:{},titleName:"电影详情"}},created:function(){this.$route.query.id&&this.getDetails()},methods:{getDetails:function(){var e=this;this.$fetch("/celebrity/"+this.$route.query.id).then(function(t){t.name&&(e.movieData=t)})},getGenres:function(e){if(e&&e.length)return e.join(" / ")},getGenres2:function(e){if(e&&e.length){var t=[];return e.forEach(function(e){""!==e&&t.push(e)}),t.join(" / ")}},gotoDetails:function(e){this.$router.push({path:"/movieDetails",query:{id:e}})},tableOne:function(e){this.currentIndex=e},replaceString:function(e){if(e)return e.replace(/\n/g,"<br>")}},components:{fixedTop:function(e){return a.e("chunk-3eea379a").then(function(){var t=[a("a2a2")];e.apply(null,t)}.bind(this)).catch(a.oe)}}}),o=n,r=(a("e236"),a("2877")),l=Object(r["a"])(o,i,s,!1,null,"1bd269fb",null);t["default"]=l.exports},a6b1:function(e,t,a){},e236:function(e,t,a){"use strict";var i=a("a6b1"),s=a.n(i);s.a}}]);