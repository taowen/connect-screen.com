import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/screen-off', (c) => {
        return c.render(<div>
            <h2>让手机主屏熄屏</h2>
            <p>只使用扩展屏幕，避免主屏引起的耗电和寿命损耗。</p>
        </div>)
    })
}