import { createRouter, createWebHistory } from "vue-router";
import { UserStore } from "../stores/userStore.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/reset-password",
      name: "Reset",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/login/trapdoor",
      name: "login-trapdoor",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/TrapdoorLogin.vue"),
    },
    {
      path: "/profile",
      name: "host",
      component: () => import("@/views/host/HostProfile.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/my-listings",
      name: "my-listings",
      component: () => import("@/views/host/MyListings.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/stay-pages",
      name: "stay-pages",
      component: () => import("@/views/stay/StayPages.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/listing-detail/:id",
      name: "listing-detail",
      component: () => import("@/views/listing/ListingDetail.vue"),
      meta: {},
    },

    {
      path: "/host-listing",
      name: "host-listing",
      component: () => import("@/views/listing/HostListing.vue"),
      meta: {},
    },

    {
      path: "/stay-detail/:id",
      name: "stay-detail",
      component: () => import("@/views/stay/StayDetail.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/location-search",
      name: "location-search",
      component: () => import("@/views/location/LocationSearch.vue"),
      meta: {},
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = UserStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!userStore.isLoggedIn) {
      next({ name: "login" });
    } else if (userStore.hasProfile == false && to.name != "my-listings") {
      next({ name: "my-listings" });
    } else {
      next();
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

export default router;
