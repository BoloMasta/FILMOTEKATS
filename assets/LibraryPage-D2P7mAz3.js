import{a as x,r as e,j as t,g as v,b as M}from"./index-C8c5mJkW.js";import{G as E,P as j}from"./pagesStyles-CFhbzBaL.js";const o=20,w=()=>{const{view:s}=x(),[a,g]=e.useState("queue"),[r,l]=e.useState(1),[c,h]=e.useState(0),[d,f]=e.useState([]);e.useEffect(()=>{(s==="queue"||s==="watched")&&g(s)},[s]),e.useEffect(()=>{(()=>{let n=[];a==="queue"?n=v():a==="watched"&&(n=M());const i=(r-1)*o,m=i+o;f(n.slice(i,m)),h(Math.ceil(n.length/o))})()},[a,r]);const P=u=>{l(u)};return t.jsxs(t.Fragment,{children:[t.jsx("h2",{className:"pageHeaderStyle",children:a==="queue"?"Movie Queue":"Watched Movies"}),t.jsx(E,{movies:d}),c>1&&t.jsx(j,{currentPage:r,totalPages:c,onPageChange:P})]})};export{w as default};
