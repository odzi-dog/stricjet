import{r}from"./singletons-bb9012b7.js";import{J as e,K as o,C as n}from"./vendor-223db38c.js";const t=async function(e,o){return r.goto(e,o,[])};const a=e({uri:"http://localhost:3001/graphql",credentials:"include",cache:new o.InMemoryCache}),s=o.gql`
  mutation Login($token: String!) {
    login(token: $token) {
      _id
      email
      username
    }
  }
`,i=o.gql`
  query me {
    me {
      _id
      email
    }
  }
`;const l=function(){const{subscribe:r,update:e}=n({loggedIn:!1});function o(r){e((e=>(null==r?(e.loggedIn=!1,e.profile=null):(e.loggedIn=!0,e.profile=r),e)))}return{subscribe:r,async authorize(r){const e=await a.mutate(s,{variables:{token:r}});e.errors?console.error("graphql authorize mutation error",e.errors):o(e.data.login)},fetchMe:async()=>new Promise(((r,e)=>{a.query(i).subscribe((n=>{var t;n.loading||(n.error?(console.error("graphql fetchme query error",n.error),e({error:!0})):(o(null==(t=n.data)?void 0:t.me),r(n)))}))}))}}();export{l as C,t as g};
