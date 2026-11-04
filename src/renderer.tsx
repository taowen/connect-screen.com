import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <title>屏易连</title>
        <link href="/static/style.css" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </head>
      <body>{children}</body>
    </html>
  )
})
