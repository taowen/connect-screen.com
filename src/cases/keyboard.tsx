import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/keyboard', (c) => {
        return c.render(<div>
            <h2>即便是单应用投屏的情况下，也能使用键盘</h2>
            <p>键盘应该能控制应用所在的屏幕</p>
        </div>)
    })
}