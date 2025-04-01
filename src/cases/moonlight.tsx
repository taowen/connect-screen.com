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
            <p>所有的触摸或者其他反向控制都需要手机端给授权，至少是无障碍授权，一般需要 shizuku 授权。在屏易连的设置界面中会显示授权状态。</p>
            <p>在屏易连的百度网盘里放了大部分的moonlight客户端，安卓要装阿西西的版本否则没有触摸，ios的moonlight当然只能从苹果的软件商店下载。</p>
            <p>无论哪个版本都不支持键盘和手柄。这些外设直接接到手机上就好了。</p>
            <p>
                鼠标转发是支持的，要么使用屏易连下载中的“moonlight自启版”，这个直接默认就支持。
                或者进入moonlight的设置界面，勾选使用为远程桌面而不是游戏优化鼠标，然后进入投屏之后 ctrl+alt+shift+c 切换出光标。此时就可以用鼠标了
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
            <h3>用例 3：连接 ipad 中国区商店的 moonlight</h3>
            <ol>
                <li>ipad 从中国区商店下载 moonlight</li>
                <li>ipad 接入家庭 wifi</li>
                <li>小米 14 接入相同家庭 wifi</li>
                <li>小米 14 启动屏易连</li>
                <li>ipad 启动 moonlight</li>
                <li>ipad 应该自动在设备列表中找到小米 14</li>
                <li>在ipad 上点击设备图标之后，弹出配对密码输入界面</li>
                <li>输入完配对密码，应该出现 Desktop 图标</li>
                <li>点击 Desktop 图标，应该出现小米 14的镜像画面</li>
                <li>此时可以触摸，但是只支持单指触摸。原因是中国区商店的 moonlight 没有实现多指触摸的识别。</li>
            </ol>
            <h3>用例 4：连接 ipad 美国区商店的 moonlight 砖家版</h3>
            <ol>
                <li>ipad 从中国区商店下载 moonlight</li>
                <li>ipad 接入家庭 wifi</li>
                <li>小米 14 接入相同家庭 wifi</li>
                <li>小米 14 启动屏易连</li>
                <li>ipad 启动 moonlight</li>
                <li>ipad 应该自动在设备列表中找到小米 14</li>
                <li>在ipad 上点击设备图标之后，弹出配对密码输入界面</li>
                <li>输入完配对密码，应该出现 Desktop 图标</li>
                <li>点击 Desktop 图标，应该出现小米 14的镜像画面</li>
                <li>此时可以多点触摸</li>
            </ol>
        </div>)
    })
}