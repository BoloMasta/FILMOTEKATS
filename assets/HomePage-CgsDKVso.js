import{r as o,u as b,j as s,B as p}from"./index-DVLEWC-6.js";import{F as M,G as k,P as S}from"./pagesStyles-YxvrM3mC.js";const B=()=>{const[y,f]=o.useState([]),[m,v]=o.useState(1),{category:a,query:r,setCategory:P,setQuery:x,adults:j}=b(e=>({category:e.category,query:e.query,setCategory:e.setCategory,setQuery:e.setQuery,adults:e.adults})),[c,h]=o.useState({page:1,category:a,query:r}),d=o.useCallback(async(e,l,u)=>{console.log(`Fetching movies for category: ${l}, page: ${e}, query: "${u}"`);const n=new M;let t;try{switch(l){case"search":u&&(t=await n.getSearch(u,e));break;case"top_rated":t=await n.getTopRated(e);break;case"upcoming":t=await n.getUpcoming(e);break;case"popular":default:t=await n.getTrending(e);break}if(t&&t.results){const i=Math.min(t.total_pages,500);f(t.results),v(i),console.log(`Movies fetched: ${t.results.length} movies, totalPages: ${i}`)}}catch(i){console.error("Error fetching movies:",i)}},[]);o.useEffect(()=>{d(c.page,c.category,c.query)},[c,d]),o.useEffect(()=>{h({page:1,category:a,query:r})},[a,r,j]);const C=e=>{h(l=>({...l,page:e}))},g=e=>{e!=="search"&&x(""),P(e),console.log(`Category change: new category=${e}`)};return s.jsxs(s.Fragment,{children:[s.jsx("h2",{className:"pageHeaderStyle",children:a==="search"&&r?`Search Results for "${r}"`:a==="popular"?"Popular Movies":a==="top_rated"?"Top Rated Movies":a==="upcoming"?"Upcoming Movies":""}),s.jsxs("div",{className:"buttonGroup",children:[s.jsx(p,{onClick:()=>g("popular"),className:a==="popular"?"activeButton":"",label:"Popular Movies"}),s.jsx(p,{onClick:()=>g("top_rated"),className:a==="top_rated"?"activeButton":"",label:"Top Rated"}),s.jsx(p,{onClick:()=>g("upcoming"),className:a==="upcoming"?"activeButton":"",label:"Upcoming"})]}),s.jsx(k,{movies:y}),m>1&&s.jsx(S,{currentPage:c.page,totalPages:m,onPageChange:C})]})};export{B as default};
