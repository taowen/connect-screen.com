export function Renewal() {
  return (
    <main className="renewal">
      <link rel="stylesheet" href="/static/renewal.css" />
      <header className="renewal-intro">
        <h1>屏易连</h1>
        <p>小屏接大屏观影，大屏幕多窗口游戏和办公。</p>
      </header>
      <div className="renewal-products">
        <a className="renewal-card bigger" href="https://biggerdroid.com/?lang=zh">
          <span className="renewal-label">小屏接大屏观影</span>
          <svg viewBox="0 0 240 120" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="100" y="8" width="126" height="93" rx="13" opacity=".5" />
            <path d="m152 40 25 14-25 14z" fill="currentColor" />
            <rect x="23" y="54" width="40" height="63" rx="8" />
            <path d="M38 105h10 M70 80l23-23m-13 0h13v13" />
          </svg>
          <h2>BiggerDroid</h2>
          <p>戴上 AR 眼镜看电影，接上投影仪和朋友看大片，或在大屏幕上追剧。手机当飞鼠遥控器，抬手就能在大屏上选片、暂停或换集。</p>
          <span className="renewal-domain">biggerdroid.com ↗</span>
        </a>
        <a className="renewal-card large" href="https://largedroid.com/?lang=zh">
          <span className="renewal-label">大屏幕多窗口游戏和办公</span>
          <svg viewBox="0 0 240 120" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="24" y="9" width="192" height="101" rx="14" opacity=".5" />
            <rect x="38" y="26" width="105" height="66" rx="7" />
            <rect x="153" y="26" width="49" height="29" rx="6" />
            <rect x="153" y="63" width="49" height="29" rx="6" />
            <path d="M38 38h105m-94 12 10 8-10 8m18 0h18" />
          </svg>
          <h2>LargeDroid</h2>
          <p>平板买回来，除了盖泡面还能干什么？把资料和文档并排打开，边查边写，忙完再开 Steam 玩一局。手机或者平板接上 AR 眼镜，还能让办公窗口悬停在眼前，转头就能看另一份资料。</p>
          <span className="renewal-domain">largedroid.com ↗</span>
        </a>
      </div>
      <footer>找旧版？<a href="/legacy">屏易连 1.6.3 下载和使用说明 →</a></footer>
    </main>
  )
}
