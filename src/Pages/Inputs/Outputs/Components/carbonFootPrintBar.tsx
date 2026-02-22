import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";

const formatCarbon = (value: number) =>
    `${Number(value).toLocaleString(undefined, {
        maximumFractionDigits: 0,
    })} kg`;

export default function CarbonFootprint({
    data,
}: {
    data: { year: number; Baseline: number; Sustainable: number }[];
}) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">
                Carbon Emissions Projection
            </h2>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={formatCarbon} />
                    <Tooltip
                        formatter={(value) => {
                            if (value == null) return "0 kg";
                            return `${Number(value).toLocaleString()} kg`;
                        }}
                    />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="Baseline"
                        stroke="#d9534f"
                        strokeWidth={3}
                        isAnimationActive={true}
                    />
                    <Line
                        type="monotone"
                        dataKey="Sustainable"
                        stroke="#2e8b57"
                        strokeWidth={3}
                        isAnimationActive={true}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
