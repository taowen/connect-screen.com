import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/internal-touchpad', (c) => {
        return c.render(<div>
            <h2>通过主屏上的触控板控制扩展屏</h2>
            <p>解决扩展屏不是触摸屏无法控制单应用投屏的问题。</p>
        </div>)
    })
}