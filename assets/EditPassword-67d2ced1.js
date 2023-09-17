import{M as V,a as $,s as C,E as F,r as f,P as B,b as D,d as c,f as s,Q as E,S as I,q as e,g as N,i as T,F as q,U as A,c as d,N as w,t as _}from"./index-d614a8a0.js";import{c as M,a as b,b as R}from"./index.esm-2ebd51d9.js";const U=s("h1",{class:"border-bottom mb-4 fs-4 pb-3 fw-medium"},"修改密碼",-1),H={class:"row"},O={class:"col-md-9"},Q={key:0,class:"d-flex gap-2 align-items-center"},j=s("label",{class:"form-label",for:"current_password"},"請先輸入目前密碼",-1),z={key:1},G={class:"d-flex flex-column"},J=s("label",{class:"form-label",for:"password"},"更改密碼",-1),K={class:"text-danger error-text"},L={class:"d-flex flex-column"},W=s("label",{class:"form-label",for:"confirmPassword"},"確認更改密碼",-1),X={class:"text-danger error-text"},Y=s("button",{class:"btn btn-dark ms-auto",type:"submit"}," 更改 ",-1),ts={__name:"EditPassword",setup(Z){const{errors:a,values:ss,setValues:es,handleSubmit:h,defineInputBinds:i,setErrors:v}=V({initialValues:{password:"",confirmPassword:""},validationSchema:M({password:b().required("請勿空白"),confirmPassword:b().oneOf([R("password")],"請確認密碼是否相同")})}),g=$(),u=C(),P=F(),l=f(""),n=f(!1),x=i("password"),k=i("confirmPassword"),S=async(t,o)=>{console.log("[change]",t,o);const r=await A({email:t,password:o,returnSecureToken:!0});r.data?(n.value=!0,localStorage.setItem("token",r.data.idToken)):n.value=!1},y=h(async t=>{(await B(localStorage.getItem("token"),t.password)).data?(u.logout(),P.callAlert({title:"密碼更改成功, 請重新登入！"},3e3),g.push({name:"Home"})):(console.error("伺服器錯誤, 請聯絡開發人員！"),v({server:["伺服器錯誤, 請聯絡開發人員！"]}))});return(t,o)=>{const r=D("VeeForm");return d(),c(q,null,[U,s("div",H,[s("div",O,[n.value===!1?(d(),c("div",Q,[s("div",null,[j,E(s("input",{"onUpdate:modelValue":o[0]||(o[0]=m=>l.value=m),placeholder:"請輸入目前密碼",class:"form-control",type:"password",id:"current_password"},null,512),[[I,l.value]])]),s("button",{onClick:o[1]||(o[1]=m=>{var p;return S((p=e(u).userData)==null?void 0:p.email,l.value)}),type:"button",class:"btn btn-dark mt-auto"}," 確認 ")])):(d(),c("div",z,[N(r,{class:"d-flex flex-column gap-3",onSubmit:e(y)},{default:T(()=>[s("div",G,[J,s("input",w({class:`form-control ${e(a).password&&"is-invalid"}`},e(x),{type:"password",name:"password",id:"password",placeholder:"請輸入更改密碼"}),null,16),s("small",K,_(e(a).password&&e(a).password),1)]),s("div",L,[W,s("input",w({class:`form-control ${e(a).confirmPassword&&"is-invalid"}`},e(k),{type:"password",name:"confirmPassword",id:"confirmPassword",placeholder:"請次確認更改密碼"}),null,16),s("small",X,_(e(a).confirmPassword&&e(a).confirmPassword),1)]),Y]),_:1},8,["onSubmit"])]))])])],64)}}};export{ts as default};
