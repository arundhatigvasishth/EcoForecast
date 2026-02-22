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

const formatLabel = (value) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
};

export default function ComparisonGraph({ data }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">
                Cost Projection (Traditional vs Sustainable)
            </h2>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="category"
                        tickFormatter={formatLabel}
                        interval={0}
                        angle={-25}
                        textAnchor="end"
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis tickFormatter={formatMoney} />
                    <Tooltip
                        formatter={formatMoney}
                        labelFormatter={formatLabel}
                    />
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
