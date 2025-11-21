import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((d: { email: string; password: string }) => d)
  .handler(async ({ data }) => {
    await new Promise((resolve) => setTimeout(resolve, 400))

    return {
      email: data.email,
      ok: true,
      error: false,
      message: 'Demo login accepted' as string,
    }
  })

export const Route = createFileRoute('/_authed')({
  beforeLoad: () => ({
    demoAuthenticated: true,
  }),
})
