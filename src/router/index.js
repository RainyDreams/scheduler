import { defineAsyncComponent } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import emitter from '../utils/bus'
import Error404 from "../views/404.vue";
import HomeView from "../views/HomeView.vue";
import InFileView from "../views/InFileView.vue";
import SettingsView from "../views/SettingsView.vue";
import EditView from "../views/EditView.vue";
import About from "../views/settings/About.vue"
import Instructions from "../views/settings/Instructions.vue"
import Recycle from "../views/settings/Recycle.vue"
import AbsorbedView from '../views/AbsorbedView.vue'
import DarkMode from '../views/settings/DarkMode.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/inFile",
      name: "InFile",
      component: InFileView,
    },
    {
      path: "/settings",
      name: "Settings",
      component: SettingsView,
    },
    {
      path: "/edit",
      name: "Edit",
      component: EditView,
    },
    {
      path: "/absorbed",
      name: "Absorbed",
      component: AbsorbedView,
    },
    {
      path: "/settings/about",
      name: "About",
      component: About,
    },
    {
      path: "/settings/instructions",
      name: "Instructions",
      component: Instructions,
    },
    {
      path: "/settings/dark",
      name: "DarkMode",
      component: DarkMode,
    },
    {
      path: "/settings/recycle",
      name: "Recycle",
      component: Recycle
    },
    {
      path: "/:pathMatch(.*)",
      component: Error404,
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  if (to.path) {
    if (window._hmt) {
      window._hmt.push(['_trackPageview', '/#' + to.fullPath]);
    }
  }
  // NProgress.start()
  next();
});

router.afterEach((to) => {
  // if(to.path == '')
  
  // NProgress.done()
})

export default router