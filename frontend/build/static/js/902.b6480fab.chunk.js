"use strict";(self.webpackChunkrunit=self.webpackChunkrunit||[]).push([[902],{1902:function(e,t,n){n.r(t),n.d(t,{SingleEventContext:function(){return oe},default:function(){return me}});var s=n(9439),a=n(2791),r=n(7022),i=n(9140),c=n(7689),l=n(1087),d=n(9839),o=n(6144),m=n(3360),u=n(4165),x=n(5861),h=n(5313),j=n(5551),v=n(6030),f=n(4035),p=n(2254),Z=n(2557),g=n(5892),N=n(184);var b=function(e,t){t.handleUpate;var n=(0,v.I0)(),r=(0,c.UO)(),l=(0,a.useState)(e.title),d=(0,s.Z)(l,2),o=d[0],m=d[1],b=(0,a.useState)(e.maxMembers),y=(0,s.Z)(b,2),S=y[0],w=y[1],C=(0,a.useState)(e.details),I=(0,s.Z)(C,2),k=I[0],D=I[1],_=function(){var t=(0,x.Z)((0,u.Z)().mark((function t(s){var a;return(0,u.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:s.preventDefault(),a={title:o,maxMember:S,details:k},n((0,j.eJ)(e.eventId,a)).then((function(){n((0,j.Bk)(r.id)),(0,p.uY)((0,Z.M)(k))})),e.handleUpate();case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return(0,N.jsxs)(h.Z,{onSubmit:function(e){_(e)},children:[(0,N.jsxs)(i.Z,{className:e.cardStyle,children:[(0,N.jsx)(i.Z.Header,{children:(0,N.jsx)("h3",{className:"fw-bold m-0",children:"Update event"})}),(0,N.jsxs)(i.Z.Body,{children:[(0,N.jsxs)(h.Z.Group,{className:"d-flex mb-3",children:[(0,N.jsx)(h.Z.Control,{className:"me-2",type:"title",placeholder:"Event Title",value:o,onChange:function(e){return m(e.target.value)},required:!0}),(0,N.jsx)(h.Z.Control,{type:"number",placeholder:"Maximum Members",value:S||"",onChange:function(e){return w(parseInt(e.target.value))},min:"2",required:!0})]}),(0,N.jsx)(h.Z.Group,{children:(0,N.jsx)(h.Z.Control,{spellCheck:!0,placeholder:"What's on your mind?",as:"textarea",value:k||"",onChange:function(e){return D(e.target.value)},required:!0})}),(0,N.jsxs)("div",{className:"d-flex justify-content-between mt-3",children:[(0,N.jsx)(f.Z,{type:"",btnStyle:"postBtn-placements",variant:"primary",onClick:e.handleUpate,placeholder:(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)(g.X1,{}),"Cancel"]})}),(0,N.jsx)(f.Z,{type:"submit",btnStyle:"postBtn-placements cta_button",variant:"primary",formValidation:""===o||""===S||""===k||"<p><br></p>"===k,isLoading:"",placeholder:(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)(g.k4,{}),"Publish"]})})]})]})]})," "]})},y=n(1398),S=n(564),w=n(8175),C=n(9190),I=n(2060);var k=function(e){var t=a.createRef(),n=(0,C.nL)(e.eventId),s=(0,I.vi)(n);return(0,N.jsx)(w.Z,{ref:t,customBtn:"",btnIcon:(0,N.jsxs)("div",{className:"d-flex img-group",children:[s.slice(0,4).map((function(e){return(0,N.jsx)("img",{src:e.gravatarImage,className:"members-img ",alt:"Img"},e.id)})),s.length>4?(0,N.jsxs)("span",{className:"members-count",children:["+",s.length-4]}):""]}),title:"Members",children:(0,N.jsx)(h.Z,{children:(0,N.jsx)("div",{className:"mt-3",children:0===n.length?(0,N.jsx)("strong",{children:"Nobody here yet...."}):(0,N.jsx)(y.Z,{className:"members-list",variant:"flush",children:s.map((function(e){return(0,N.jsx)(y.Z.Item,{children:(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)(S.Q,{image:e.gravatarImage}),(0,N.jsxs)("div",{className:"ms-4",children:[(0,N.jsxs)(l.rU,{to:{pathname:"/profile",search:"user=".concat(e.username)},children:["@",e.username]}),(0,N.jsx)("small",{className:"d-block text-muted",children:e.email})]})]})},e.id)}))})})})})},D=n(3585),_=n(1275);var B=function(e){var t=(0,v.I0)(),n=(0,c.s0)(),r=(0,a.useRef)(),i=(0,a.useState)(!1),l=(0,s.Z)(i,2),d=l[0],o=l[1],f=(0,a.useState)({}),p=(0,s.Z)(f,2),Z=p[0],b=p[1],y=function(){var s=(0,x.Z)((0,u.Z)().mark((function s(a){return(0,u.Z)().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:a.preventDefault(),t((0,j.xC)(e.eventId,o,b,n));case 2:case"end":return s.stop()}}),s)})));return function(e){return s.apply(this,arguments)}}();return(0,N.jsxs)(w.Z,{ref:r,customBtn:"",btnIcon:(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)(g.HG,{}),"Delete"]}),title:"Delete Event",error:Z,children:[" ",(0,N.jsxs)(h.Z,{onSubmit:function(e){y(e)},children:[(0,N.jsxs)("div",{className:"mt-3",children:["Are you sure you want to delete ",(0,N.jsx)("strong",{children:e.eventTitle}),"? Any affiliations to this event will also be nullified."]}),(0,N.jsxs)("div",{className:"mt-3",children:[(0,N.jsx)(m.Z,{type:"submit",onClick:function(){return r.current.setModalShow()},children:d?(0,N.jsx)(_.g,{}):(0,N.jsx)(N.Fragment,{children:"Remove"})}),(0,N.jsx)(m.Z,{className:"me-3 btn-cancel",onClick:function(){return r.current.setModalShow()},children:"Back"})]})]})]})},T=n(8974);var M=function(e){var t=(0,v.I0)(),n=(0,a.useRef)(),r=(0,a.useState)(""),i=(0,s.Z)(r,2),l=i[0],d=i[1],o=(0,a.useState)(!1),f=(0,s.Z)(o,2),Z=f[0],b=f[1],y=(0,a.useState)({}),S=(0,s.Z)(y,2),I=S[0],k=S[1],D=(0,c.UO)(),B=(0,C.nL)(e.eventId),M=function(){var n=(0,x.Z)((0,u.Z)().mark((function n(s){var a;return(0,u.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:s.preventDefault(),a={status:l},t((0,j.Nf)(e.eventId,a,b,k)).then((function(){t((0,j.Bk)(D.id)),(0,p.uY)(B.map((function(e){return e.username})))}));case 3:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return(0,N.jsx)(w.Z,{ref:n,customBtn:"",btnIcon:(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)(g.ws,{}),"Status"]}),title:"Update Status",error:I,children:(0,N.jsxs)(h.Z,{onSubmit:function(e){M(e)},children:[(0,N.jsxs)("div",{className:"mt-3",children:[(0,N.jsxs)(h.Z.Group,{className:"mb-3",children:[(0,N.jsxs)(h.Z.Label,{className:"m-1",children:["Mark your event as ",(0,N.jsx)("strong",{children:"FINISHED"})," or"," ",(0,N.jsx)("strong",{children:"CANCELLED"})]}),(0,N.jsx)(h.Z.Control,{type:"title",placeholder:"Christmas social",pattern:"(FINISHED|CANCELLED)",onChange:function(e){return d(e.target.value===T._H?2:e.target.value===T.ew?3:"")},required:!0})]}),(0,N.jsx)("div",{className:"mt-2",children:(0,N.jsx)("small",{className:"text-muted",children:"Note: The event status can only be updated once."})})]}),(0,N.jsxs)("div",{className:"mt-3",children:[(0,N.jsx)(m.Z,{type:"submit",children:Z?(0,N.jsx)(_.g,{}):(0,N.jsx)(N.Fragment,{children:"Update"})}),(0,N.jsx)(m.Z,{className:"me-3 btn-cancel",onClick:function(){return n.current.setModalShow()},children:"Cancel"})]})]})})},U=function(e,t,n,s,a){return{options_owner:[{item:(0,N.jsx)("div",{children:(0,N.jsx)(f.Z,{type:"",btnStyle:"postBtn-placements",variant:"primary",onClick:a,placeholder:(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)(g.I8,{}),"Edit"]})})})},{item:(0,N.jsx)(M,{eventId:e,eventTitle:t})},{item:(0,N.jsx)(B,{eventId:e,eventTitle:t})}],options_user:[{item:(0,N.jsx)(D.Z,{eventId:e,eventTitle:t})},{item:(0,N.jsx)(k,{eventId:e,userId:n,currentUser:s})}]}},E=n(3651);var P=function(e){var t=(0,a.useState)(!1),n=(0,s.Z)(t,2),r=n[0],c=n[1],l=(0,a.useContext)(oe),u=(0,a.useContext)(E.q);function x(){c(!r)}return(0,N.jsx)(N.Fragment,{children:!1===r?(0,N.jsxs)(i.Z,{className:"event-card",children:[(0,N.jsx)(i.Z.Header,{children:(0,N.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,N.jsx)(S.Q,{image:l.gravatarImage,imgClass:"userProf-img me-3"}),(0,N.jsx)(I.OE,{joinedStatus:l.joinedStatus}),u===l.user?(0,N.jsxs)(d.Z,{children:[(0,N.jsx)(d.Z.Toggle,{variant:"light",size:"sm",id:"dropdown-basic",children:(0,N.jsx)(g.Pj,{})}),(0,N.jsx)(d.Z.Menu,{children:U(l.id,l.title,l.user,u,x).options_owner.slice(l.eventStatus===T.ew||l.eventStatus===T._H?2:"").map((function(e,t){return(0,N.jsx)("div",{className:"p-1",children:e.item},t)}))})]}):""]})}),(0,N.jsxs)(i.Z.Body,{children:[(0,N.jsxs)("div",{className:"details_textarea",children:[(0,N.jsx)("h4",{children:l.title}),(0,N.jsx)("span",{className:"content_sm1",dangerouslySetInnerHTML:{__html:l.details?(0,Z.p)(l.details):l.details}})]}),(0,N.jsxs)("div",{className:"details_textarea",children:[(0,N.jsxs)("div",{className:"d-flex flex-column gap-1",children:[(0,N.jsx)("h6",{children:"Details"}),(0,N.jsxs)("small",{className:"text-muted",children:["Host:"," ",(0,N.jsxs)("a",{href:"/profile?user=".concat(l.userName),children:["@",l.userName]})]}),(0,N.jsxs)("small",{className:"text-muted",children:["Posted: ",l.humanTimeDiffCreatedAt," ago"]}),(0,N.jsxs)("small",{className:"text-muted",children:["Date: ",l.eventDateString," "]}),(0,N.jsxs)("small",{className:"text-muted",children:["Audience Size: ",l.maxMember," "]})]}),(0,N.jsx)("div",{className:"mt-4",children:(0,N.jsx)(k,{eventId:l.id,userId:l.user,currentUser:u,img:l.gravatarImage})})]}),(0,N.jsxs)(o.Z,{"aria-label":"Basic example",className:"mt-3 w-100 justify-content-between",children:[(0,N.jsx)(m.Z,{variant:"light",className:"postBtn-placements cta_button",children:(0,N.jsxs)("span",{className:"d-flex align-items-center fw-normal small text-muted",children:[(0,N.jsx)(g.sv,{}),e.commentCount]})}),(0,N.jsx)(I.zq,{JoinEvent:l,joinedStatus:l.joinedStatus})]})]})]}):(0,N.jsx)(b,{eventId:l.id,title:l.title,details:l.details,maxMembers:l.maxMember,cardStyle:u===l.user?"editor-card":"",handleUpate:x})})};var H=function(e){var t=(0,v.I0)(),n=(0,a.useContext)(oe),r=(0,a.useState)(!1),c=(0,s.Z)(r,2),d=c[0],h=c[1],f=(0,C.nL)(n.id),Z=(0,I.JR)(f,e.currentUser),b=function(){var e=(0,x.Z)((0,u.Z)().mark((function e(s,a){var r;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r={eventId:n.id,userId:a,status:s},t((0,j.TM)(r,h)).then((function(){(0,p.uY)(Z.map((function(e){return e.username})))}));case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return(0,N.jsxs)(i.Z,{className:"event-card pt-2 pb-2",children:[(0,N.jsxs)(i.Z.Header,{className:"fw-bold",children:["New requests (",Z.length,")"]}),(0,N.jsx)(i.Z.Body,{children:Z.length>0?Z.map((function(e){return(0,N.jsxs)("div",{className:"userInfo-div row",style:{padding:" 10px 0 10px 0"},children:[(0,N.jsxs)("div",{className:"d-flex align-items-center col col-sm-9",children:[(0,N.jsx)(S.Q,{image:e.gravatarImage}),(0,N.jsxs)("div",{className:"ms-4",children:[(0,N.jsxs)(l.rU,{to:{pathname:"/profile",search:"user=".concat(e.username)},children:["@",e.username]}),(0,N.jsx)("small",{className:"d-block text-muted",children:e.email})]})]}),(0,N.jsx)("div",{className:"d-flex align-items-center col col-sm-3",children:(0,N.jsxs)(o.Z,{"aria-label":"Basic example",className:"w-100 gap-1",children:[(0,N.jsx)(m.Z,{variant:"light",className:"postBtn-placements cta_button",onClick:function(){return b(1,e.userId)},children:d?(0,N.jsx)(_.g,{}):(0,N.jsx)("span",{className:"d-flex align-items-center",children:(0,N.jsx)(g.dR,{})})}),(0,N.jsx)(m.Z,{variant:"light",className:"postBtn-placements cta_button",onClick:function(){return b(2,e.userId)},children:d?(0,N.jsx)(_.g,{}):(0,N.jsx)("span",{className:"d-flex align-items-center",children:(0,N.jsx)(g.X1,{type:"custom"})})})]})})]},e.id)})):(0,N.jsx)(i.Z.Text,{children:"No new requests..."})})]})},L=n(9472),q=n(5369);var A=function(e){var t=(0,v.I0)(),n=(0,c.s0)(),r=(0,a.useRef)(),i=(0,a.useState)(!1),l=(0,s.Z)(i,2),d=l[0],o=l[1],j=(0,a.useState)(""),f=(0,s.Z)(j,2),p=f[0],Z=f[1],b=(0,L._)(e.commentCount),y=function(){var s=(0,x.Z)((0,u.Z)().mark((function s(a){return(0,u.Z)().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:a.preventDefault(),t((0,q.PN)(e.commentId,o,Z)).then((function(){t((0,q.h_)(e.eventId,b)),n("/event/".concat(e.eventId,"?page=").concat(b),{replace:!0,state:{id:b}})}));case 2:case"end":return s.stop()}}),s)})));return function(e){return s.apply(this,arguments)}}();return(0,N.jsx)(w.Z,{ref:r,customBtn:"",btnIcon:(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)(g.HG,{}),"Delete"]}),title:"Delete Comment",error:p,children:(0,N.jsxs)(h.Z,{onSubmit:function(e){y(e)},children:[(0,N.jsx)("div",{className:"mt-3",children:"Are you sure you want to delete this comment? This can't be undone."}),(0,N.jsxs)("div",{className:"mt-3",children:[(0,N.jsx)(m.Z,{type:"submit",onClick:"true"===p.success?function(){return r.current.setModalShow()}:null,children:d?(0,N.jsx)(_.g,{}):(0,N.jsx)(N.Fragment,{children:"Remove"})}),(0,N.jsx)(m.Z,{className:"me-3 btn-cancel",onClick:function(){return r.current.setModalShow()},children:"Cancel"})]})]})})},R=function(e,t,n,s){return{options_owner:[{item:(0,N.jsx)("div",{children:(0,N.jsx)(f.Z,{type:"",btnStyle:"postBtn-placements",variant:"primary",onClick:s,placeholder:(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)(g.I8,{}),"Edit"]})})})},{item:(0,N.jsx)(A,{commentId:e,eventId:t,commentCount:n})}]}};var F=function(e,t){t.handleUpate;var n=(0,v.I0)(),r=(0,a.useState)(e.content),c=(0,s.Z)(r,2),l=c[0],d=c[1],o=(0,L._)(),m=function(){var t=(0,x.Z)((0,u.Z)().mark((function t(s){var a;return(0,u.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:s.preventDefault(),a={content:l},n((0,q.uA)(e.commentId,a)).then((function(){n((0,q.h_)(e.eventId,o)),(0,p.uY)((0,Z.M)(l))})),e.handleUpate();case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return(0,N.jsx)(h.Z,{onSubmit:function(e){m(e)},className:"w-100",children:(0,N.jsxs)(i.Z,{className:"editor-card",children:[(0,N.jsx)(i.Z.Header,{children:(0,N.jsx)("h6",{className:"fw-bold m-0",children:"Edit comment"})}),(0,N.jsxs)(i.Z.Body,{children:[(0,N.jsx)(h.Z.Control,{spellCheck:!0,placeholder:"What's on your mind?",as:"textarea",value:l||"",onChange:function(e){return d(e.target.value)},required:!0}),(0,N.jsxs)("div",{className:"d-flex justify-content-between mt-3",children:[(0,N.jsx)(f.Z,{type:"",btnStyle:"postBtn-placements",variant:"primary",onClick:e.handleUpate,placeholder:(0,N.jsxs)("div",{className:"d-flex align-items-center",children:[(0,N.jsx)(g.X1,{}),"Cancel"]})}),(0,N.jsx)(f.Z,{type:"submit",btnStyle:"formBtn cta_button",variant:"primary",formValidation:""===l,isLoading:"",placeholder:(0,N.jsx)("div",{className:"d-flex align-items-center",children:"Update"})})]})]})]})})},Y=n(5963),O=function(e){var t=e.commentData.totalLikes,n=e.commentData.likeStatus,s=n&&t>2?"Liked by you and ".concat(t-1," others"):n&&1===t?"You liked this":!n&&t>1||n&&2===t?"".concat(t," likes"):n||1!==t?"Like":"".concat(t," like");return(0,N.jsxs)("span",{className:"d-flex align-items-center fw-normal small text-muted",children:[(0,N.jsx)(g.mN,{likeStatus:e.commentData.likeStatus}),s]})};var G=function(e){var t=(0,v.I0)(),n=(0,a.useState)(!1),r=(0,s.Z)(n,2),c=r[0],l=r[1],u=(0,a.useContext)(oe),x=(0,a.useContext)(E.q),h=(0,L._)();function j(){l(!c)}return(0,N.jsxs)("div",{className:"event-card_dash m-0 mt-4",children:[(0,N.jsxs)("div",{className:"d-flex",id:"card_header",children:[(0,N.jsx)(S.Q,{image:e.commentData.gravatarImage,imgClass:"me-2",id:"card-img"}),(0,N.jsx)(Y.Z,{data:e.commentData.username}),(0,N.jsx)("div",{className:"me-auto",children:(0,N.jsxs)("span",{className:"card-timestamp text-muted align-self-center",children:[e.commentData.humanTimeDiffCreatedAt," ago"]})}),x===e.commentData.user?(0,N.jsxs)(d.Z,{children:[(0,N.jsx)(d.Z.Toggle,{variant:"light",size:"sm",id:"dropdown-basic",children:(0,N.jsx)(g.Pj,{})}),(0,N.jsx)(d.Z.Menu,{children:R(e.commentData.id,u.id,e.commentCount,j).options_owner.map((function(e,t){return(0,N.jsx)("div",{className:"p-1",children:e.item},t)}))})]}):""]}),c?(0,N.jsx)(F,{eventId:u.id,commentId:e.commentData.id,content:e.commentData.content,handleUpate:j}):(0,N.jsx)(i.Z,{className:"comment-item",children:(0,N.jsxs)(i.Z.Body,{children:[(0,N.jsx)(i.Z.Text,{className:"content_sm1",dangerouslySetInnerHTML:{__html:e.commentData.content?(0,Z.p)(e.commentData.content):e.commentData.content}}),(0,N.jsx)(o.Z,{"aria-label":"Basic example",className:"mt-3 w-100 gap-2",children:(0,N.jsx)(m.Z,{variant:"light",className:"postBtn-placements cta_button p-0",onClick:function(){t((0,q.Hv)(e.commentData.id)).then((function(){t((0,q.h_)(u.id,h)),(0,p.uY)([e.commentData.username])}))},children:(0,N.jsx)(O,{commentData:e.commentData})})})]})})]})},Q=n(4877),z=n(271);var J=function(e){var t=(0,v.I0)(),n=(0,a.useRef)(0),r=(0,a.useState)(""),c=(0,s.Z)(r,2),l=c[0],d=c[1],o=(0,a.useState)(!1),m=(0,s.Z)(o,2),j=m[0],g=m[1],b=(0,a.useState)(!1),y=(0,s.Z)(b,2),w=y[0],C=y[1],I=(0,a.useState)(""),k=(0,s.Z)(I,2),D=k[0],_=k[1],B=(0,a.useContext)(oe),T=(0,a.useContext)(Q.S),M=(0,L._)();(0,a.useEffect)((function(){C(""===l)}),[l]);var U=function(){var n=(0,x.Z)((0,u.Z)().mark((function n(s){var a;return(0,u.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:s.preventDefault(),a={content:l},t((0,q.Yr)(e.id,a,g,_)).then((function(){t((0,q.h_)(e.id,M)),(0,p.uY)((0,Z.M)(l,B.userName))}));case 3:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return(0,a.useEffect)((function(){D===z.OK&&(n.current.reset(),d(""),_(""))}),[D]),(0,N.jsx)(i.Z,{className:"comment-card",children:(0,N.jsx)(i.Z.Body,{children:(0,N.jsxs)(h.Z,{onSubmit:function(e){U(e)},ref:n,children:[(0,N.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,N.jsx)(S.Q,{image:T.currentUser.gravatarImage,imgClass:"user-img me-3"}),(0,N.jsx)(h.Z.Control,{spellCheck:!0,placeholder:"Add a comment...",as:"textarea",onChange:function(e){return d(e.target.value)},rows:2,required:!0})]}),(0,N.jsxs)("div",{className:"d-flex justify-content-between mt-3",children:[(0,N.jsx)("small",{className:"text-danger",children:D}),(0,N.jsx)(f.Z,{type:"submit",btnStyle:"formBtn cta_button",variant:"primary",formValidation:w,isLoading:j,placeholder:(0,N.jsx)("div",{className:"d-flex align-items-center",children:"Send"})})]})]})})})},V=n(8824),X=n(1413),W=n(5987),K=n(1694),$=n.n(K),ee=n(162),te=n(6445),ne=["bsPrefix","active","children","className","as","linkAs","linkProps","href","title","target"],se=a.forwardRef((function(e,t){var n=e.bsPrefix,s=e.active,a=void 0!==s&&s,r=e.children,i=e.className,c=e.as,l=void 0===c?"li":c,d=e.linkAs,o=void 0===d?te.Z:d,m=e.linkProps,u=void 0===m?{}:m,x=e.href,h=e.title,j=e.target,v=(0,W.Z)(e,ne),f=(0,ee.vE)(n,"breadcrumb-item");return(0,N.jsx)(l,(0,X.Z)((0,X.Z)({ref:t},v),{},{className:$()(f,i,{active:a}),"aria-current":a?"page":void 0,children:a?r:(0,N.jsx)(o,(0,X.Z)((0,X.Z)({},u),{},{href:x,title:h,target:j,children:r}))}))}));se.displayName="BreadcrumbItem";var ae=se,re=["bsPrefix","className","listProps","children","label","as"],ie=a.forwardRef((function(e,t){var n=e.bsPrefix,s=e.className,a=e.listProps,r=void 0===a?{}:a,i=e.children,c=e.label,l=void 0===c?"breadcrumb":c,d=e.as,o=void 0===d?"nav":d,m=(0,W.Z)(e,re),u=(0,ee.vE)(n,"breadcrumb");return(0,N.jsx)(o,(0,X.Z)((0,X.Z)({"aria-label":l,className:s,ref:t},m),{},{children:(0,N.jsx)("ol",(0,X.Z)((0,X.Z)({},r),{},{className:$()(u,null==r?void 0:r.className),children:i}))}))}));ie.displayName="Breadcrumb";var ce=Object.assign(ie,{Item:ae});var le=function(e){return(0,N.jsx)(N.Fragment,{children:e.items?(0,N.jsx)(ce,{className:"w-100",children:e.items.map((function(e,t){return(0,N.jsx)(ce.Item,{href:e.path,active:e.current,className:"text-truncate",children:e.title},t)}))}):""})},de=function(e){return(0,N.jsx)(i.Z,{style:e.cardStyle,children:(0,N.jsxs)(i.Z.Body,{children:[(0,N.jsxs)(i.Z.Title,{className:"d-inline-flex align-items-center",children:[e.icon," ",e.title]}),(0,N.jsx)(i.Z.Text,{className:"content_sm1",children:e.content})]})})},oe=(0,a.createContext)();var me=function(){var e=(0,c.UO)(),t=(0,L._)(),n=(0,C.is)(e,t).eventData,d=(0,C.is)(e,t).commentData,o=(0,a.useContext)(E.q),m=(0,a.useState)(1),u=(0,s.Z)(m,2),x=u[0],h=u[1],j=(0,a.useState)(10),v=(0,s.Z)(j,1)[0],f=(0,l.lr)({}),p=(0,s.Z)(f,2),Z=(p[0],p[1]),b=(0,c.TH)().state;(0,a.useEffect)((function(){if(b){var e=b.id;h(e)}}),[b]),(0,a.useEffect)((function(){Z({page:x})}),[Z,x]);var y=n?[{title:"Dashboard",path:"/posts",current:!1},{title:n.title,path:"/event/".concat(n.id),current:!0}]:"";return(0,N.jsx)(N.Fragment,{children:(0,N.jsx)(oe.Provider,{value:n,children:n?(0,N.jsx)("div",{style:{position:"relative"},children:(0,N.jsxs)("div",{className:"dash-container",children:[(0,N.jsx)("div",{className:"content",children:(0,N.jsxs)(r.Z,{className:"content-wrapper",children:[(0,N.jsx)(le,{items:y}),d.results?d.count>0?d.results.map((function(e,t){return(0,N.jsx)("div",{children:(0,N.jsx)(G,{commentData:e,commentCount:d.count})},t)})):(0,N.jsx)(i.Z,{className:"comment-item",children:(0,N.jsx)(i.Z.Body,{children:(0,N.jsx)(i.Z.Text,{children:"No comments published"})})}):"",d.count>10?(0,N.jsx)(V.Z,{postsPerPage:v,totalPosts:d.count,paginate:function(e){return h(e)},currentPage:x}):""]})}),(0,N.jsx)("div",{className:"sidebar_eventDash",children:(0,N.jsx)("div",{className:"sidebar_eventDash-wrapper",children:(0,N.jsxs)(r.Z,{className:"content-wrapper",children:[n.eventStatus===T.ew||n.eventStatus===T._H?(0,N.jsx)(de,{title:"Note",content:(0,N.jsxs)(N.Fragment,{children:["This event now has"," ",(0,N.jsx)(I.sT,{eventStatus:n.eventStatus})," ","therefore it can not be updated or participated in."]}),icon:(0,N.jsx)(g.d,{}),cardStyle:{backgroundColor:"#eaebfd"}}):"",(0,N.jsx)(P,{commentCount:d.count}),n.joinedStatus===T.vP||n.joinedStatus===T.yI?(0,N.jsx)(J,{id:e.id}):(0,N.jsx)(i.Z,{className:"event-card",children:(0,N.jsx)(i.Z.Body,{children:(0,N.jsx)(i.Z.Text,{children:"You will be able collaborate with others via comments once you are accepted."})})}),o===n.user&&n.eventStatus!==T.ew&&n.eventStatus!==T._H?(0,N.jsx)(H,{currentUser:o}):""]})})})]})}):""})})}}}]);
//# sourceMappingURL=902.b6480fab.chunk.js.map