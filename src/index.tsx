import { Hono } from 'hono'
import { renderer } from './renderer'
import * as typec_alt_dp from './cases/typec-alt-dp'
import * as displaylink from './cases/displaylink'
import * as moonlight from './cases/moonlight'
import * as miracast from './cases/miracast'
import * as audio from './cases/audio'
import * as screen_off from './cases/screen-off'
import * as internal_touchpad from './cases/internal-touchpad'
import * as internal_touchscreen from './cases/internal-touchscreen'
import * as external_touchscreen from './cases/external-touchscreen'
import * as auto_rotate from './cases/auto-rotate'
import * as auto_scale from './cases/auto-scale'
import * as single_app from './cases/single-app'
import * as auto_font_size from './cases/auto-font-size'
import * as auto_aspect_ratio from './cases/auto-aspect-ratio'
import * as ime from './cases/ime'
import * as mouse from './cases/mouse'
import * as keyboard from './cases/keyboard'
import * as gamepad from './cases/gamepad'
import * as protection from './cases/protection'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<>
    <div className="container">
      <header>
        <h1>屏易连功能说明</h1>
        <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
      </header>
      <main>
        <section>
          <h2>软件获取</h2>
          <p>屏易连目前仍然处于开发中的状态，最新版本的 apk 请
            <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=Plk177jevOVwOdK7DUUP2Ht3K5poa4_u&jump_from=webapi&authKey=UmNk2qswp3p+VDriWxwU99YggMG6r3zaQJMvfyjt8o42Rk544YVomyvf2L4V414a">
            加入 QQ 群 391036729
            </a>。或者在 QQ 中搜索“安卓屏连”。或者用 QQ 扫描下边的二维码</p>
            <img src="/static/qrcode-302.png" />
          <p>如果你是软件开发者，也可以从 <a href="https://gitee.com/connect-screen/connect-screen" target="_blank">https://gitee.com/connect-screen/connect-screen</a> 获取源代码自行编译</p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '8px'
          }}>
            <a href="https://pan.baidu.com/s/1Wsz1c7ei69jlAT5wjdCzPA?pwd=1234" style={{
                padding: '12px 24px',
                fontSize: '18px',
                borderRadius: '8px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block'
              }}>
              下载安装包
            </a>
          </div>
        </section>
        <section>
          <h2>目标 1：接上了屏幕之后无法全屏，屏幕比例不对，导致黑边</h2>
          <p>
            接个大屏幕的核心诉求是大。但是你真把手机接过一次大电视的时候，你就发现那屏幕一点都不大。
          接上之后你发现只能镜像一个小小屏幕展示和手机主屏一样的画面。
          这个问题的原因是手机的宽高比例大概是 2:1，而大部分显示器或者电视的宽高比例是 16:9 的场景。
          这就导致了手机的画面直接镜像是无法占满全屏的。
          而且我们也不希望只能镜像，我投屏看电影的时候手机还要刷微信呢。我投屏打游戏的时候，手机还要查攻略呢。
          屏易连支持投单个应用到显示器，从而让这一个应用去占满屏幕。如果投过去的应用是类似“微软桌面”这样的启动器应用，
          你就获得了一个类似锤子 TNT 的第二块桌面。
          这个功能对于安卓手机的“无线投屏”功能也是可以用的，你可以无线连接你家电视，然后投单个应用实现全屏看b站视频。
          </p>
        </section>
        <section>
          <h2>目标 2：不是所有手机都是 usb 3.0 的接口</h2>
          <p>手机用线直连显示器需要 usb 接口是 3.0 规格的，但是 usb 2.0 手机买的时候你可能没注意到这一点。
            等你用的时候就发现接不了显示器了。
            红米 k80 pro 都卖到了 4000 元这个价位了，还是在用万年的 usb 2.0 接口。
            也许你听过一个叫 <a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a> 的拓展坞可以让 usb2.0 接口的手机也能连显示器。
            但是全屏，触摸，竖屏旋转这些功能你需要用屏易连才能让 <a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a> 这个宝藏硬件得到充分的利用。
            除了 <a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a> 方案，屏易连也支持无线的方案来解决 usb 2.0 手机接大屏幕的问题。</p>
        </section>
        <section>
          <h2>为什么要开发屏易连，你打算卖多少钱？</h2>
          <p>这是给我个人使用的，发布出来只是为了方便和我有相同需求的同好。
            开源了所有代码 <a href="https://gitee.com/connect-screen/connect-screen" target="_blank">https://gitee.com/connect-screen/connect-screen</a>，没有盈利模式。
            也欢迎你去我的 b 站账号 <a href="https://space.bilibili.com/494726825" target="_blank">https://space.bilibili.com/494726825</a> 投两个免费的硬币。
            通过实现目标 1 和目标 2，可以组合出一些场景：</p>
          <ul>
            <li>接 7 寸便携屏当个便携掌机</li>
            <li>接 13 寸便携屏移动办公</li>
            <li>有线接 AR 眼镜看电影办公</li>
            <li>无线投 AR 眼镜，把手机做为 AR 应用的本地算力</li>
            <li>手机带到公司插上显示器，当办公pc用。上班只用带手机</li>
            <li>无线连接旧平板，利用手机的算力提升平板体验</li>
            <li>无线投屏大电视，免得买电视上的视频会员</li>
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
            给安卓手机扩展更多的使用场景，不要因为手机屏幕小而把用途给限制住了。
          </p>
        </section>
        <section>
          <h2>屏易连的镜像全屏功能</h2>
          <p>
            屏易连默认是镜像投屏模式，两个屏幕上显示的是相同的内容，用户仍然可以通过操作主屏来控制扩展屏。
            屏易连相比安卓自带的镜像模式添加了自动旋转的功能，这样在使用抖音这样的竖屏应用的时候可以自动旋转屏幕方向。
            而且在用 bilibili 等视频应用看 16:9 比例的电影的时候，可以根据黑边的大小自动通过缩放来裁切掉黑边从而达到全屏镜像的效果。
          </p>
        </section>
        <section>
          <h2>屏易连的单应用投屏功能</h2>
          <p>
            如果有 shizuku 权限，可以考虑进阶的单应用投屏的玩法，可以在更多的场景下实现全屏。
            设置中选择单应用投屏，然后选择一个应用。下次连接屏幕的时候，这个应用会自动在扩展屏上打开。
          </p>
        </section>
        <section>
            <h2>屏易连支持三种连接屏幕的方式</h2>
            <ul>
              <li>moonlight 客户端通过无线投屏。https://moonlight-stream.org/ 有几乎所有平台的客户端。</li>
              <li>usb 2.0 手机通过 displaylink 扩展坞有线投屏。不推荐买 displaylink 扩展坞硬件了，我觉得 moonlight 足够用了。</li>
              <li>usb 3.0 手机有线投屏</li>
            </ul>
        </section>
        <section>
          <h2>常见问题</h2>
          <ul>
            <li>输入输出
              <ul>
              <li><a href="/cases/typec-alt-dp">usb 3.0 手机通过 typec 接口直接连屏幕</a></li>
              <li><a href="/cases/displaylink">usb 2.0 手机通过 displaylink 扩展坞有线投屏</a></li>
              <li><a href="/cases/moonlight">usb 2.0 手机通过 moonlight 有线或者无线投屏</a></li>
              <li><a href="/cases/protection">投屏出来的微信是模糊的，键盘则完全看不见</a></li>
              </ul>
            </li>
            <li>
              让镜像模式全屏
              <ul>
                <li>TODO</li>
              </ul>
            </li>
            <li>
              让扩展模式全屏
              <ul>
                <li>TODO</li>
              </ul>
            </li>
          </ul>
        </section>
        <section>
          <h2>更新日志</h2>
          <ul>
            <li>
            屏易连-1.5.4
              <ul>
                <li>部分机型在开启无障碍之后蓝牙手柄会不正常，设置中新增禁用所有无障碍（包括其他应用的无障碍）的选项</li>
                <li>增加自动连接Moonlight自启版的选项，省去在Moonlight那边点击连接的步骤</li>
              </ul>
            </li>
            <li>
              屏易连-1.5.3
                <ul>
                  <li>修复 ipad 无法触摸的问题</li>
                  <li>尝试修复部分应用 moonlight 无线投屏没有声音的问题</li>
                </ul>
            </li>
            <li>
            屏易连-1.5.2
              <ul>
                <li>修复usb3.0直连单应用投屏异常旋转的问题</li>
                <li>修复moonlight无线投屏触摸错位和多点触摸失灵的问题</li>
                <li>增加在镜像模式下也显示悬浮返回按钮的选项</li>
              </ul>
            </li>
            <li>
            屏易连-1.5.1
              <ul>
                <li>支持在 moonlight 无线镜像模式投屏的时候，利用 shizuku 权限或者无障碍权限进行触摸控制</li>
              </ul>
            </li>
            <li>
            屏易连-1.5.0
              <ul>
                <li>修复投影权限需要给两次的问题</li>
                <li>支持 ipad moonlight 的单指触摸</li>
              </ul>
            </li>
            <li>
            屏易连-1.4.9
              <ul>
                <li>修复 displaylink 单应用投屏无法使用触摸屏的 bug</li>
                <li>支持无线热点或者usb热点连接moonlight</li>
              </ul>
            </li>
            <li>
            屏易连-1.4.7
              <ul>
                <li>修复 type-c 直连情况下，单应用投屏不出现熄屏按钮的问题</li>
                <li>增加 ”启用主屏触摸控制扩展屏“ 的选项，切换触摸屏和触控板</li>
                <li>增加 ”自动改变主屏宽高比以适配扩展屏" 选项，需要 shizuku 权限，对部分机型不生效，会画面拉伸</li>
              </ul>
            </li>
            <li>
            屏易连-1.4.6
              <ul>
                <li>修复单应用投屏的触摸屏触摸不灵敏，退出闪退等问题</li>
                <li>添加是否使用外接屏幕的喇叭的选项</li>
                <li>添加是否自动移动输入法到外接屏幕的选项</li>
                <li>设置中添加使用鼠标和手柄的条件说明，添加如何唤醒熄屏的说明</li>
              </ul>
            </li>
            <li>
            屏易连-1.4.5
              <ul>
                <li>修复偏色问题，修复moonlight无法自动发现的问题，修复上版卡顿的问题</li>
                <li>增加手工熄屏的按钮</li>
                <li>增加触摸屏按钮，用手机主屏触摸控制单应用投屏，功能类似屏连的触摸板</li>
              </ul>
            </li>
            <li>
            屏易连-1.4.4
              <ul>
                <li>moonlight 无线投屏开始的时候自动静音</li>
                <li>添加自动熄屏选项</li>
                <li>修复 moonlight 无线投屏的色彩问题</li>
              </ul>
            </li>
            <li>
            屏易连-1.4.3
              <ul>
                <li>moonlight 无线投屏支持 h265 编码</li>
                <li>设置中授予了无障碍权限可自动跳过询问投屏权限弹窗</li>
                <li>设置中授予了悬浮窗权限可显示悬浮返回按键</li>
              </ul>
            </li>
            <li>
            屏易连-1.4.2
              <ul>
                <li>修复 pc moonlight 的兼容问题</li>
                <li>单应用投屏时，增加悬浮返回键。单击返回上一级，双击返回投屏应用</li>
              </ul>
            </li>
            <li>
            屏易连-1.4.1
              <ul>
                <li>修复moonlight无线投屏下，多指手势的bug</li>
                <li>增加单应用投屏的 dpi 设置</li>
                <li>typec直连的时候，单应用投屏不需要shizuku权限了</li>
              </ul>
            </li>
            <li>
              屏易连-1.4.0
              <ul>
                <li>moonlight 无线投屏支持触摸反控，条件是设置里授予了 shizuku 权限，并且勾选了单应用投屏</li>
              </ul>
            </li>
            <li>
              屏易连-1.3.9
              <ul>
                <li>moonlight 无线投屏支持了音频</li>
                <li>设置中给了 shizuku 权限之后，moonlight 无线投屏也支持了单应用投屏</li>
              </ul>
            </li>
            <li>
              屏易连-1.3.8
              <ul>
                <li>改善 moonlight 投屏的 h264 编码器兼容性。仍未支持触摸和音频</li>
                <li>moonlight 退出投屏的时候会自动重启屏易连进程</li>
              </ul>
            </li>
            <li>
              屏易连-1.3.7
              <ul>
                <li>增加 moonlight 无线投屏支持，可以通过 windows/ipad/android 等各种 moonlight 客户端实现视频输出。目前只实现了 h264 编码，暂未实现反向控制和音频。</li>
                <li>设置中增加 shizuku 授权入口。给予 shizuku 权限之后, moonlight 无线投屏创建的无线屏幕也可以通过“屏连”进行单应用投屏。</li>
              </ul>
            </li>
            <li>
              屏连-1.3.7
              <ul>
              <li>修复“模拟熄屏”按钮的闪退问题</li>
              </ul>
            </li>
            <li>
             安卓屏连 & 屏易连-1.3.6
              <ul>
                <li>拆分屏连和屏易连为独立的 apk</li>
                <li>注意安装包名变更了，需要手工卸载旧版本</li>
              </ul>
            </li>
            <li>
              安卓屏连-1.3.5
              <ul>
                <li>修复屏易连的启动崩溃</li>
                <li>修复虚拟触控板无法单击的问题</li>
              </ul>
            </li>
            <li>
              安卓屏连-1.3.4
              <ul>
                <li>改进触控板的稳定性</li>
                <li>响应HOME按钮，重新启动最近投屏的单应用。如果投屏的是微软桌面，这样就能回到微软桌面</li>
              </ul>
            </li>
            <li>
              安卓屏连-1.3.3
              <ul>
                <li>拆分成“屏连”和“屏易连”两个桌面图标入口，"屏易连"入口提供镜像模式投屏，支持typec直连和displaylink，支持竖屏应用自动旋转，支持通过缩放自动裁切黑边。“屏连”入口提供原有的扩展投屏，或者叫异步投屏的功能。</li>
              </ul>
            </li>
            <li>
              安卓屏连-1.3.2
              <ul>
                <li>屏蔽华为设备上的“强制桌面选项”</li>
                <li>启动 termux x11 的时候，执行解除 max_phantom_processes 的限制</li>
              </ul>
            </li>
            <li>
              安卓屏连-1.3.1
              <ul>
                <li>应用列表增加“显示所有应用”的选项</li>
                <li>如果外接屏幕因为系统错误识别为有刘海，导致顶部有一条黑边，桥接屏幕可以自动覆盖刘海造成黑边（需要 shizuku 授权才会出现桥接按钮）</li>
              </ul>
            </li>
            <li>
              安卓屏连-1.3.0
              <ul>
                <li>修复真实熄屏音量键无法唤醒的问题</li>
              </ul>
            </li>
            <li>
              安卓屏连-1.2.8
              <ul>
                <li>自动投屏应用之后，首页增加“触控板”的快捷入口</li>
                <li>展示悬浮返回键，增加“附带强制横屏效果”的选项。在展示悬浮返回键的同时，可以让默认竖屏的应用强制横屏展示</li>
                <li>设置中增加“真实熄屏代替模拟熄屏”的选项</li>
                <li>增加投屏 Termux X11 的按钮，在模拟熄屏状态下可以转发键盘鼠标给自带的这个 Termux X11</li>
              </ul>
            </li>
            <li>
              安卓屏连-1.2.7
              <ul>
                <li>增加 shizuku 的安装启动引导</li>
                <li>应用列表增加图标</li>
                <li>安卓10上尝试修复应用不支持分屏的提示</li>
                <li>触控板的虚拟光标更大更醒目</li>
                <li>模拟熄屏的时候会设置焦点，让手柄能控制屏幕，需要启动过一次触控板并授予过无障碍权限</li>
              </ul>
            </li>
            <li>
              安卓屏连-1.2.6
              <ul>
                <li>修复无法桥接无线投屏的问题</li>
                <li>增加“停用外接屏幕的声音输出”的设置项，强制用其他渠道的喇叭</li>
              </ul>
            </li>
            <li>安卓屏连-1.2.5
              <ul>
                <li>解决插上 displaylink 能识别扩展坞但是找不到显示器的 bug</li>
                <li>增加悬浮返回按钮，方便在便携触摸屏上单击返回上一级，双击返回启动的应用。如果启动的是微软桌面这样的启动器，双击就相当于返回桌面。</li>
                <li>displaylink 投屏增加 dpi 选项</li>
                <li>输入设备改名为设置，并增加开发者选项中”强制桌面模式“等相关选项。</li>
              </ul>
            </li>
            <li>安卓屏连-1.2.4
              <ul>
                <li>displaylink触摸屏范围扩大：即便是有shizuku权限，安卓10,11,12以及部分特殊系统仍然无法绑定输入设备到 displaylink 虚拟显示器。此时可以通过点击“模拟熄屏”按钮，利用“模拟器熄屏”的全屏画面把触摸屏的触摸操作转发回对应的屏幕达到触摸的效果。</li>
                <li>桥接状态下触摸屏支持范围扩大：桥接同样也是创建虚拟显示器，也有绑定不了输入设备的可能性。利用“桥接”创建的全屏画面也做了触摸操作的转发，从而是的触摸屏在桥接时也能工作正常。</li>
              </ul>
            </li>
            <li>安卓屏连-1.2.3
              <ul>
                <li>增加应用搜索功能</li>
                <li>把 USB 设备界面拆分成 Displaylink 和输入设备两个独立入口</li>
                <li>Displaylink 在 USB 断开的时候不会终止投屏，应用仍然会保持在后台运行。当 USB 线重新插上，再一次点 Displaylink 投屏，会复用之前的虚拟显示器把后台应用重新投屏。</li>
              </ul>
            </li>
            <li>安卓屏连-1.2.2
              <ul>
                <li>解决抖音不能全屏的问题：displaylink一直都可以全屏，typec直连用户之前只有安卓15才能旋转。这个版本开始，在屏幕详情里点“桥接”按钮，勾选跟随内容旋转，点确定。然后再选择单应用投屏，就可以竖屏旋转从而全屏了。</li>
                <li>解决高德导航拔掉显示器之后退出导航的问题：同上，屏幕详情里点“桥接”按钮。因为导航不再是直接投到typec直连的显示器上，而是投到一块虚拟屏幕上。所以拔线之后高德地图不会退出导航。</li>
              </ul>
            </li>
            <li>安卓屏连-1.2.1
              <ul>
                <li>首页增加”模拟熄屏"的快速入口</li>
                <li>修复安卓11的闪退</li>
                <li>安卓10在有 shizuku 权限的时候，typec直连显示器，可以使用触摸屏和虚拟触控板</li>
                <li>注意，由于系统限制安卓10和安卓11使用 displaylink 是无法支持触摸屏的</li>
              </ul>
            </li>
            <li>安卓屏连-1.2.0
              <ul>
                <li>支持安卓12和安卓10操作系统的单应用投屏，安卓11暂未测试</li>
                <li>添加了自动打开上次投屏应用的开关，displaylink投屏页或者typec直连的屏幕详情页均有此选项。推荐每次都只投微软桌面这样的启动器</li>
              </ul>
            </li>
            <li>安卓屏连-1.1.9
              <ul>
                <li>支持安卓13上使用 displaylink 进行单应用投屏，使用虚拟触控板</li>
                <li>支持安卓10上使用 typec 直连显示器时的单应用投屏，因为安卓10的限制，无法使用虚拟触控板</li>
              </ul>
            </li>
            <li>安卓屏连-1.1.8
              <ul>
                <li>无论是通过 usb3 直连显示器还是<a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a>接显示器，在单应用投屏之后会把所有usb外设路由到应用所投的显示器。需要安装 shizuku 并授权。</li>
                <li>usb设备列表里找到usb设备，可以手工切换改设备的路由所绑定的显示器</li>
                <li><a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a>投屏会记住上次的设置</li>
              </ul>
            </li>
            <li>安卓屏连-1.1.7
              <ul>
                <li>在屏幕详情的界面里增加“在此屏显示输入法"的按钮，让触摸屏的用户可以在外接显示器上直接触控打字。</li>
              </ul>
            </li>
            <li>安卓屏连-1.1.6
              <ul>
                <li><a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a> 投屏增加帧率输入框，可以120hz投屏1080p，至少有心理作用加成</li>
                <li>如果给了 shizuku 授权，<a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a> 省去一步投屏权限确认的弹窗</li>
              </ul>
            </li>
            <li>安卓屏连-1.1.5
              <ul>
                <li>修复在安卓15以下修改 typec 直连的屏幕旋转方向会闪退的bug，但是仍然只有安卓15才能修改旋转方向成功</li>
              </ul>
            </li>
            <li>安卓屏连-1.1.4
              <ul>
                <li>屏幕详情页面增加强制旋转屏幕的按钮，需要 shizuku 授权</li>
                <li><a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a> 选择单应用投屏时，增加屏幕是否自动跟随应用旋转的选项</li>
              </ul>
            </li>
            <li>安卓屏连-1.1.3
              <ul>
                <li>usb2.0手机通过<a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a>能单应用全屏投屏，但之前仅能用蓝牙手柄控制。这个版本新增了对触控屏，usb键盘鼠标等外设的支持</li>
                <li><a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a>快捷设置分辨率增加了 ipad4 分辨率。方便购买 ipad 廉价便携屏的用户</li>
                <li>屏幕列表中增加了“无线投屏”的快捷方式入口</li>
                <li>增加了修改显示器 DPI 的功能</li>
              </ul>
            </li>
            <li>安卓屏连-1.1.2
              <ul>
                <li>触控板增加锁定光标功能，锁定后可以刷抖音</li>
                <li>无障碍模式下启动的触控板在锁定光标后也可以刷抖音</li>
              </ul>
            </li>
            <li>安卓屏连-1.1.1
              <ul>
                <li>修复有 shizuku 权限时的单应用投屏按钮闪退</li>
              </ul>
            </li>
            <li>安卓屏连-1.1.0
              <ul>
                <li>修复触控板不能刷抖音的问题</li>
                <li>修复休眠按钮的闪退</li>
                <li>选择投屏应用的界面增加跳转到触控板的按钮，如果已经有授权，投屏应用后会自动跳转到触控板界面</li>
              </ul>
            </li>
            <li>安卓屏连-1.0.9
              <ul>
                <li>安装了 shizuku 的时候，虚拟触控板询问 shizuku 权限代替无障碍权限，并且直接转发触控事件给目标显示器，从而支持无障碍模式下未实现的双指缩放等手势。只要对应的应用支持的手势都支持</li>
              </ul>
            </li>
            <li>安卓屏连-1.0.8
              <ul>
                <li><a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a> 选择 16:9 裁切的时候增加如何裁切的说明</li>
                <li>再次修复了 shizuku 模式下触控板无法使用或者闪退的问题</li>
              </ul>
            </li>
            <li>安卓屏连-1.0.7
              <ul>
                <li>修复 dell d3100 的兼容性问题，支持双 <a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a> usb 设备</li>
                <li><a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a> 检测到显示器之后会自动开始投屏</li>
              </ul>
            </li>
            <li>
              安卓屏连-1.0.6
              <ul>
                <li>修复 shizuku 模式下触控板失灵的问题</li>
              </ul>
            </li>
            <li>
              安卓屏连-1.0.5
              <ul>
                <li>usb 2.0 的手机也可以单应用投屏了！需要 shizuku 授权，在 <a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a> 设备详情页面下选择投屏模式“投屏单个应用"</li>
                <li>提供虚拟触控板，让没有触摸屏的第二块屏也能单应用投屏。需要悬浮窗和无障碍权限</li>
                <li>可修改显示器分辨率。大部分机型不允许修改主屏的分辨率，提供出来只是做为一种方便实验的手段。需要 shizuku 授权</li>
              </ul>
            </li>
            <li>
              安卓屏连-1.0.4
              <ul>
                <li>添加回主屏按钮，把应用从远端召回</li>
                <li>记忆最近投屏过的应用</li>
              </ul>
            </li>
            <li>
              安卓屏连-1.0.3
              <ul>
                <li>对于 typec 能直连的 usb3 机器，增加了投屏单个应用的功能。进入屏幕列表，选择屏幕，选择应用，点启动就可以了。</li>
                <li>对于需要 <a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a> 的 usb2 机器，增加了“普通镜像”和“16:9”裁切的选项</li>
              </ul>
            </li>
            <li>
              安卓屏连-1.0.1
              <ul>
                <li>新增了给<a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a>强开2k分辨率的功能</li>
              </ul>
            </li>
            <li>
              安卓屏连-1.0.0
              <ul>
                <li>usb 2.0 的手机通过 <a href="https://docs.qq.com/doc/DUUN2ZWZpQmhZUkhZ" target="_blank">displaylink</a> 投屏因为宽高比例问题有黑边。通过裁切部分画面，把比例调整为 16:9 从而实现全屏。适用于模拟器游戏，b站视频等画面本身就是 16:9 的场景。</li>
              </ul>
            </li>
          </ul>
        </section>
      </main>
      <footer>
        <p>版权所有 &copy; 2025 屏易连</p>
      </footer>
    </div>
  </>)
})

app.get('/download-latest', async (c) => {
  return c.redirect('/static/download-latest/index.html')
})

// output
typec_alt_dp.configure(app)
displaylink.configure(app)
moonlight.configure(app)
miracast.configure(app)
audio.configure(app)
screen_off.configure(app)
protection.configure(app)
// input
external_touchscreen.configure(app)
// mirror mode fullscreen
auto_rotate.configure(app)
auto_scale.configure(app)
auto_font_size.configure(app)
auto_aspect_ratio.configure(app)
// extend mode fullscreen
single_app.configure(app)
internal_touchpad.configure(app)
internal_touchscreen.configure(app)
ime.configure(app)
mouse.configure(app)
keyboard.configure(app)
gamepad.configure(app)

export default app
