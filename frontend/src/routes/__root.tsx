import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2 text-lg justify-end">
        <Link
          to="/"
        >
          Home
        </Link>{' '}
        <Link
          to="/signup"
        >
          Sign Up
        </Link>{' '}
        <Link
        to='/login'
        >
        Log In</Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
