import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/miracast', (c) => {
        return c.render(<div>
            <h2>usb 2.0 手机通过 miracast WIFI无线投屏</h2>
            <p>解决 usb 2.0 无法直接 typec 口接屏幕的问题</p>
        </div>)
    })
}