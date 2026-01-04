import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const FILE = "./users.json";

/* helper */
const readUsers = () => JSON.parse(fs.readFileSync(FILE));
const writeUsers = (data) =>
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

/* ===== REGISTER ===== */
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    const users = readUsers();
    const exist = users.find((u) => u.email === email);
    if (exist) return res.status(400).json({ message: "User exists" });

    const hash = await bcrypt.hash(password, 10);

    users.push({ name, email, password: hash });
    writeUsers(users);

    res.json({ message: "Registered successfully" });
};

/* ===== LOGIN ===== */
export const login = async (req, res) => {
    const { email, password } = req.body;

    const users = readUsers();
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(400).json({ message: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    /* 🍪 COOKIE */
    res.cookie("token", token, {
        httpOnly: true,
     secure: true,        // ✅ HTTPS (Vercel)
     sameSite: "none",    // ✅ Cross-origin cookie
 });

    res.json({ message: "Login success", user: { name: user.name, email } });
};

/* ===== DUMMY API ===== */
export const dummyData = (req, res) => {
    res.json({
        success: true,
        data: [
            { id: 1, title: "React Tutorial" },
            { id: 2, title: "CORS Explained" },
            { id: 3, title: "JWT Auth" },
        ],
    });
};
