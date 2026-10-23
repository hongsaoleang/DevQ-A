import { createRouter, createWebHashHistory } from 'vue-router'
import CategoriesView from '../views/CategoriesView.vue'
import CategoryQuestionsView from '../views/CategoryQuestionsView.vue'
import StudyView from '../views/StudyView.vue'
import LessonsView from '../views/LessonsView.vue'

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
      path: '/lessons',
      name: 'lessons',
      component: LessonsView
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
