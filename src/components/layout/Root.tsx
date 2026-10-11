import { Outlet, ScrollRestoration } from 'react-router-dom'

/** Root route: new pages open at the top, Back restores the old position, #hash links still work. */
export default function Root() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  )
}
