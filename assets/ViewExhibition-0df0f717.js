import{u as j,a as q,s as U,v as A,e as K,x as M,r as b,y as H,o as J,w as P,b as S,d as m,f as s,n as Q,t as c,q as f,g as z,F as W,h as X,z as Y,A as Z,B as aa,C as ea,c as v}from"./index-991ba792.js";const ta={class:"view-exhibition"},sa={class:"cover-banner mb-4"},oa=["src"],na={class:"p-2 container mx-auto row flex-column flex-md-row mb-4"},ra={class:"col col-md-8"},la={class:"border-bottom pb-2 mb-4 d-flex flex-wrap justify-content-between"},ca={class:"d-flex flex-column font-pathway max-w"},ia={class:"fs-2 fw-bold"},da={class:"fs-4 fw-bold",datetime:"#"},ua=s("span",null,"~",-1),pa={class:"mb-4"},ma={class:"col col-md-4"},va=s("h2",{class:"text-center mb-2 border rounded-2 p-2"},"售票價格",-1),_a={class:"border rounded-3 p-2 fs-5 shadow-sm mb-2"},ba={class:"ticket-choose"},ha=["id","value","data-tickgroupindex","checked","onClick"],fa=["for"],ya=["data-name","disabled"],wa={__name:"ViewExhibition",setup(xa){var g,D;const i=j(),L=q(),_=U(),h=A();K();const O=M(_),n=b(),d=b({...(D=(g=n.value)==null?void 0:g.tickGroup)==null?void 0:D[0]});b(!1);const u=b([]),y=H(()=>(console.log("[cart Data]",h.cartData),!!h.cartData.find(t=>{var o,l;return t.name===((o=n.value)==null?void 0:o.name)&&((l=t==null?void 0:t.ticketType)==null?void 0:l.ticketType)===d.value.ticketType}))),R=H(()=>y.value?"已加入購物車":"加入購物車"),V=async()=>{var t,o,l,p;const a=await Y((t=i.params)==null?void 0:t.id);if(console.log(a.data.data),!a.data){L.push("/notFound");return}n.value=(o=a==null?void 0:a.data)==null?void 0:o.data,d.value=(p=(l=a.data)==null?void 0:l.data)==null?void 0:p.tickGroup[0]},$=a=>{d.value=a},F=()=>{var t,o;const a={id:(t=i.params)==null?void 0:t.id,name:n.value.name,startDate:n.value.startDate,endDate:n.value.endDate,image:n.value.image,ticketType:d.value,price:(o=d.value)==null?void 0:o.price,quantity:1};console.log("[buy]",a),h.addCartItem(a)},x=async()=>{var t;const a=await Z((t=_.userData)==null?void 0:t.localId);a!=null&&a.data&&(u.value=Object.keys(a==null?void 0:a.data).filter(o=>{if((a==null?void 0:a.data[o])===!0)return o}))},G=async a=>{var t;try{const o=await aa((t=_.userData)==null?void 0:t.localId,a);console.log("[track exhibition]",o),u.value.push(a)}catch(o){console.log("[track exhibition Error]",o)}},N=async a=>{var t;try{const o=await ea((t=_.userData)==null?void 0:t.localId,a);console.log("[remove track]",o),u.value=u.value.filter(l=>l!==a)}catch(o){console.log("[remove track Error]",o)}};return J(async()=>{V(),x()}),P(O.userData,()=>{x()}),(a,t)=>{var p,w,T,C,E,I,k,B;const o=S("HeartIcon"),l=S("HeartOutlineIcon");return v(),m("main",ta,[s("section",sa,[s("img",{class:Q(`${!((p=n.value)!=null&&p.image)&&"blinking"}`),src:(w=n.value)==null?void 0:w.image,alt:"exh-banner-cover"},null,10,oa)]),s("section",na,[s("div",ra,[s("div",la,[s("div",ca,[s("h1",ia,c((T=n.value)==null?void 0:T.name),1),s("time",da,[s("span",null,c(new Date((C=n.value)==null?void 0:C.startDate).toLocaleDateString()),1),ua,s("span",null,c(new Date((E=n.value)==null?void 0:E.endDate).toLocaleDateString()),1)])]),s("div",null,[u.value.find(e=>{var r;return e===((r=f(i).params)==null?void 0:r.id)})?(v(),m("button",{key:0,class:"btn border-0",type:"button",onClick:t[0]||(t[0]=e=>{var r;return N((r=f(i).params)==null?void 0:r.id)})},[z(o,{size:36})])):(v(),m("button",{key:1,type:"button",onClick:t[1]||(t[1]=e=>{var r;return G((r=f(i).params)==null?void 0:r.id)}),class:"btn border-0"},[z(l,{size:36})]))])]),s("p",pa,c((I=n.value)==null?void 0:I.introduce),1)]),s("div",ma,[s("div",null,[va,s("div",_a,[s("ul",null,[(v(!0),m(W,null,X((k=n.value)==null?void 0:k.tickGroup,(e,r)=>(v(),m("li",{key:r},[s("div",ba,[s("input",{class:"d-none",type:"radio",name:"售票選擇",id:e==null?void 0:e.ticketType,value:e==null?void 0:e.ticketType,"data-tickgroupindex":r,checked:r===0,onClick:ga=>$({ticketType:e==null?void 0:e.ticketType,price:e==null?void 0:e.price})},null,8,ha),s("label",{class:"text-center w-100",for:e==null?void 0:e.ticketType},[s("p",null,c(e==null?void 0:e.ticketType)+" "+c(e==null?void 0:e.price),1)],8,fa)])]))),128))])]),s("button",{onClick:F,class:"btn btn-primary w-100 mb-2 addCartBtn",type:"button","data-name":(B=n.value)==null?void 0:B.name,disabled:y.value},c(R.value),9,ya)])])])])}}};export{wa as default};
