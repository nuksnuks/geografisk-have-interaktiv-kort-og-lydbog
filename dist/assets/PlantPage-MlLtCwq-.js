import{_ as r,g as d,m as _,r as p,h as u,Z as m,$ as h,c as f,i as a,t as g,o as v}from"./index-CE0Nud0F.js";const P={class:"page-container"},b={class:"header"},x=["src"],D={class:"plant-name"},B={class:"content"},I={class:"plant-details"},L=["innerHTML"],M={__name:"PlantPage",setup(R){const c=d(),i=_(),t=p(null);return u(async()=>{const s=i.params.id;if(!s){console.error("Plant ID is not defined");return}const n=m(c,"plants",s),e=await h(n);e.exists()?t.value=e.data():console.error("Plant not found")}),(s,n)=>{var e,o,l;return v(),f("div",P,[a("header",b,[a("img",{src:((e=t.value)==null?void 0:e.imageURL)||"/default-image.jpg",alt:"Plant banner",class:"plant-banner"},null,8,x),a("div",D,[a("h2",null,g((o=t.value)==null?void 0:o.name),1)])]),a("main",B,[a("section",I,[a("article",null,[a("p",{innerHTML:((l=t.value)==null?void 0:l.description)||"No description available"},null,8,L)])])])])}}},y=r(M,[["__scopeId","data-v-a29b6b11"]]);export{y as default};