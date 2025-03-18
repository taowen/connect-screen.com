import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/displaylink', (c) => {
        return c.render(<div>
            <h2>usb 2.0 手机通过 displaylink 扩展坞有线投屏</h2>
            <p>解决 usb 2.0 无法直接 typec 口接屏幕的问题。</p>
        </div>)
    })
}