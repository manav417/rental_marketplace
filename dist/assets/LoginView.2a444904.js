import{d as m,f as b,o as p,c,b as e,a as g,w as f,g as a,v as l,i as d,h,F as w,j as i,U as k}from"./index.d6eaf57d.js";import{A as n}from"./accounts.service.7f4b2f1a.js";const _={class:"pb-7 text-xl font-bold"},x=i(" Log In "),y=i("Create Account"),v={class:"pb-7"},F=e("label",{for:"email",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"},"Email",-1),L={class:"pb-7"},U=e("label",{for:"password",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"},"Password",-1),V=e("div",{class:"w-full text-right"},[e("input",{type:"submit",class:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full",value:"Log In"})],-1),C={data(){return{email:"",password:""}},methods:{submitForm(){const s=new FormData;s.append("username",this.email),s.append("password",this.password);const r=k();n.logInUser(s).then(()=>n.getUser()).then(()=>{this.$router.push(r.getLoginRoute())})}}},A=m({...C,__name:"LoginView",setup(s){return(r,t)=>{const u=b("RouterLink");return p(),c(w,null,[e("h1",_,[x,g(u,{class:"text-sm font-normal float-right",to:"/register"},{default:f(()=>[y]),_:1})]),e("form",{action:".",onSubmit:t[2]||(t[2]=h((...o)=>r.submitForm&&r.submitForm(...o),["prevent"]))},[e("div",v,[F,a(e("input",{type:"text",id:"email","onUpdate:modelValue":t[0]||(t[0]=o=>d(email)?email.value=o:null),placeholder:"email@domain.com",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",required:""},null,512),[[l,r.email]])]),e("div",L,[U,a(e("input",{type:"password",id:"password","onUpdate:modelValue":t[1]||(t[1]=o=>d(password)?password.value=o:null),placeholder:"Passoword",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",required:""},null,512),[[l,r.password]])]),V],32)],64)}}});export{A as default};
