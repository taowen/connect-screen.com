import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<>
    <div className="container">
      <header>
        <h1>安卓屏连功能说明</h1>
      </header>
      <main>
        <section>
          <h2>软件获取</h2>
          <p>安卓屏连目前仍然处于开发中的状态，最新版本的 apk 请
            <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=Plk177jevOVwOdK7DUUP2Ht3K5poa4_u&jump_from=webapi&authKey=UmNk2qswp3p+VDriWxwU99YggMG6r3zaQJMvfyjt8o42Rk544YVomyvf2L4V414a">
            加入 QQ 群 577902537
            </a>。或者在 QQ 中搜索“安卓屏连”。或者用 QQ 扫描下边的二维码</p>
            <img src="/static/qrcode-302.png" />
        </section>
        <section>
          <h2>为什么要开发安卓屏连</h2>
          <p>主要是给我个人使用的，发布出来只是为了方便和我有相同需求的同好。我的心愿单：</p>
          <ul>
            <li>USB 2.0 手机通过 displaylink 扩展坞连7寸16:9的便携屏当掌机用，解决比例造成的黑边。解决触控屏不好使的问题。竖屏旋转成横屏。</li>
            <li>USB 3.0 手机直连7寸16:9的便携屏当掌机用，解决比例造成的黑边。提供触控板</li>
            <li>手机连大便携屏投高德地图当车机用</li>
            <li>小屏幕的车机外接一个更大的扩展屏</li>
            <li>手机带到公司插上显示器，当办公pc用。上班只用带手机</li>
            <li>USB 2.0/3.0 的手机接 AR 眼镜看电影</li>
            <li>安卓手机全屏无线投到安卓大电视上，双屏异显，触控板</li>
            <li>苹果手机全屏无线镜像到安卓大电视上，裁切到电视的比例</li>
            <li>单个应用的视频流推到安卓大电视上</li>
          </ul>
        </section>
        <section>
          <h2>为什么不买 switch，为什么不用平板，为什么不……</h2>
          <p>
            手机已经成为身体的一部分
            <ul>
              <li>永不关机：大部分人晚上是不会关手机的，只会休眠，也不会掉什么电。你不会等待另外一个电子产品的开机过程，只要点亮屏幕就可以用。</li>
              <li>一直有电：永不关机的前提是你时刻会给它充电，就像饿了就要去吃饭一样。理论macbook，switch这些都可以永不关机，但是你不会有耐心再对另外一个设备像对待自己的身体那样，饿了就去吃饭。</li>
              <li>必携性：必携性是比便携性更上一个档次。你可以不带家门钥匙，不带门禁卡，但是不能不带手机出门。它是必须的。不像其他的便携产品那样，携带出门是optional的，是一个可选项。</li>
            </ul>
          </p>
        </section>
        <section>
          <h2>已经实现的功能</h2>
          <ul>
            <li>USB 2.0 手机通过 displaylink 连7寸16:9的便携屏当掌机用，通过裁切解决比例造成的黑边。入口是首页点“USB设备”按钮，选择连接的 displaylink 扩展坞，开始投屏。</li>
            <li>USB 3.0 手机直连7寸16:9的便携屏当掌机用，通过单应用投屏解决比例造成的黑边。入口是首页点“屏幕”按钮，选择外接的屏幕，选择应用投屏。</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>版权所有 &copy; 2024 安卓屏连</p>
      </footer>
    </div>
  </>)
})

export default app
