var p=Object.defineProperty,v=Object.defineProperties;var f=Object.getOwnPropertyDescriptors;var a=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var d=(t,e,o)=>e in t?p(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,_=(t,e)=>{for(var o in e||(e={}))x.call(e,o)&&d(t,o,e[o]);if(a)for(var o of a(e))h.call(e,o)&&d(t,o,e[o]);return t},c=(t,e)=>v(t,f(e));import{a as i,r as m,C as b,o as g,b as B,h as I,g as s,f as k,D as y,p as C,i as M}from"./vendor.30226a4e.js";import{_ as S}from"./index.75b9f161.js";const r=t=>(C("data-v-543141b7"),t=t(),M(),t),w={class:"index"},D=r(()=>s("div",{class:"header"},"test",-1)),R={class:"content"},V=r(()=>s("div",{class:"footer"},null,-1)),E=i({name:"test"}),N=i(c(_({},E),{setup(t){const e=m(""),o=b();function u(){o.push("/test2/index")}return g(()=>{console.log("testMounted")}),(T,n)=>(B(),I("div",w,[D,s("div",R,[k(s("input",{type:"text","onUpdate:modelValue":n[0]||(n[0]=l=>e.value=l)},null,512),[[y,e.value]]),s("button",{onClick:u},"\u70B9\u6211")]),V]))}}));var z=S(N,[["__scopeId","data-v-543141b7"]]);export{z as default};
