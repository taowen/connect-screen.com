import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/protection', (c) => {
        return c.render(<div>
            <h2>投屏出来的微信是模糊的，键盘则完全看不见</h2>
            <p>这是由于小米手机的“屏幕共享防护”机制引起的。关闭方式如下</p>
            <ol>
                <li>打开系统设置</li>
                <li>点击“隐私与安全”</li>
                <li>点击“安全”</li>
                <li>点击“电诈防护”</li>
                <li>点击“屏幕共享防护”</li>
            </ol>
            <p>另外一些流媒体平台有版权保护，也会导致投屏出来画面是黑色的。
                这种情况就没有办法了。
                会 root 的人搜索 "root flag_secure" 关键词了解绕过方法。
            </p>
        </div>)
    })
}