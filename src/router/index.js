import Vue from 'vue'
import Router from 'vue-router'
import Notification from '@/components/Notification'
import Reservation from '@/components/Reservation'
import Email from '@/components/Email'
import Details from "@/components/Details";
import Inbox from "@/components/Inbox";
import Emaildetails from "@/components/Emaildetails";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/notification',
    name: 'Notification',
    component: Notification
  }, {
    path: '/reservation',
    name: 'Reservation',
    component: Reservation
  },
    {
      path: '/email',
      name: 'Email',
      component: Email
    },
    {
      path: '/details',
      name: 'Details',
      component: Details
    },
    {
      path: '/inbox',
      name: 'Inbox',
      component: Inbox
    },
    {
      path: '/emaildetails',
      name: 'Emaildetails',
      component: Emaildetails
    },

  ]
})
