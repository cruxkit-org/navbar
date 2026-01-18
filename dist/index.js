import {Container}from'@cruxkit/container';import {jsxs,jsx}from'@minejs/jsx/jsx-runtime';function d(e){return e==="sm"?2:e==="lg"?6:4}function o(e){return e==="flex-start"?"justify-start":e==="center"?"justify-center":e==="flex-end"?"justify-end":""}function c(e){return e.type==="logo"?jsx(Container,{display:"flex",align:"center",gap:2,className:"navbar-item navbar-logo",children:e.content}):e.type==="links"?jsx(Container,{as:"ul",display:"flex",align:"center",gap:1,className:"navbar-item navbar-links",children:e.content}):e.type==="actions"?jsx(Container,{display:"flex",align:"center",gap:2,className:"navbar-item navbar-actions",children:e.content}):e.type==="search"?jsx(Container,{display:"flex",align:"center",gap:2,className:"navbar-item navbar-search",children:e.content}):e.type==="divider"?jsx(Container,{w:"auto",h:"full",px:2,className:"navbar-item navbar-divider flex items-center",children:e.content}):jsx(Container,{display:"flex",align:"center",className:"navbar-item navbar-custom",children:e.content})}function g(e){let l=e.mode||"horizontal",f=e.gap||"md",r={start:e.items.filter(n=>n.position==="start"),center:e.items.filter(n=>n.position==="center"),end:e.items.filter(n=>n.position==="end")},i=d(f),s=l==="vertical"?{direction:"column",sectionDirection:"column"}:{direction:"row",sectionDirection:"row"},p=e.sticky?"sticky top-0 z-40":"";return jsxs(Container,{as:"nav",display:"flex",direction:s.direction,gap:i,w:"full",bg:"surface",border:1,className:`
                    navbar
                    border-1
                    ${p}
                    ${e.className||""}
                `,children:[r.start.length>0&&jsx(Container,{display:"flex",direction:s.sectionDirection,gap:i,align:"center",className:"navbar-section navbar-section--start",children:r.start.map(n=>jsx(Container,{display:"flex",align:"center",className:`
                                    navbar-item-wrapper
                                    flex
                                    items-center
                                    ${n.type!=="divider"?o(n.align):""}
                                `,children:c(n)}))}),r.center.length>0&&jsx(Container,{display:"flex",direction:s.sectionDirection,gap:i,align:"center",className:"navbar-section navbar-section--center flex-1 justify-center",children:r.center.map(n=>jsx(Container,{display:"flex",align:"center",className:`
                                    navbar-item-wrapper
                                    flex
                                    items-center
                                    ${n.type!=="divider"?o(n.align):""}
                                `,children:c(n)}))}),r.end.length>0&&jsx(Container,{display:"flex",direction:s.sectionDirection,gap:i,align:"center",className:"navbar-section navbar-section--end justify-end",children:r.end.map(n=>jsx(Container,{display:"flex",align:"center",className:`
                                    navbar-item-wrapper
                                    flex
                                    items-center
                                    ${n.type!=="divider"?o(n.align):""}
                                `,children:c(n)}))})]})}export{g as Navbar};//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map