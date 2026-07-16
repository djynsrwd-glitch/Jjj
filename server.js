const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080; // ضروري Render كيحتاج هاد السطر باش يحدد المنفذ تلقائياً

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("مرحباً بك! سيرفر SSHNasro شغال بنجاح على Render.");
});

app.get('/create-ssh', (req, res) => {
    const { username, password, server } = req.query;

    if (!username || !password) {
        return res.status(400).json({ error: "المرجو إدخال اسم المستخدم وكلمة المرور!" });
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    const expiryString = expiryDate.toLocaleDateString('ar-MA', { year: 'numeric', month: 'long', day: 'numeric' });

    const host = "sg-1.sshnasro.me"; // هنا غاتحط الهوست الدائم ديال السيرفرات ديالك فاش تكرييها

    const configResult = `
=================================
   👤 SSHNasro VPN ACCOUNT 👤
=================================
Server Host   : ${host}
SSH Port      : 22
SSL/TLS Port  : 443
WebSocket Port: 80 أو 8080
Username      : ${username}
Password      : ${password}
Created Date  : ${new Date().toLocaleDateString()}
Expired Date  : ${expiryString} (صالح لـ 3 أيام)

=================================
   🔌 HTTP Custom Payload (N6)
=================================
GET / HTTP/1.1[crlf]Host: free.facebook.com[crlf]Upgrade: websocket[crlf]Connection: Upgrade[crlf]Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==[crlf][crlf]

=================================
   📝 SSH / SSL Settings
=================================
حط هاد الرابط فـ خانة الـ Bug/SNI:
free.facebook.com
=================================
    شكراً لاستخدامك سيرفرات DJ Nasro! 🔥
`;

    res.json({
        success: true,
        message: "Account created successfully",
        config: configResult
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
