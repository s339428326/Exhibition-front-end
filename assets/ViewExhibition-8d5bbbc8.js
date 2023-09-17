import{u as j,a as q,s as U,v as A,e as K,x as M,r as _,y as H,o as J,w as P,b as S,d as p,f as s,n as Q,t as l,q as h,g as z,F as W,h as X,z as Y,A as Z,B as aa,C as ea,c as m}from"./index-d614a8a0.js";const ta={class:"view-exhibition"},sa={class:"cover-banner mb-4"},oa=["src"],na={class:"p-2 container mx-auto row flex-column flex-md-row mb-4"},ra={class:"col col-md-8"},la={class:"border-bottom pb-2 mb-4 d-flex flex-wrap justify-content-between"},ca={class:"d-flex flex-column font-pathway max-w"},ia={class:"fs-2 fw-bold"},ua={class:"fs-4 fw-bold",datetime:"#"},da=s("span",null,"~",-1),pa={class:"mb-4"},ma={class:"col col-md-4"},va=s("h2",{class:"text-center mb-2 border rounded-2 p-2"},"售票價格",-1),_a={class:"border rounded-3 p-2 fs-5 shadow-sm mb-2"},ba={class:"ticket-choose"},ha=["id","value","data-tickgroupindex","checked","onClick"],fa=["for"],ya=["data-name","disabled"],wa={__name:"ViewExhibition",setup(xa){var x,g;const i=j(),L=q(),v=U(),b=A();K();const O=M(v),n=_(),u=_({...(g=(x=n.value)==null?void 0:x.tickGroup)==null?void 0:g[0]});_(!1);const d=_([]),f=H(()=>(console.log("[cart Data]",b.cartData),!!b.cartData.find(t=>{var o,c;return t.name===((o=n.value)==null?void 0:o.name)&&((c=t==null?void 0:t.ticketType)==null?void 0:c.ticketType)===u.value.ticketType}))),R=H(()=>f.value?"已加入購物車":"加入購物車"),V=async()=>{var t;const a=await Y((t=i.params)==null?void 0:t.id);if(console.log(a),!a.data){L.push("/notFound");return}n.value=a.data,u.value=a.data.tickGroup[0]},$=a=>{u.value=a},F=()=>{var t,o;const a={id:(t=i.params)==null?void 0:t.id,name:n.value.name,startDate:n.value.startDate,endDate:n.value.endDate,image:n.value.image,ticketType:u.value,price:(o=u.value)==null?void 0:o.price,quantity:1};console.log("[buy]",a),b.addCartItem(a)},y=async()=>{var t;const a=await Z((t=v.userData)==null?void 0:t.localId);a!=null&&a.data&&(d.value=Object.keys(a==null?void 0:a.data).filter(o=>{if((a==null?void 0:a.data[o])===!0)return o}))},G=async a=>{var t;try{const o=await aa((t=v.userData)==null?void 0:t.localId,a);console.log("[track exhibition]",o),d.value.push(a)}catch(o){console.log("[track exhibition Error]",o)}},N=async a=>{var t;try{const o=await ea((t=v.userData)==null?void 0:t.localId,a);console.log("[remove track]",o),d.value=d.value.filter(c=>c!==a)}catch(o){console.log("[remove track Error]",o)}};return J(async()=>{V(),y()}),P(O.userData,()=>{y()}),(a,t)=>{var D,w,T,C,E,I,k,B;const o=S("HeartIcon"),c=S("HeartOutlineIcon");return m(),p("main",ta,[s("section",sa,[s("img",{class:Q(`${!((D=n.value)!=null&&D.image)&&"blinking"}`),src:(w=n.value)==null?void 0:w.image,alt:"exh-banner-cover"},null,10,oa)]),s("section",na,[s("div",ra,[s("div",la,[s("div",ca,[s("h1",ia,l((T=n.value)==null?void 0:T.name),1),s("time",ua,[s("span",null,l(new Date((C=n.value)==null?void 0:C.startDate).toLocaleDateString()),1),da,s("span",null,l(new Date((E=n.value)==null?void 0:E.endDate).toLocaleDateString()),1)])]),s("div",null,[d.value.find(e=>{var r;return e===((r=h(i).params)==null?void 0:r.id)})?(m(),p("button",{key:0,class:"btn border-0",type:"button",onClick:t[0]||(t[0]=e=>{var r;return N((r=h(i).params)==null?void 0:r.id)})},[z(o,{size:36})])):(m(),p("button",{key:1,type:"button",onClick:t[1]||(t[1]=e=>{var r;return G((r=h(i).params)==null?void 0:r.id)}),class:"btn border-0"},[z(c,{size:36})]))])]),s("p",pa,l((I=n.value)==null?void 0:I.introduce),1)]),s("div",ma,[s("div",null,[va,s("div",_a,[s("ul",null,[(m(!0),p(W,null,X((k=n.value)==null?void 0:k.tickGroup,(e,r)=>(m(),p("li",{key:r},[s("div",ba,[s("input",{class:"d-none",type:"radio",name:"售票選擇",id:e==null?void 0:e.ticketType,value:e==null?void 0:e.ticketType,"data-tickgroupindex":r,checked:r===0,onClick:ga=>$({ticketType:e==null?void 0:e.ticketType,price:e==null?void 0:e.price})},null,8,ha),s("label",{class:"text-center w-100",for:e==null?void 0:e.ticketType},[s("p",null,l(e==null?void 0:e.ticketType)+" "+l(e==null?void 0:e.price),1)],8,fa)])]))),128))])]),s("button",{onClick:F,class:"btn btn-primary w-100 mb-2 addCartBtn",type:"button","data-name":(B=n.value)==null?void 0:B.name,disabled:f.value},l(R.value),9,ya)])])])])}}};export{wa as default};
