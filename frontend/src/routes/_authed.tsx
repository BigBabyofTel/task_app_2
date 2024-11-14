import * as React from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { getCookie } from '../utils/utils'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async () => {
    const token = getCookie('token')
    if (!token) {
      throw redirect({
        to: '/login',
      })
    }
  },
})

function AuthRouteComponent() {
  return 'Hello /_authed!'
}
