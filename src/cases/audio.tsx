import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/audio', (c) => {
        return c.render(<div>
            <h2>选择音频的输出设备</h2>
            <p>外接的屏幕有的是带有喇叭的，我们希望能够选择音频输出在什么设备上。</p>
        </div>)
    })
}