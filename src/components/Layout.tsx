import * as React from 'react'
import Head from 'next/head'
import { NavBar } from './NavBar'

interface LayoutProps {
  title?: string
}

export const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  title,
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <header>
      <NavBar />
    </header>
    {children}
  </div>
)
