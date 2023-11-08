"use strict";(self.webpackChunkrunit=self.webpackChunkrunit||[]).push([[397],{330:function(e,t,n){var s=n(9439),a=n(2791),i=n(18),r=n(4035),c=n(488),l=n(6030),o=n(5178),d=n(271),u=n(7689),m=n(1143),h=n(5806),x=n(184);t.Z=function(){var e=(0,l.I0)(),t=(0,u.s0)(),n=(0,m.f)().currentUser,j=(0,a.useState)(!1),f=(0,s.Z)(j,2),g=f[0],v=f[1];return n&&0!==Object.keys(n).length?(0,x.jsxs)(i.Z,{show:!n.is_email_verified,variant:"danger",children:[(0,x.jsxs)("h6",{className:"d-flex justify-content-between",children:["Verify your account ",(0,x.jsx)(o.O,{})]}),(0,x.jsx)("small",{children:"Verify your account to start running it! \ud83d\ude80"}),(0,x.jsx)(r.Z,{type:"submit",btnStyle:"formBtn cta_button mt-3 d-block",variant:"danger",isLoading:g,onClick:function(n){n.preventDefault(),e((0,c.Rv)(v)).then((function(e){e.status===d.OK&&t("/".concat(h.xd))}))},placeholder:(0,x.jsx)("div",{className:"d-flex align-items-center fw-bold",children:"Verify"})})]}):null}},4397:function(e,t,n){n.r(t),n.d(t,{default:function(){return G}});var s=n(9439),a=n(2791),i=n(7022),r=n(9743),c=n(2677),l=n(5070),o=n(4165),d=n(1413),u=n(5861),m=n(5313),h=n(6030),x=n(5551),j=n(4680),f=n(4035),g=n(2557),v=n(271),p=n(7571),b=n(6833),N=n(5178),y=n(7689),Z=n(4855),S=n(5806),D=n(4327),w=n(8554),k=n(6217),C=n(7892),_=n.n(C),T=n(184);var I=function(e){var t=(0,h.I0)(),n=(0,y.s0)(),i=(0,a.useRef)(0),c={title:"",maxMember:0,details:"",date:"",time:""},C=(0,p.n)(c),I=C.formValue,L=C.setFormValue,B=C.handleFieldChange,M=(0,a.useState)(!1),E=(0,s.Z)(M,2),F=E[0],O=E[1],P=(0,a.useState)(!1),V=(0,s.Z)(P,2),U=V[0],$=V[1],z=new Date(I.date),H=(0,a.useState)(!1),K=(0,s.Z)(H,2),R=K[0],q=K[1],Q=(0,a.useState)(!1),W=(0,s.Z)(Q,2),Y=W[0],A=W[1];(0,a.useEffect)((function(){/\S/.test(I.details)?O(!1):O(!0)}),[I.details]);var X=function(){var e=(0,u.Z)((0,o.Z)().mark((function e(s){var a;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s.preventDefault(),a=(0,d.Z)((0,d.Z)({},I),{},{year:z.getFullYear(),month:z.getMonth()+1,day:z.getDate(),hour:""!==I.time?parseInt(I.time.split(":")[0]):"",minute:""!==I.time?parseInt(I.time.split(":")[1]):""}),t((0,x.My)(a,$)).then((function(e){var s=e.status,a=e.data;s===v.OK&&(i.current.reset(),L(c),(0,j.uY)((0,g.Mh)(a.data.details)),t({type:Z.jN}),n("/".concat(S.Ks,"/").concat(a.data.id,"?page=1")))}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,a.useEffect)((function(){0!==Object.keys(e.suggestion).length&&L({title:"".concat(e.suggestion.title," - ").concat(e.suggestion.category),details:"Link: <a href=".concat(e.suggestion.link,' targe="_blank">').concat(e.suggestion.title,"</a><br/>Location: ").concat(e.suggestion.location,"<br/>Category: ").concat(e.suggestion.category,"\n\n"),date:new Date(e.suggestion.time).toISOString().split("T")[0],time:new Date(e.suggestion.time).toLocaleTimeString("en-US",{timeStyle:"short",hour12:!1}),maxMember:I.maxMember})}),[e.suggestion,L]),(0,T.jsxs)(l.Z,{className:"create_event-card",children:[(0,T.jsx)(l.Z.Header,{children:(0,T.jsx)("p",{className:"fw-bold m-0",children:"Create event"})}),(0,T.jsx)(l.Z.Body,{children:(0,T.jsxs)(m.Z,{onSubmit:function(e){X(e)},ref:i,children:[(0,T.jsxs)("div",{className:"new-post-container",children:[(0,T.jsxs)(b.c,{formId:"formBasicTitle",children:[(0,T.jsx)(b.l,{children:"Event Title"}),(0,T.jsx)(m.Z.Control,{type:"title",name:"title",value:I.title,onChange:B,required:!0})]}),(0,T.jsxs)(r.Z,{children:[(0,T.jsxs)(b.c,{formId:"formBasicNumber",customStyle:"col-md-4",children:[(0,T.jsx)(b.l,{children:"Size"}),(0,T.jsx)(m.Z.Control,{type:"number",name:"maxMember",className:"mb-3",onChange:B,min:"2",required:!0})]}),(0,T.jsxs)(b.c,{formId:"formBasicTime",customStyle:"col-md-4",children:[(0,T.jsx)(b.l,{children:"Time"}),(0,T.jsx)(w.j,{className:"dateTimePicker mb-3",open:Y,onClose:function(){return A(!1)},value:I.time.$d||_()(I.time,"HH:mm"),onChange:function(e){(0,k.Ws)(new Date(e).toLocaleTimeString("en-US",{timeStyle:"short",hour12:!1}),L,["time"])},slots:{openPickerButton:function(){return""}},slotProps:{textField:{onClick:function(){return A(!0)}}}})]}),(0,T.jsxs)(b.c,{formId:"formBasicDate",customStyle:"col-md-4",children:[(0,T.jsx)(b.l,{children:"Date"}),(0,T.jsx)(D.M,{className:"dateTimePicker mb-3",open:R,onClose:function(){return q(!1)},value:I.date.$d||_()(I.date),onChange:function(e){(0,k.Ws)(e,L,["date"])},disablePast:!0,slots:{openPickerButton:function(){return""}},slotProps:{textField:{onClick:function(){return q(!0)}}}})]})]})]}),(0,T.jsxs)("div",{className:"d-flex justify-content-between mt-3",children:[(0,T.jsx)(N.O,{}),(0,T.jsx)(f.Z,{type:"submit",btnStyle:"formBtn cta_button",variant:"primary",formValidation:F,isLoading:U,placeholder:(0,T.jsx)("div",{className:"d-flex align-items-center",children:"Create event"})})]})]})})]})},L=n(1087),B=n(6479),M=n(5892),E=n(9235),F=n(2004),O=n(6104);var P=function(e){return(0,T.jsxs)("div",{className:"event-card_dash",children:[(0,T.jsxs)("div",{className:"d-flex",id:"card_header",children:[(0,T.jsx)(B.Z,{id:"profile-popover",data:e.eventData.userName,children:(0,T.jsx)(E.Q,{image:e.eventData.gravatarImage,imgClass:"me-2 cursor-event",id:"card-img"})}),(0,T.jsx)(F.R,{username:e.eventData.userName,size:"sm"}),(0,T.jsx)("div",{className:"me-auto",children:(0,T.jsxs)("span",{className:"card-timestamp text-muted align-self-center",children:[e.eventData.humanTimeDiffCreatedAt," ago"]})}),(0,T.jsx)(k.OE,{eventData:e.eventData}),(0,T.jsx)(O.$,{children:(0,T.jsx)(k.zq,{eventData:e.eventData,btnStyleFull:!1})})]}),(0,T.jsxs)(l.Z,{children:[(0,T.jsxs)(l.Z.Body,{children:[(0,T.jsx)("div",{className:"event-brief mt-1",children:(0,T.jsxs)("h4",{children:[e.eventData.title," "]})}),(0,T.jsx)("div",{className:"mt-2",children:(0,T.jsx)("p",{className:"text-muted content_sm1",dangerouslySetInnerHTML:{__html:e.eventData.details}})}),(0,T.jsx)(k.sT,{content:e.eventData.timeToEvent,eventStatus:e.eventData.eventStatus})]}),(0,T.jsx)(l.Z.Footer,{children:(0,T.jsxs)(L.rU,{to:"/".concat(S.Ks,"/").concat(e.eventData.id),children:["Details ",(0,T.jsx)(M.ol,{})]})})]})]})},V=n(3574),U=n(6462),$=n(1398),z=n(5736),H=n(3360),K=n(1275),R=n(1518),q=function(e){var t=(0,h.I0)(),n=(0,a.useState)([]),i=(0,s.Z)(n,2),r=i[0],c=i[1],l=(0,a.useState)(!1),d=(0,s.Z)(l,2),m=d[0],x=d[1];(0,a.useEffect)((function(){t(function(e,t){return function(){var n=(0,u.Z)((0,o.Z)().mark((function n(s){var a;return(0,o.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a="/event/createSuggestions/".concat(e,"/"),n.next=3,(0,R.r_)(s,a,null,Z.NR,t);case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()}(e||1,x))}),[t,e]);var j=(0,h.v9)((function(e){return e.suggestions.suggestEvent}));return(0,a.useEffect)((function(){j&&c(j)}),[j]),{suggestData:r,isLoading:m}},Q=n(5779),W=function(e){return(0,T.jsx)(B.Z,{id:"popover-basic",popoverBody:(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)("div",{className:"p-2",children:[(0,T.jsx)("span",{className:"fw-bold",children:"Location: "}),(0,T.jsx)("span",{children:e.content.location})]}),(0,T.jsxs)("div",{className:"p-2",children:[(0,T.jsx)("span",{className:"fw-bold",children:"Date: "}),(0,T.jsx)("span",{children:new Date(e.content.timeStamp).toLocaleDateString()})]}),(0,T.jsxs)("div",{className:"p-2",children:[(0,T.jsx)("span",{className:"fw-bold",children:"Time: "}),(0,T.jsx)("span",{children:new Date(e.content.timeStamp).toLocaleTimeString("en-US",{timeStyle:"short",hour12:!0})})]}),(0,T.jsx)("div",{className:"p-2",children:(0,T.jsx)("a",{href:e.content.link,rel:"noreferrer",target:"_blank",children:"More Information"})})]}),childrenClass:"username_tags align-self-center",children:e.icon})};var Y=function(e){var t=(0,a.useState)(""),n=(0,s.Z)(t,2),i=n[0],r=n[1],c=q(1);return(0,a.useEffect)((function(){e.userData&&i&&e.userData(i)}),[i,e]),(0,T.jsx)(T.Fragment,{children:(0,T.jsxs)($.Z,{as:"ol",className:"mb-3 suggested",children:[(0,T.jsx)(Q.M,{children:"Suggestions"}),c.suggestData.data?c.suggestData.data.map((function(e,t){return(0,T.jsxs)($.Z.Item,{as:"li",className:"p-3",children:[(0,T.jsxs)("div",{className:"d-flex justify-content-between gap-1 align-items-start",children:[(0,T.jsx)("div",{className:"me-auto",children:(0,T.jsx)("span",{className:"fw-bold",children:e.title})}),(0,T.jsx)(W,{content:{location:e.location,timeStamp:e.time,link:e.link},icon:(0,T.jsx)(M.d,{})})]}),(0,T.jsx)("div",{className:"mt-3",children:(0,T.jsx)("img",{src:e.image,alt:"suggested-event-img",width:"100%"})}),(0,T.jsxs)("div",{className:"d-flex justify-content-between align-items-start mt-4",children:[(0,T.jsx)(z.Z,{bg:"secondary",children:e.category}),(0,T.jsx)(O.$,{children:(0,T.jsx)(H.Z,{className:"d-block",onClick:function(){return r(e)},size:"sm",children:"Event it"})})]})]},t)})):c.isLoading?(0,T.jsx)(K.O,{}):(0,T.jsx)("h6",{className:"m-1",children:"No suggestions at this moment...."})]})})},A=n(330),X=n(7381);var G=function(){var e=(0,U.bi)(),t=e.count,n=e.hasMore,o=e.load,d=e.eventData,u=e.handleLoadMore,m=(0,a.useState)({}),h=(0,s.Z)(m,2),x=h[0],j=h[1];return(0,T.jsx)("div",{style:{position:"relative"},children:(0,T.jsxs)("div",{className:"dash-container",id:"main",children:[(0,T.jsx)("div",{className:"sidebar",children:(0,T.jsx)("div",{className:"sidebar-wrapper",children:(0,T.jsx)("div",{className:"sidebar_left",children:(0,T.jsx)(Y,{userData:function(e){e&&j(e)}})})})}),(0,T.jsx)("div",{className:"content",children:(0,T.jsxs)(i.Z,{children:[(0,T.jsxs)("div",{children:[(0,T.jsx)(O.$,{children:(0,T.jsx)(I,{suggestion:x})}),(0,T.jsx)(r.Z,{xs:1,sm:1,md:1,children:t>0?d.map((function(e,t){return(0,T.jsx)(c.Z,{children:(0,T.jsx)(P,{eventData:e})},t)})):o||0!==t?(0,T.jsx)(c.Z,{children:(0,T.jsx)(K.g,{})}):(0,T.jsx)("div",{children:(0,T.jsx)("h1",{children:"Nothing yet..."})})})]}),n&&(0,T.jsx)("div",{className:"w-100 d-flex justify-content-center mb-3",children:(0,T.jsx)(f.Z,{type:"submit",btnStyle:"formBtn cta_button d-block mt-2",variant:"primary",isLoading:o,onClick:u,placeholder:(0,T.jsx)("div",{className:"d-flex align-items-center justify-content-center",children:"Show more"})})})]})}),(0,T.jsx)("div",{className:"sidebar",children:(0,T.jsx)("div",{className:"sidebar-wrapper ",children:(0,T.jsxs)("div",{className:"sidebar_right",children:[(0,T.jsx)(A.Z,{}),(0,T.jsx)(l.Z,{children:(0,T.jsx)(l.Z.Body,{children:(0,T.jsx)(V.Z,{})})}),(0,T.jsx)(N.X,{successTypes:X.Ql})]})})})]})})}}}]);
//# sourceMappingURL=397.cfd96271.chunk.js.map