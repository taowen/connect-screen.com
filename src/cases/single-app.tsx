import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/auto-scale', (c) => {
        return c.render(<div>
            <h2>通过单应用投屏去黑边，上高分辨率</h2>
            <p>手机的主屏和外接屏幕的分辨率不一致，长宽比不一致，会导致无法充分利用扩展的屏幕。通过单应用投屏，可以让应用去直接适配扩展屏幕的分辨率和长宽比，获得超越主屏的体验。</p>
        </div>)
    })
}