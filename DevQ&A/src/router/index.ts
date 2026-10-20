import { createRouter, createWebHashHistory } from 'vue-router'
import CategoriesView from '../views/CategoriesView.vue'
import CategoryQuestionsView from '../views/CategoryQuestionsView.vue'
import StudyView from '../views/StudyView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'categories',
      component: CategoriesView
    },
    {
      path: '/category/:name',
      name: 'category-questions',
      component: CategoryQuestionsView,
      props: true
    },
    {
      path: '/study',
      name: 'study',
      component: StudyView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
