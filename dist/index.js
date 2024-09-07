(function(o,a){typeof exports=="object"&&typeof module<"u"?a(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],a):(o=typeof globalThis<"u"?globalThis:o||self,a(o["@sigmie-vue"]={},o.Vue))})(this,function(o,a){"use strict";const s={__name:"SigmieSearch",props:{url:{type:String,default:null},search:{type:String,default:""},applicationId:{type:String,default:""},userToken:{type:String,required:!1},apiKey:{type:String,default:""},page:{type:Number,default:1},query:{type:String,default:""},filters:{type:String,default:""},facets:{type:String,default:""},perPage:{type:Number,default:10},sort:{type:String,default:"_score"},debounceMs:{type:Number,default:150}},setup(f){let e=f,r=a.reactive({autocomplete:[],hits:{},total:0,page:1,loading:!1,inited:!1,facets:{},processing_time_ms:0,per_page:10,last_page:0,current_page:1,from:0,to:0});a.onBeforeMount(()=>{c.value=[`https://${e.applicationId}-a.sigmie.app/v1/search/${e.search}`,`https://${e.applicationId}-b.sigmie.app/v1/search/${e.search}`,`https://${e.applicationId}-c.sigmie.app/v1/search/${e.search}`],u()});let c=a.ref([]),p=0;function g(){const i=c.value[p];return p=(p+1)%c.value.length,i}function d(i,n){let l;return function(...t){l&&clearTimeout(l),l=setTimeout(()=>{i(...t)},n)}}let u=function(i=3){r.loading=!0;const n={query:e.query,per_page:e.perPage,filters:e.filters,facets:e.facets,page:e.page,sort:e.sort};e.userToken&&(n.user_token=e.userToken);const l=e.url?e.url:g();fetch(l,{method:"POST",mode:"cors",cache:"no-cache",headers:{"Content-Type":"application/json","X-Sigmie-API-Key":e.apiKey,"X-Sigmie-Application":e.applicationId},redirect:"follow",body:JSON.stringify(n)}).then(t=>{if(!t.ok)throw new Error("Network response was not ok");return t.json()}).then(t=>{if(t.error)throw new Error(t.message,{cause:t});r.hits=t.hits,r.total=t.total,r.facets=t.facets,r.page=t.page,r.autocomplete=t.autocomplete,r.processing_time_ms=t.processing_time_ms,r.current_page=t.page,r.last_page=Math.ceil(t.total/e.perPage),r.from=(t.page-1)*e.perPage+1,r.to=Math.min(t.page*e.perPage,t.total),r.per_page=t.perPage,r.loading=!1,r.inited=!0}).catch(t=>{console.error("Fetch error:",t),!e.url&&i>1?u(i-1):r.loading=!1})};return a.watch(e,d(u,e.debounceMs)),(i,n)=>a.unref(r).inited?a.renderSlot(i.$slots,"default",a.normalizeProps(a.mergeProps({key:0},a.unref(r)))):a.createCommentVNode("",!0)}};o.SigmieSearch=s,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
