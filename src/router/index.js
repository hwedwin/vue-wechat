import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LogIn from "@/components/LogIn"
import SignUp from '@/components/SignUp'
import Home from '@/components/Home'
import Messages from '@/components/home/Messages'
import Me from '@/components/home/Me'
import Discover from '@/components/home/Discover'
import AddContacts from '@/components/home/AddContacts'
import Contacts from '@/components/home/Contacts' 
import Search from '@/components/Search'
import NewFriends from '@/components/home/NewFriends'
import auth from '../auth'
import User from '@/components/User'
import Chat from '@/components/Chat'
import MyAccount from '@/components/MyAccount'

Vue.use(Router)

var router = new Router({
	mode: "history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
    	path: "/login",
    	name: "login",
    	component: LogIn,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: '/wechat',
      component: Home,
      children: [{
        path: "chats",
        name: "messages",
        component: Messages
      }, {
        path: "discover",
        name: "discover",
        component: Discover,
      }, {
        path: "contacts",
        name: "contacts",
        component: Contacts
      }, {
        path: 'me',
        name: "me",
        component: Me
      }, {
        path: "addContacts",
        name: "addContacts",
        component: AddContacts,
      }, {
        path: "newfriends",
        name: "newfriends",
        component: NewFriends
      }, {
        path: "user/:uid",
        name: "userpage",
        component: User,
      }, {
        path: "chat/:uid",
        name: "chat",
        component: Chat,
      }, {
        path: "myaccount",
        name: "myaccount",
        component: MyAccount,
      }, {
        path: "*",
        name: "wechatHome",
        component: Messages
      }]
    }
  ]
})


router.beforeEach((to, from, next)=>{
  if(auth.isLoggedIn() && (to.name === "signup" || to.name === "login")) {
    next("/")
  } else if(!auth.isLoggedIn() && (to.name !== "signup" && to.name !== "login" )) {
    next("/login")
  } else {
    next()
  }
})

export default router