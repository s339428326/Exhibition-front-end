import{_ as M,a as O,v as R,r as x,s as G,E as J,y as K,o as Q,b as $,c as _,d as b,f as e,q as f,F as H,h as E,n as u,S as k,g as v,i as L,t as n,M as U,p as W,k as X}from"./index-cfc24485.js";import{c as Y}from"./order-f030dbcc.js";const c=m=>(W("data-v-9676a617"),m=m(),X(),m),Z={class:"container mb-5"},ee=U('<section class="my-5" data-v-9676a617><ul class="d-flex justify-content-between p-4 border rounded-4 bg-gray shadow-sm" data-v-9676a617><li class="border-black p-2 after-line" data-v-9676a617><p class="border border-black p-2 fw-bold box d-flex align-items-center justify-content-center mx-auto mb-2" data-v-9676a617> 1 </p><h1 class="text-center fs-6" data-v-9676a617>建立訂單</h1></li><li class="flex-grow-1 border-bottom border-2 h-0 mt-4" data-v-9676a617></li><li class="border-black p-2" data-v-9676a617><p class="border border-black p-2 fw-bold box d-flex align-items-center justify-content-center mx-auto mb-2" data-v-9676a617> 2 </p><p class="text-center" data-v-9676a617>填寫訂購資料</p></li><li class="flex-grow-1 border-bottom border-2 h-0 mt-4" data-v-9676a617></li><li class="border-black p-2" data-v-9676a617><p class="border border-black p-2 fw-bold box d-flex align-items-center justify-content-center mx-auto mb-2" data-v-9676a617> 3 </p><p class="text-center" data-v-9676a617>填寫付款資料</p></li><li class="flex-grow-1 border-bottom border-2 h-0 mt-4" data-v-9676a617></li><li class="border-black p-2" data-v-9676a617><p class="border border-black p-2 fw-bold box d-flex align-items-center justify-content-center mx-auto mb-2" data-v-9676a617> 4 </p><p class="text-center" data-v-9676a617>完成訂購</p></li></ul></section>',1),te={class:"row"},se={class:"col-lg-8"},ae={key:0,class:"d-flex gap-3 flex-column mb-4"},le={class:"d-flex flex-row flex-md-column gap-4"},oe=["src"],ne={class:"fw-medium title-card"},ce={class:"text-info mb-2"},de={class:"d-flex justify-content-end gap-2 align-items-center ms-md-4"},re=c(()=>e("p",{class:""},"價格",-1)),ue={class:"text-info mb-2"},ie=["onClick"],pe=c(()=>e("span",null,"刪除此項目",-1)),_e=["onClick"],be=["onClick"],fe={class:"d-flex gap-4"},he=["disabled"],ve={class:"col-md-6"},ye={class:"form-floating mb-3"},me=c(()=>e("label",{for:"name"},"訂票人名稱",-1)),xe={key:0,class:"text-danger"},ke={class:"col-md-6"},ge={class:"form-floating mb-3"},we=c(()=>e("label",{for:"phone"},"聯絡電話",-1)),De={key:0,class:"text-danger"},Ce={class:"col-12"},$e={class:"form-floating mb-3"},qe=c(()=>e("label",{for:"address"},"地址(實體票寄送地址)",-1)),je={key:0,class:"text-danger"},Fe={class:"d-flex gap-4"},Se=c(()=>e("p",null,"正在開啟第三方支付...",-1)),Ve={class:"border rounded p-3 mb-4"},Ie=c(()=>e("p",{class:"border-bottom pb-2 fs-5 fw-medium mb-2"},"訂購資料",-1)),Ne={class:"d-flex flex-column gap-2"},Te={class:"d-flex flex-column"},He={class:"border rounded p-3 mb-4"},Ee=c(()=>e("p",{class:"border-bottom pb-2 fs-5 fw-medium"},"聯絡人資訊",-1)),Le={class:"d-flex gap-2 flex-column my-2"},Pe=c(()=>e("li",null,null,-1)),Be={class:"col-lg-4"},ze={class:"border rounded-4 shadow-sm p-4 d-flex flex-column justify-content-between order-result"},Ae=c(()=>e("h2",{class:"fs-4 mb-3"},"訂單摘要",-1)),Me={class:"d-flex flex-column gap-2 mb-4"},Oe={class:"d-flex justify-content-between fs-6"},Re=c(()=>e("p",null,"小計",-1)),Ge=c(()=>e("li",{class:"d-flex justify-content-between fs-6"},[e("p",null,"今日節省總金額"),e("p",null,"$ 0 NTD")],-1)),Je=c(()=>e("li",{class:"d-flex justify-content-between fs-6"},[e("p",null,"運送"),e("p",null,"$ 0 NTD")],-1)),Ke=c(()=>e("li",{class:"d-flex justify-content-between fs-6"},[e("p",null,"稅款"),e("p",null,"$ 0 NTD")],-1)),Qe=c(()=>e("div",{class:"mb-4"},[e("label",{for:"cupon",class:"mb-2"}," 優惠碼(未開放) "),e("input",{id:"cupon",class:"w-100 border rounded-1 p-1",placeholder:"請輸入優惠碼",type:"text",disabled:"true"})],-1)),Ue={class:"d-flex justify-content-between align-items-center mb-4"},We=c(()=>e("p",{class:"fs-5 fw-medium"},"總金額",-1)),Xe={class:"fs-5 fw-medium"},Ye={__name:"PaymentView",setup(m){const q=O(),d=R(),j=(a,s)=>{if(typeof a=="string")return`${a.split("").splice(0,s).join("")}${"*".repeat(a.length-s)}`};let r=x(1);const P=x(null),B=x(null),i=x({}),F=G(),{callAlert:g}=J(),S=async()=>{var s;let a=[];d.cartData.forEach(l=>{if((l==null?void 0:l.quantity)>1)for(let p=0;p<(l==null?void 0:l.quantity);p++)a.push(l);else a.push(l)});try{await Y({userId:(s=F.userData)==null?void 0:s.id,name:i.value.name,phone:i.value.phone,address:i.value.address,total:D.value,orderList:a}),g({title:"訂單建立成功",type:"check"}),q.push({name:"ECPayment"})}catch(l){g({title:"訂單建立失敗",type:"error"}),console.error(l)}},w=a=>{if(r.value!==0)switch(a){case"increase":r.value+=1;break;case"decrease":r.value=r.value-1,console.log(r.value,r.value-1);break}},z=a=>{i.value={...i.value,...a},r.value+=1},A=a=>{i.value={...i.value,...a},r.value+=1},D=K(()=>{var s;let a=0;return(s=d.cartData)!=null&&s.length&&d.cartData.forEach(l=>{a+=l.price*l.quantity}),a}),C=(a,s)=>{var l,p,y;switch(a){case"increase":d.updateCartItem({...d.cartData[s],quantity:((l=d.cartData[s])==null?void 0:l.quantity)+1},s);break;case"decrease":if(((p=d.cartData[s])==null?void 0:p.quantity)===0)return;d.updateCartItem({...d.cartData[s],quantity:((y=d.cartData[s])==null?void 0:y.quantity)-1},s);break;case"delete":d.deleteCartItem(s);break}};return Q(()=>{var a;(a=F.userData)!=null&&a.id||(q.push({name:"Home"}),g({title:"建立訂單請勿重新整理頁面",type:"error"})),d.initCartData()}),(a,s)=>{var V,I,N;const l=$("DeleteCircleIcon"),p=$("VeeField"),y=$("VeeForm");return _(),b("main",Z,[ee,e("div",te,[e("div",se,[f(r)===1?(_(),b("ul",ae,[(_(!0),b(H,null,E(f(d).cartData,(t,o)=>{var h;return _(),b("li",{key:o,class:"border rounded p-3"},[e("div",le,[e("div",null,[e("img",{class:"img-box",src:t==null?void 0:t.image},null,8,oe)]),e("div",null,[e("p",ne,n(t==null?void 0:t.name),1),e("p",null,"("+n((h=t==null?void 0:t.ticketType)==null?void 0:h.ticketType)+")",1),e("p",ce,n(new Date(t==null?void 0:t.startDate).toLocaleDateString())+" ~ "+n(new Date(t==null?void 0:t.endDate).toLocaleDateString()),1)])]),e("div",de,[e("div",{class:u(`d-flex gap-2 ${t.quantity===0&&"d-none"}`)},[re,e("p",ue,"NT$ "+n((t==null?void 0:t.price)*(t==null?void 0:t.quantity)),1)],2),e("button",{onClick:T=>C("delete",o),class:u(`btn text-danger ${(t==null?void 0:t.quantity)!==0&&"d-none"}`),type:"button"},[v(l,{size:32}),pe],10,ie),e("button",{type:"button",onClick:T=>C("decrease",o),class:"btn btn-dark"}," - ",8,_e),e("p",null,n(t==null?void 0:t.quantity),1),e("button",{type:"button",onClick:T=>C("increase",o),class:"btn btn-dark"}," + ",8,be)])])}),128)),e("div",fe,[e("button",{onClick:s[0]||(s[0]=t=>w("decrease")),class:"btn btn-dark w-50",type:"button",disabled:f(r)===1}," 上一步 ",8,he),e("button",{class:u(`btn btn-dark w-50 ${f(r)!==1&&"d-none"}`),onClick:s[1]||(s[1]=t=>w("increase")),type:"button"}," 下一步 ",2)])])):k("",!0),v(y,{id:"userForm",class:u(`row ${f(r)===2?"d-flex":"d-none"}`),ref_key:"userForm",ref:P,onSubmit:A},{default:L(({meta:t,errors:o})=>[e("div",ve,[e("div",ye,[v(p,{id:"name",name:"name",class:u(`form-control ${o.name&&"is-invalid"}`),placeholder:"***",type:"text",rules:"max:20|required"},null,8,["class"]),me,o.name?(_(),b("small",xe,n(o.name.replace("name","訂票人名稱")),1)):k("",!0)])]),e("div",ke,[e("div",ge,[v(p,{id:"phone",name:"phone",class:u(`form-control ${o.phone&&"is-invalid"}`),placeholder:"***",type:"text",rules:"min:12|max:20|required"},null,8,["class"]),we,o.phone?(_(),b("small",De,n(o.phone.replace("phone","聯絡電話")),1)):k("",!0)])]),e("div",Ce,[e("div",$e,[v(p,{id:"address",name:"address",class:u(`form-control ${o.address&&"is-invalid"}`),placeholder:"***",type:"text",rules:"min:12|max:20|required"},null,8,["class"]),qe,o.address?(_(),b("small",je,n(o.address.replace("address","地址")),1)):k("",!0)])]),e("div",Fe,[e("button",{onClick:s[2]||(s[2]=h=>w("decrease")),class:"btn btn-dark w-50",type:"button"}," 上一步 "),e("button",{class:u("btn btn-dark w-50"),onClick:S,type:"button"}," 下一步 ")])]),_:1},8,["class"]),v(y,{id:"paymentForm",class:u(`row ${f(r)===3?"d-flex":"d-none"}`),ref_key:"paymentForm",ref:B,onSubmit:z},{default:L(({meta:t,errors:o})=>[Se]),_:1},8,["class"]),e("div",{class:u(`${f(r)===4?"d-block":"d-none"}`)},[e("div",Ve,[Ie,e("ul",Ne,[(_(!0),b(H,null,E((V=f(d))==null?void 0:V.cartData,(t,o)=>{var h;return _(),b("li",{class:"d-flex justify-content-between align-items-center",key:o},[e("div",Te,[e("p",null,n(t==null?void 0:t.name),1),e("p",null,n((h=t==null?void 0:t.ticketType)==null?void 0:h.ticketType),1)]),e("p",null,"x "+n(t==null?void 0:t.quantity),1)])}),128))])]),e("div",He,[Ee,e("ul",Le,[e("li",null,"訂購人："+n(j((I=i.value)==null?void 0:I.name,2)),1),e("li",null,"地址："+n(j((N=i.value)==null?void 0:N.address,2)),1),Pe])]),e("button",{onClick:S,class:"btn btn-dark w-100",type:"button"}," 訂購成功 ")],2)]),e("section",Be,[e("div",ze,[Ae,e("ul",Me,[e("li",Oe,[Re,e("p",null,"$ "+n(D.value)+" NTD",1)]),Ge,Je,Ke]),Qe,e("div",Ue,[We,e("p",Xe,"NTD $ "+n(D.value),1)])])])])])}}},tt=M(Ye,[["__scopeId","data-v-9676a617"]]);export{tt as default};
