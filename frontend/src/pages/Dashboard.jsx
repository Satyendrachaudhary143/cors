import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get("/dummy").then((res) => {
            setData(res.data.data);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="grid md:grid-cols-3 gap-4">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-4 rounded-lg shadow"
                    >
                        <h2 className="font-semibold">{item.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
