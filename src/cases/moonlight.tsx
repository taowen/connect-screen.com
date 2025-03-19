import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/moonlight', (c) => {
        return c.render(<div>
            <h2>usb 2.0 手机通过 moonlight 有线或者无线投屏</h2>
            <p>解决 usb 2.0 无法直接 typec 口接屏幕的问题。相比 displaylink 扩展坞方案，省去了购买扩展坞硬件的成本。
                缺点是不能直接 hdmi 接屏幕，只能接具有操作系统的设备。
                常见的能跑 moonlight 的设备</p>
            <ul>
                <li>Windows电脑或者平板</li>
                <li>安卓平板</li>
                <li>iPad</li>
                <li>安卓电视</li>
                <li>安卓机顶盒</li>
            </ul>
            <p>即然不能直接 hdmi 连屏幕。那为什么还要做 moonlight 投屏的支持呢？其他收费免费的无线投屏方案那么多，屏易连的就没有特色了。
                原因 1 是无论 displaylink 还是 typec有线直连，都需要一根线。有线就是不如无线方便的。
                原因 2，过于大家对于无线 WIFI 投屏的印象是延迟，帧率和清晰度都显著低于有线直连。moonlight 在无线投屏中算是优化得比较好的。
                可以挑战一下过去固有的无线投屏的屏幕不能当正常的屏幕使用的印象。
            </p>
            <h3>用例 1：wifi 无线连接</h3>
            <ol>
                <li>小米平板 5 接入家庭 wifi</li>
                <li>小米 14 接入相同家庭 wifi</li>
                <li>小米 14 启动屏易连</li>
                <li>小米平板 5 启动 moonlight</li>
                <li>小米平板 5 应该自动在设备列表中找到小米 14</li>
                <li>在小米平板 5 上点击设备图标之后，弹出配对密码输入界面</li>
                <li>输入完配对密码，应该出现 Desktop 图标</li>
                <li>点击 Desktop 图标，应该出现小米 14的镜像画面</li>
            </ol>
            <h3>用例 2：usb 有线连接 windows 平板</h3>
            <ol>
                <li>用 usb 线连接红米 k40 和 surface go 2</li>
                <li>红米 k40 开启 usb 网络共享，此时 surface go2 应该可以通过红米 k40 共享网络上网</li>
                <li>红米 k40 启动屏易连</li>
                <li>surface go 2 启动 moonlight</li>
                <li>surface go 2上应该自动在设备列表中找到红米 k40</li>
                <li>在surface go 2 上点击设备图标之后，弹出配对密码输入界面</li>
                <li>输入完配对密码，应该出现 Desktop 图标</li>
                <li>点击 Desktop 图标，应该出现红米 k40的镜像画面</li>
            </ol>
        </div>)
    })
}