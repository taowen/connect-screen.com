import './displaylink.css'

function DisplayLinkDevices() {
    return <div>
        <h2>DisplayLink 设备</h2>
        <table className="device-table">
            <thead>
                <tr>
                    <th>设备型号</th>
                    <th>电源适配器</th>
                    <th>USB输入线</th>
                    <th>连接手机额外转接</th>
                    <th>视频输出接口</th>
                    <th>备注</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div><a href="https://us.targus.com/blogs/discover-targus/new-dock120-targus-universal-docking-station">Targus 120</a></div>
                    </td>
                    <td>
                        5V圆口
                    </td>
                    <td>
                        Micro Type-B USB
                    </td>
                    <td>
                        因为 Micro Type-B USB 的线，一般都是一端 A 口，一端是 Micro B 口的。
                        所以接手机还需要再转接一次到 C 口。
                        可以选择 OTG 边用边充线
                    </td>
                    <td>
                        <div>HDMI x 2</div>
                        <div>DVI x 1</div>
                    </td>
                    <td>优点是5v供电就可以，手机能够直接带得动</td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default DisplayLinkDevices;
