import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/auto-font-size', (c) => {
        return c.render(<div>
            <h2>字体大小要和屏幕大小匹配</h2>
            <p>希望应用的字体在外接屏幕上易于阅读，不要过大，也不要过小。</p>
        </div>)
    })
}