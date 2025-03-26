import { Hono } from 'hono'

export function configure(app: Hono) {
    app.get('/cases/shizuku', (c) => {
        return c.render(<div>
            <h2>什么是 shizuku？为什么我没有办法投单应用？</h2>
            <p>投屏本来是应该操作系统自己来实现的。因为国产手机的操作系统不做为，使得其投屏体验有各种各样的问题。
                如果国产手机的外接屏幕体验能做到和 windows一样，那我也没有必要开发屏易连了。
                正因为屏易连是越俎代庖，一个普通安卓应用去做了操作系统才应该做的事情，所以必须需要操作系统的特权。
                而 shizuku 就是在目前国产安卓手机上，普通用户能获得的最高权限了。
                小米，vivo 和 oppo 还有华为这些主流新手机都无法解锁 boot loader，也无法获取 root 权限了。
            </p>
            <p>单应用投屏需要把应用启动到指定的屏幕上，如果这个屏幕是操作系统创建的，比如是 usb 3.0 手机，typec 直连屏幕的，那么是可以不用 shizuku 权限就单应用投屏的。
                如果这个屏幕是屏易连创建的，则需要 shizuku 权限才能把应用启动到这块屏幕上。shizuku 权限每次手机重启之后要重新获取。shizuku 权限只能在 wifi 网络下获取。
                但是 shizuku 权限在网络离开了 wifi 切换到 5g 之后并不会失去。
            </p>
            <p>在屏易连的设置界面中可以查看当前屏易连是否已经获得了 shizuku 授权。授权方式参见下列视频教程：</p>
            <ul>
                <li><a href="https://www.bilibili.com/video/BV1B9e4enEwX/">激活全品牌手机Shizuku方法</a></li>
                <li><a href="https://www.bilibili.com/video/BV1Ac1dYSELU/">安卓免root神器，Shizuku全机型激活教程！</a></li>
                <li><a href="https://www.bilibili.com/video/BV12rA2eGEVF/">全网最全电脑手机多种方式激活华为或安卓11以下的shizuku（带激活无线调试）</a></li>
                <li><a href="https://www.bilibili.com/video/BV1nTsZeDELi/">小米红米：激活shizuku教程</a></li>
            </ul>
        </div>)
    })
}