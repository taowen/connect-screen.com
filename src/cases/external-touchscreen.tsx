import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/external-touchscreen', (c) => {
        return c.render(<div>
            <h2>使用扩展屏的触摸功能</h2>
            <p>一些屏幕是自带触摸的，希望镜像投屏或者单应用扩展模式投屏的时候能使用扩展屏触摸控制。</p>
        </div>)
    })
}