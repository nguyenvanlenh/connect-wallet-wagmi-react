import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { store } from '../localstorageUtils'

export const Route = createFileRoute('/_protected')({
  beforeLoad: () => {
    const isAuth = store('AUTH').get()
    const hasAccess = isAuth?.accessToken
    if (!hasAccess) {
      throw redirect({ to: '/' })
    }
  },
  component: () => <Outlet />
})
