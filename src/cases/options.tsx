import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/options', (c) => {
        return c.render(<div>
            <h2>应该选择哪种接屏幕的方式？哪种方式能全屏？</h2>
            <p>屏易连，接屏幕的方式有以下三种：
                <ul>
                    <li>usb 3.0 手机通过 typec 接口直接连屏幕</li>
                    <li>usb 2.0 手机通过 displaylink 扩展坞有线投屏</li>
                    <li>usb 2.0 手机通过 moonlight 有线或者无线投屏</li>
                </ul>
                
            </p>
            <p>
            如果你不知道你的手机是不是 usb 3.0 那基本上就是 usb 2.0 了。除了非常少数的型号，国内的手机基本上都是
                usb 2.0 的。直接接屏幕，比如说非智能系统的电视，便携屏，显示器，一般是通过 hdmi 接口。
                有一些便携屏和显示器有 typec 接口，usb 3.0 手机可以通过 typec 接口一根线接上便携屏。
                如果不支持 typec 接口的便携屏，则仍然需要一个 typec 转 hdmi 的扩展坞，才能让手机连接屏幕。
                对于 usb 2.0 的手机，这个带 displaylink 芯片的扩展坞就是 typec 接口转 hdmi 接口的作用。
                注意必须是带 displaylink 芯片的才行。
            </p>
            <p>
                moonlight 是一个投屏接收软件和前边两种方式不同，它不能直接跑在没有操作系统的屏幕上，因为屏幕没法运行软件嘛。
                所以这里有两个选择，要么是用一个平板电脑，笔记本电脑当屏幕来用，在平板上运行 moonlight 软件。
                要么是搞一个迷你小主机，电脑棒这样的没有屏幕只有主机的电脑，连接上屏幕，然后在迷你电脑上运行 moonlight。
                moonlight 软件是通过网络和手机上的屏易连进行投屏画面的传输的。这个网络可以是手机通过 usb 有线热点共享的网络，
                但更多是通过无线网络来实现互连。无线可以是家里路由器的无线网，也可以是手机开的热点。注意开热点的时候选择 wifi6 以及 5ghz 频段。
            </p>
            <p>
            屏易连，全屏方法有以下三种：
                <ul>
                    <li>镜像投屏大部分时候是有黑边的，对于播放 16:9 视频的时候会检测到并通过自动裁切缩放来实现全屏。在设置中默认已经勾选上了这个自动缩放功能了。</li>
                    <li>通过自动修改主屏宽高比来实现全屏</li>
                    <li>通过单应用投屏，让应用来适配扩展屏幕的分辨率</li>
                </ul>
            </p>
            <p>
                默认使用的全屏方法是第一种，因为这种自动缩放裁切是不需要特殊的 shizuku 授权的，适用于所有手机播放视频和玩模拟器游戏的场景。
                后面两种方法都需要 shizuku 权限，但是全屏的体验更好一些。
                对于 typec 直连的手机，单应用投屏不需要 shizuku 权限，也是不错的。
            </p>
            <p>所以 3（连接方式） * 3（全屏方式），一共有 9 种使用屏易连的模式。再加上 typec 直连的时候，分有 shizuku 权限和无 shizuku 权限。一共是 10 种工作模式。</p>
        </div>)
    })
}