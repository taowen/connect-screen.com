import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/ime', (c) => {
        return c.render(<div>
            <h2>即便是单应用投屏的情况下，也能使用输入法</h2>
            <p>输入法应该出现在被操作的应用所在的屏幕</p>
        </div>)
    })
}