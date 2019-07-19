import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home.vue";

Vue.use(Router);

const APP_TITLE = "Colour Me Impressed";
const DELIMITER = " | ";

const _router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "Home"
      }
    },
    {
      path: "/people",
      name: "people",
      component: () => import("./views/people.vue"),
      meta: {
        title: "People"
      }
    },
    {
      path: "/people/:id/edit",
      name: "person-edit",
      component: () => import("./views/person-edit.vue"),
      meta: {
        // defer title to component on mount
      }
    }
  ]
});

export const setTitle = newTitle => {
  document.title = `${newTitle}${DELIMITER}${APP_TITLE}`;
};

_router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    let newTitle;
    switch (typeof to.meta.title) {
      case "function":
        newTitle = to.meta.title(to, from);
        break;
      case "string":
        newTitle = to.meta.title;
        break;
    }

    setTitle(newTitle);
  }

  next();
});

export const router = _router;
