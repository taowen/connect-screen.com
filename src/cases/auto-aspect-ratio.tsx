import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/auto-aspect-ratio', (c) => {
        return c.render(<div>
            <h2>自动匹配外接屏幕的宽高比</h2>
            <p>改变主屏的分辨率以适配扩展屏，从而去除黑边。</p>
        </div>)
    })
}