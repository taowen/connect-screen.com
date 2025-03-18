import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/moonlight', (c) => {
        return c.render(<div>
            <h2>usb 2.0 手机通过 moonlight WIFI无线投屏</h2>
            <p>解决 usb 2.0 无法直接 typec 口接屏幕的问题。常见的 moonlight 设备</p>
            <ul>
                <li>Windows电脑或者平板</li>
                <li>安卓平板</li>
                <li>iPad</li>
                <li>安卓电视</li>
                <li>安卓机顶盒</li>
            </ul>
        </div>)
    })
}