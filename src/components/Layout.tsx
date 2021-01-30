import * as React from 'react'
import Head from 'next/head'
import { NavBar } from './NavBar'
import { Wrapper } from './Wrapper'

interface LayoutProps {
  title?: string
  variant: 'small' | 'regular'
}

export const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  title,
  variant,
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <Wrapper variant={variant}>
      <header>
        <NavBar />
      </header>
      {children}
    </Wrapper>
  </div>
)
