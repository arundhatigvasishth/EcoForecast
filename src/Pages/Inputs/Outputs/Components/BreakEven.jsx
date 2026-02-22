export default function BreakEven({ year }) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold mb-2">Break-Even Analysis</h2>
            <p className="text-lg">
                Break-even occurs in <span className="font-black">{year}</span>{" "}
                years.
            </p>
        </div>
    );
}
