import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";

const formatMoney = (value) =>
    `$${Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

export default function ComparisonGraph({ data }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">
                Cost Projection (Traditional vs Sustainable)
            </h2>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={formatMoney} />
                    <Tooltip formatter={formatMoney} />
                    <Legend />

                    <Bar
                        dataKey="Traditional"
                        fill="#d9534f"
                        isAnimationActive={true}
                    />
                    <Bar
                        dataKey="Sustainable"
                        fill="#2e8b57"
                        isAnimationActive={true}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
