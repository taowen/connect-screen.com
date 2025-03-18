import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/internal-touchscreen', (c) => {
        return c.render(<div>
            <h2>通过主屏上的触摸屏控制扩展屏</h2>
            <p>解决扩展屏不是触摸屏无法控制单应用投屏的问题。</p>
        </div>)
    })
}