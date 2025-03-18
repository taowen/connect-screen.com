import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/auto-scale', (c) => {
        return c.render(<div>
            <h2>自动缩放裁切去黑边</h2>
            <p>手机的比例不是16:9的，但是播放16:9的视频，这个时候主屏会有黑边。然后镜像到16:9的扩展屏幕上，理论上通过缩放并裁切掉一些画面可以在扩展屏幕上实现全屏。</p>
        </div>)
    })
}