import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard')({
  component: RouteComponent
})

function RouteComponent() {
  return 'Hello /_authed/dashboard!'
}
