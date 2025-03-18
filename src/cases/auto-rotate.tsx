import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/auto-rotate', (c) => {
        return c.render(<div>
            <h2>自动旋转去黑边</h2>
            <p>竖屏应用显示在横屏的屏幕上，左右会有很大的黑边。为了充分利用屏幕，应该把画面做 90度的旋转。</p>
        </div>)
    })
}