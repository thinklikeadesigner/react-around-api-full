(this["webpackJsonparound-react"]=this["webpackJsonparound-react"]||[]).push([[0],{30:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),c=n(18),i=n.n(c),r=n(7),s=(n(30),n(17)),l=n(3),u=n(2),d=n(0);function m(e){var t=o.a.useState(""),n=Object(l.a)(t,2),a=n[0],c=n[1],i=o.a.useState(""),r=Object(l.a)(i,2),s=r[0],u=r[1];return Object(d.jsxs)(y,{onSubmit:function(t){t.preventDefault(),e.onUpdateCard({name:a,link:s}),u(""),c("")},isOpen:e.isOpen,onClose:e.onClose,name:"add",formname:"formAdd",title:"New Place",children:[Object(d.jsx)("input",{id:"title-input",minLength:"2",maxLength:"30",name:"name",type:"text",className:"form__input form__input_type_title",placeholder:"Title",required:!0,value:a,onChange:function(e){c(e.target.value)}}),Object(d.jsx)("span",{className:"form__input-error",id:"title-input-error"}),Object(d.jsx)("input",{id:"url-input",type:"url",name:"link",className:"form__input form__input_type_url",placeholder:"Image URL",required:!0,onChange:function(e){u(e.target.value)},value:s}),Object(d.jsx)("span",{className:"form__input-error",id:"url-input-error"})]})}var j=o.a.createContext();var p=function(e){var t,n,a=o.a.useContext(j),c=e.card.owner===a._id,i="card__delete-btn ".concat(c?"card_show-delete-btn card_show-delete-btn":"card__delete-btn"),r=null===(t=e.card.likes)||void 0===t?void 0:t.some((function(e){return e._id===a.id})),s="card__heart ".concat(r?" card__heart_active":"card__heart");return Object(d.jsxs)("li",{className:"card ",children:[Object(d.jsx)("img",{src:e.card.link,className:"card__pic",onClick:function(){e.onCardClick(e.card)},alt:e.card.name}),Object(d.jsx)("button",{"aria-label":"Delete Button",onClick:function(){e.onCardDelete(e.card)},className:i}),Object(d.jsxs)("div",{className:"card__text",children:[Object(d.jsx)("h2",{className:"card__title",children:e.card.name}),Object(d.jsxs)("div",{className:"card__likes_container",children:[Object(d.jsx)("button",{"aria-label":"Like Button",onClick:function(){e.onCardLike(e.card)},className:"".concat(s)}),Object(d.jsx)("p",{className:"card__likes_count",children:null===(n=e.card.likes)||void 0===n?void 0:n.length})]})]})]})};function _(e){var t=o.a.useState(""),n=Object(l.a)(t,2),a=n[0],c=n[1],i=o.a.useState(""),r=Object(l.a)(i,2),s=r[0],u=r[1];var m=o.a.useContext(j);return o.a.useEffect((function(){c(m.name||""),u(m.about||"")}),[m]),Object(d.jsxs)(y,{onSubmit:function(t){t.preventDefault(),e.onUpdateUser({name:a,about:s})},isOpen:e.isOpen,onClose:e.onClose,name:"edit",formname:"formEdit",title:"Edit Profile",children:[Object(d.jsx)("input",{id:"name-input",minLength:"2",maxLength:"40",name:"name",type:"text",className:"form__input form__input_type_name",placeholder:"Name",required:!0,value:a,onChange:function(e){c(e.target.value)}}),Object(d.jsx)("span",{className:"form__input-error",id:"name-input-error"}),Object(d.jsx)("input",{id:"job-input",minLength:"2",maxLength:"200",type:"text",name:"about",className:"form__input form__input_type_job",placeholder:"About Me",required:!0,value:s,onChange:function(e){u(e.target.value)}}),Object(d.jsx)("span",{className:"form__input-error",id:"job-input-error"})]})}function b(e){var t=o.a.useRef();return Object(d.jsxs)(y,{name:"avatar",formname:"formAvatar",title:"Avatar",onSubmit:function(n){n.preventDefault(),e.onUpdateAvatar({avatar:t.current.value}),t.current.value=""},isOpen:e.isOpen,onClose:e.onClose,children:[Object(d.jsx)("input",{id:"avatar-input",type:"url",name:"avatar",className:"form__input form__input_type_url form__input_type_avatar",placeholder:"Image URL",required:!0,ref:t}),Object(d.jsx)("span",{className:"form__input-error",id:"avatar-input-error"})]})}var f=n(19),h=n(20),O=n(23),g=n(22),x=function(e){Object(O.a)(n,e);var t=Object(g.a)(n);function n(){return Object(f.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return Object(d.jsx)("footer",{className:"footer",children:Object(d.jsx)("p",{className:"footer__copyright",children:"\xa9 2020 Around The U.S."})})}}]),n}(o.a.Component);function v(e){return Object(d.jsx)("header",{className:"header",children:Object(d.jsxs)("div",{className:"header__container ".concat(e.headerlogout),children:[Object(d.jsx)("div",{className:"header__logo","aria-label":"text logo that says Around'"}),e.children]})})}function N(e){var t=e.onCardClick,n=e.onAddPlace,a=e.onEditProfile,c=e.onEditAvatar,i=e.cards,s=e.onCardLike,l=e.onCardDelete,u=e.onSignOut,m=o.a.useContext(j);return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(v,{headerlogout:"header__container_log-out",children:Object(d.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(d.jsx)("p",{children:m.email}),Object(d.jsx)(r.b,{style:{textDecoration:"none",color:"#A9A9A9",paddingLeft:24},onClick:u,to:"/login",children:"Log Out"})]})}),Object(d.jsxs)("main",{className:"container",children:[Object(d.jsx)("section",{className:"profile",children:Object(d.jsxs)("div",{className:"profile__container",children:[Object(d.jsxs)("div",{className:"profile__info",children:[Object(d.jsx)("div",{className:"profile__avatar-btn",onClick:c,children:Object(d.jsx)("img",{src:m.avatar,className:"profile__pic",alt:"avatar"})}),Object(d.jsxs)("div",{className:"profile__text",children:[Object(d.jsx)("h1",{className:"profile__name",children:m.name}),Object(d.jsx)("button",{type:"button","aria-label":"Profile Edit Button",className:"form_button profile__edit-btn",onClick:a}),Object(d.jsx)("p",{className:"profile__job",children:m.about})]})]}),Object(d.jsx)("button",{type:"button","aria-label":"Card Add Button",id:"addButton",className:"form_button profile__add-btn",onClick:n})]})}),Object(d.jsx)("section",{className:"cards",children:Object(d.jsx)("ul",{className:"cards__list",children:i.map((function(e){return Object(d.jsx)(p,{onCardLike:s,onCardDelete:l,onCardClick:t,card:e},e._id)}))})})]})]})}function y(e){return Object(d.jsx)("div",{className:"modal modal_type_".concat(e.name," ").concat(e.isOpen?"modal_open":""),children:Object(d.jsxs)("div",{className:"modal__container",children:[Object(d.jsxs)("form",{onSubmit:e.onSubmit,action:"#",className:"form form_".concat(e.formname),name:e.name,noValidate:!0,children:[Object(d.jsx)("h2",{className:"form__title",children:e.title}),e.children,Object(d.jsx)("button",{type:"submit",className:"form__button ".concat(e.name,"-submit"),children:"Save"})]}),Object(d.jsx)("button",{"aria-label":"Close Button",type:"reset",className:"modal__close-button modal__close-button_".concat(e.name),onClick:e.onClose})]})})}function C(e){return Object(d.jsx)("div",{className:"modal modal_type_pic ".concat(e.isOpen?"modal_open":""),children:Object(d.jsxs)("div",{className:"modal__container",children:[Object(d.jsx)("button",{"aria-label":"Close Button ",type:"button",className:"modal__close-button modal__close-button_pic",onClick:e.onClose}),Object(d.jsxs)("figure",{className:"modal__figure",children:[Object(d.jsx)("img",{src:e.figimage,className:"modal__img",alt:e.figcaption}),Object(d.jsx)("figcaption",{className:"modal__caption",children:e.figcaption})]})]})})}var S=n(24),k=n(25),w=function(e){var t=e.component,n=Object(k.a)(e,["component"]);return Object(d.jsx)(u.b,{children:function(){return n.loggedIn?Object(d.jsx)(t,Object(S.a)({},n)):Object(d.jsx)(u.a,{to:"/register"})}})};function A(e){if(e.ok)return e.json();Promise.reject("Error!"+e.statusText)}var L="http://api.final-countdown.students.nomoreparties.site";function T(e){var t=e.onSetEmail,n=e.onSetPassword,a=e.onRegister,o=e.message,c=e.email,i=e.password;return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(v,{headerlogout:"header__container_log-out",children:Object(d.jsx)("div",{style:{display:"flex",alignItems:"center"},children:Object(d.jsx)(r.b,{style:{textDecoration:"none",color:"white",paddingLeft:24},to:"/login",children:"Log In"})})}),Object(d.jsx)("div",{className:"sign-in__container",children:Object(d.jsx)("div",{className:"modal__container",children:Object(d.jsxs)("form",{onSubmit:a,action:"#",className:"form form_sign_up }",name:"register",noValidate:!0,children:[Object(d.jsx)("h2",{className:"form__title form__title_sign_up",children:"Sign Up"}),Object(d.jsx)("span",{style:{color:"red"},children:o}),Object(d.jsx)("input",{id:"email-input",minLength:"2",maxLength:"40",name:"email",type:"text",className:"form__input form__input_sign_up form__input_type_email",placeholder:"Email",required:!0,value:c,onChange:t}),Object(d.jsx)("input",{id:"password-input",minLength:"2",maxLength:"200",name:"password",type:"password",className:"form__input form__input_sign_up form__input_type_password",placeholder:"Password",required:!0,value:i,onChange:n}),Object(d.jsx)("button",{type:"submit",className:"form__button form__button_sign_up register-submit ",children:"Sign up"}),Object(d.jsx)(r.b,{style:{textDecoration:"none",margin:20,textAlign:"center"},to:"/login",type:"submit",className:"form__button form__button_member_log_in form__button_sign_up ",children:"Already a member? Log in here!"})]})})})]})}function E(e){e.message;var t=e.email,n=e.onSetEmail,a=e.password,o=e.onSetPassword,c=e.onLogin;e.onInfoToolTip;return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(v,{headerlogout:"header__container_log-out",children:Object(d.jsx)("div",{style:{display:"flex",alignItems:"center"},children:Object(d.jsx)(r.b,{style:{textDecoration:"none",color:"white",paddingLeft:24},to:"/register",children:"Sign Up"})})}),Object(d.jsx)("div",{className:"sign-in__container",children:Object(d.jsx)("div",{className:"modal__container",children:Object(d.jsxs)("form",{onSubmit:c,action:"#",className:"form form_sign_up\n           }",name:"login",noValidate:!0,children:[Object(d.jsx)("h2",{className:"form__title form__title_sign_up",children:"Log In"}),Object(d.jsx)("input",{value:t,onChange:n,id:"email-input",minLength:"2",maxLength:"200",type:"text",name:"email",className:"form__input form__input_sign_up form__input_type_email",placeholder:"Email",required:!0}),Object(d.jsx)("input",{value:a,onChange:o,id:"password-input",minLength:"2",maxLength:"200",type:"password",name:"password",className:"form__input form__input_sign_up form__input_type_job",placeholder:"Password",required:!0,typeof:"password"}),Object(d.jsx)("button",{type:"submit",className:"form__button form__button_sign_up ",children:"Log in"}),Object(d.jsx)(r.b,{style:{textDecoration:"none",margin:20,textAlign:"center"},to:"/register",type:"submit",className:"form__button form__button_member_log_in form__button_sign_up ",children:"Not a member yet? Sign up here!"})]})})})]})}var I="http://api.final-countdown.students.nomoreparties.site";function P(e){if(e.ok)return e.json();Promise.reject("Error!"+e.statusText)}var D=function(e){return Object(d.jsx)("div",{className:"modal modal_type_".concat(e.name," ").concat(e.isOpen?"modal_open":""),children:Object(d.jsxs)("div",{className:"modal__container",children:[Object(d.jsxs)("div",{className:"infotooltip__container",children:[Object(d.jsx)("div",{className:e.isItSuccess?"info-tool-tip-success":"info-tool-tip-failure"}),Object(d.jsx)("h1",{className:"infotooltip__message",children:e.isItSuccess?"Success! You have now been registered.":"Oops, something went wrong! Please try again."})]}),Object(d.jsx)("button",{"aria-label":"Close Button",type:"reset",className:"modal__close-button modal__close-button_".concat(e.name),onClick:e.onClose})]})})};var B=function(){var e=Object(u.g)(),t=Object(a.useState)([]),n=Object(l.a)(t,2),o=n[0],c=n[1],i=Object(a.useState)(!1),r=Object(l.a)(i,2),p=r[0],f=r[1],h=Object(a.useState)(!1),O=Object(l.a)(h,2),g=O[0],v=O[1],S=Object(a.useState)(!1),k=Object(l.a)(S,2),B=k[0],U=k[1],q=Object(a.useState)(!1),z=Object(l.a)(q,2),F=z[0],J=z[1],R=Object(a.useState)(!1),V=Object(l.a)(R,2),H=V[0],M=V[1],Y=Object(a.useState)(!1),G=Object(l.a)(Y,2),K=G[0],Q=G[1],W=Object(a.useState)({}),X=Object(l.a)(W,2),Z=X[0],$=X[1],ee=Object(a.useState)(!1),te=Object(l.a)(ee,2),ne=te[0],ae=te[1],oe=Object(a.useState)(""),ce=Object(l.a)(oe,2),ie=ce[0],re=ce[1],se=Object(a.useState)(""),le=Object(l.a)(se,2),ue=le[0],de=le[1],me=Object(a.useState)(""),je=Object(l.a)(me,2),pe=je[0],_e=je[1],be=Object(a.useState)(!1),fe=Object(l.a)(be,2),he=fe[0],Oe=fe[1],ge=Object(a.useState)(!1),xe=Object(l.a)(ge,2),ve=xe[0],Ne=xe[1];function ye(){re(""),de(""),_e("")}function Ce(e){de(e.target.value)}function Se(e){re(e.target.value)}function ke(){Oe(!0)}function we(){v(!1),U(!1),J(!1),Q(!1),f(!1),M(!1),Oe(!1)}return Object(a.useEffect)((function(){var t,n=localStorage.getItem("token");n&&(console.log("token",n),console.log("has token",n),(t=n,fetch(I+"/users/me",{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(t)}}).then(P).then((function(e){return e}))).then((function(e){if(e)return $(e);_e("400 - one or more of the fields were not provided")})).then(ae(!0)).then((function(){e.push("/main")})).catch((function(e){console.log(e.message)})),fetch(L+"/cards",{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))}}).then((function(e){return A(e)})).then((function(e){c(e)})).catch((function(e){console.log(e.message)})))}),[e,ne]),Object(a.useEffect)((function(){localStorage.getItem("token")&&e.push("/login")}),[e]),Object(d.jsx)("div",{className:"page",children:Object(d.jsxs)(j.Provider,{value:Z,children:[Object(d.jsxs)(u.d,{children:[Object(d.jsx)(w,{path:"/main",loggedIn:ne,cards:o,component:N,onEditProfile:function(){U(!0)},onAddPlace:function(){v(!0)},onEditAvatar:function(){J(!0)},onDeleteCard:function(){Q(!0)},onCardClick:function(e){f(e),M(!0)},onCardDelete:function(e){var t;(t=e._id,fetch(L+"/cards/"+t,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))},method:"DELETE"}).then((function(e){return A(e)}))).then((function(){var t=Object(s.a)(o).filter((function(t){return t._id!==e._id}));c(t)})).catch((function(e){console.log(e.message)}))},onCardLike:function(e){var t,n=null===(t=e.likes)||void 0===t?void 0:t.some((function(e){return e._id===Z.id}));(function(e,t){var n;return n=t?"PUT":"DELETE",fetch(L+"/cards/likes/"+e,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))},method:n}).then((function(e){return A(e)}))})(e._id,!n).then((function(t){var n=o.map((function(n){return n._id===e._id?t:n}));c(n)})).catch((function(e){console.log(e.message)}))},onSignOut:function(){localStorage.removeItem("token"),e.push("/login"),ae(!1)}}),Object(d.jsx)(u.b,{path:"/register",children:Object(d.jsx)(T,{message:pe,onSetEmail:Se,onSetPassword:Ce,onRegister:function(t){t.preventDefault(),ue&&ie&&function(e,t){return fetch(I+"/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t})}).then(P).then((function(e){return e}))}(ie,ue).then((function(e){return Ne(!0),_e("Success! You have now been registered."),ke(),e})).then(ye).then(e.push("/login")).catch((function(e){400===e.status?(_e("One of the fields was filled in incorrectly"),Ne(!1),ke()):403===e.status&&(_e("This user already exists!"),Ne(!1),ke())}))}})}),Object(d.jsx)(u.b,{path:"/login",children:Object(d.jsx)(E,{onSetEmail:Se,message:pe,onSetPassword:Ce,onLogin:function(t){t.preventDefault(),console.log(ve),ie&&ue||(_e("400 - one or more of the fields were not provided"),Ne(!1),ke()),function(e,t){return fetch(I+"/signin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t})}).then(P).then((function(e){if(e.token)return localStorage.setItem("token",e.token),e}))}(ie,ue).then((function(e){ae(!0)})).then(ye).then((function(){e.push("/login")})).catch((function(){Ne(!1),_e("Oops, something went wrong! Please try again."),ke()}))},onInfoToolTip:ke})}),Object(d.jsx)(u.b,{exact:!0,path:"/",children:ne?Object(d.jsx)(u.a,{to:"/main"}):Object(d.jsx)(u.a,{to:"/login"})})]}),Object(d.jsx)(x,{}),Object(d.jsx)(_,{isOpen:B,onClose:we,onUpdateUser:function(e){(function(e){var t=e.name,n=e.about;return fetch(L+"/users/me",{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))},body:JSON.stringify({name:t,about:n})}).then((function(e){return A(e)}))})({name:e.name,about:e.about}).then((function(e){return $(e)})).then(we).catch((function(e){console.log(e.message)}))}}),Object(d.jsx)(b,{isOpen:F,onClose:we,onUpdateAvatar:function(e){(function(e){var t=e.avatar;return fetch(L+"/users/me/avatar",{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))},body:JSON.stringify({avatar:t})}).then((function(e){return A(e)}))})({avatar:e.avatar}).then((function(e){return $(e)})).then(we).catch((function(e){console.log(e.message)}))}}),Object(d.jsx)(m,{isOpen:g,onClose:we,onUpdateCard:function(e){(function(e){var t=e.name,n=e.link;return fetch(L+"/cards",{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))},method:"POST",body:JSON.stringify({name:t,link:n})}).then((function(e){return A(e)}))})(e).then((function(e){return c([e].concat(Object(s.a)(o)))})).then(we).catch((function(e){console.log(e.message)}))}}),Object(d.jsx)(y,{isOpen:K,onClose:we,name:"delete",title:"Are you sure?"}),Object(d.jsx)(C,{isOpen:H,onClose:we,figimage:p.link,figcaption:p.name}),Object(d.jsx)(D,{isOpen:he,isItSuccess:ve,onClose:we,message:pe})]})})},U=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,41)).then((function(t){var n=t.getCLS,a=t.getFID,o=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),o(e),c(e),i(e)}))};i.a.render(Object(d.jsx)(o.a.StrictMode,{children:Object(d.jsx)(r.a,{children:Object(d.jsx)(B,{})})}),document.getElementById("root")),U()}},[[40,1,2]]]);
//# sourceMappingURL=main.e9d814f0.chunk.js.map