import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/displaylink', (c) => {
        return c.render(<div>
            <h2>usb 2.0 手机通过 displaylink 扩展坞有线投屏</h2>
            <p>解决 usb 2.0 无法直接 typec 口接屏幕的问题。displaylink 芯片的扩展坞需要配合软件才能工作。
                可以使用官方的 displaylink presenter，或者使用屏易连。
                displaylink 和 display port 是两回事。不是所有的扩展坞都有 displaylink 芯片。
                这里有一些屏易连测试兼容的 displaylink 芯片扩展坞的型号 <a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ">https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ</a>。
            </p>
            <p>displaylink 扩展坞都是设计出来给电脑使用的，而且洋垃圾本身也很多问题。所以闲鱼上买来之后未必能用。
                当 displaylink 扩展坞不能正常工作的时候，请按 <a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ">https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ</a> 文档描述的故障排查步骤一步步排查。
            </p>
            <h3>用例 1：先插上 displaylink 扩展坞，再启动屏易连</h3>
            <ol>
                <li>targus 120 displaylink 扩展坞用 hdmi 线连接好 1080p 便携屏</li>
                <li>便携屏连接好供电</li>
                <li>targus 120 displaylink 扩展坞连接好供电</li>
                <li>targus 120 displaylink 扩展坞用 usb 线连接 iqoo 12</li>
                <li>iqoo12 应该弹出 usb 设备插入，是否启动屏易连的窗口</li>
                <li>点击确认之后，应该在便携屏上显示手机主屏镜像的画面</li>
            </ol>
            <h3>用例 2：先启动屏易连，再插上 displaylink 扩展坞</h3>
            <ol>
                <li>先启动屏易连</li>
                <li>targus 120 displaylink 扩展坞用 hdmi 线连接好 1080p 便携屏</li>
                <li>便携屏连接好供电</li>
                <li>targus 120 displaylink 扩展坞连接好供电</li>
                <li>targus 120 displaylink 扩展坞用 usb 线连接 iqoo 12</li>
                <li>iqoo12 应该弹出 usb 设备插入，是否启动屏易连的窗口</li>
                <li>点击确认之后，应该在便携屏上显示手机主屏镜像的画面</li>
            </ol>
            <h3>用例 3：先连接好displaylink，再插 hdmi 线</h3>
            <ol>
                <li>先启动屏易连</li>
                <li>targus 120 displaylink 扩展坞连接好供电</li>
                <li>targus 120 displaylink 扩展坞用 usb 线连接 iqoo 12</li>
                <li>iqoo12 应该弹出 usb 设备插入，是否启动屏易连的窗口</li>
                <li>点击确认之后，日志区域提示未找到显示器</li>
                <li>便携屏连接好供电</li>
                <li>targus 120 displaylink 扩展坞用 hdmi 线连接好 1080p 便携屏</li>
                <li>应该在便携屏上显示手机主屏镜像的画面</li>
            </ol>
            <h3>用例 4：插拔 hdmi 线</h3>
            <ol>
                <li>displink 处于工作状态</li>
                <li>拔下 hdmi 线</li>
                <li>重新插上 hdmi 线</li>
                <li>应该恢复画面</li>
            </ol>
        </div>)
    })
}