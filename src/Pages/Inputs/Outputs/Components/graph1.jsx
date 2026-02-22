import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
    ReferenceLine,
} from "recharts";

const formatMoney = (value) => `$${Number(value).toLocaleString()}`;

export default function InvestmentGraph({ data, breakEven }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">Investment vs Year</h2>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={formatMoney} width={100} />
                    <Tooltip formatter={formatMoney} />
                    <Legend />
                    <ReferenceLine
                        x={breakEven}
                        stroke="black"
                        strokeDasharray="5 5"
                        label="Break-even"
                    />
                    <Line
                        type="monotone"
                        dataKey="remainingInvestment"
                        name="Remaining Investment"
                        stroke="#d9534f"
                        strokeWidth={3}
                        isAnimationActive={true}
                    />
                    <Line
                        type="monotone"
                        dataKey="cumulativeSavings"
                        name="Cumulative Savings"
                        stroke="#2e8b57"
                        strokeWidth={3}
                        isAnimationActive={true}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
