import React, { useMemo, useState } from "react";

function daysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export default function Contact() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);

  const now = new Date();
  const viewDate = useMemo(() => new Date(now.getFullYear(), now.getMonth() + monthOffset, 1), [now, monthOffset]);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleString(undefined, { month: "long" });

  const total = daysInMonth(year, month);
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun

  const cells = useMemo(() => {
    const blanks = Array.from({ length: firstDow }, () => null);
    const nums = Array.from({ length: total }, (_, i) => i + 1);
    return [...blanks, ...nums];
  }, [firstDow, total]);

  return (
    <section id="contact" className="bg-[#f4f1ea]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-[clamp(2.8rem,6vw,5rem)] leading-[0.95] font-black">
            Let&apos;s Work Together
          </h2>
          <p className="mt-3 text-black/70">Want to make your brand eco friendly?</p>
          <p className="text-black/70">Let&apos;s start today</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-sm border border-black/10 bg-white/40 h-[520px] md:h-[560px]">
            <img
              src="/contact.jpg"
              alt="Contact"
              className="h-full w-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="h-full w-full grid place-items-center text-black/60 text-sm">
              <span className="rounded-full bg-white/70 px-3 py-1 border border-black/10">
                Add public/contact.jpg (optional)
              </span>
            </div>
          </div>

          <div className="rounded-sm border border-black/10 bg-[#cfd0ff] p-6 md:p-10">
            <form className="space-y-7">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm text-black/80">First name *</label>
                  <input className="mt-2 w-full bg-transparent border-b border-black/40 focus:border-black outline-none py-2" />
                </div>
                <div>
                  <label className="text-sm text-black/80">Last name *</label>
                  <input className="mt-2 w-full bg-transparent border-b border-black/40 focus:border-black outline-none py-2" />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm text-black/80">Phone number *</label>
                  <input className="mt-2 w-full bg-transparent border-b border-black/40 focus:border-black outline-none py-2" />
                </div>
                <div>
                  <label className="text-sm text-black/80">Email *</label>
                  <input className="mt-2 w-full bg-transparent border-b border-black/40 focus:border-black outline-none py-2" />
                </div>
              </div>

              <div>
                <label className="text-sm text-black/80">Services</label>
                <select className="mt-2 w-full bg-transparent border-b border-black/40 focus:border-black outline-none py-2">
                  <option value="">Select a service</option>
                  <option>Strategy</option>
                  <option>Design</option>
                  <option>Marketing</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-black/80">Schedule an appointment</label>

                <div className="mt-3 rounded-md bg-white/35 border border-black/10 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <button
                      type="button"
                      onClick={() => setMonthOffset((v) => v - 1)}
                      className="px-2 py-1 rounded hover:bg-black/5"
                    >
                      ←
                    </button>
                    <div className="font-medium">
                      {monthName} {year}
                    </div>
                    <button
                      type="button"
                      onClick={() => setMonthOffset((v) => v + 1)}
                      className="px-2 py-1 rounded hover:bg-black/5"
                    >
                      →
                    </button>
                  </div>

                  <div className="mt-3 grid grid-cols-7 gap-2 text-xs text-black/70">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                      <div key={d} className="text-center">{d}</div>
                    ))}
                  </div>

                  <div className="mt-2 grid grid-cols-7 gap-2">
                    {cells.map((n, idx) => (
                      <button
                        key={idx}
                        type="button"
                        disabled={n === null}
                        onClick={() => setSelectedDay(n)}
                        className={[
                          "h-9 rounded text-sm transition",
                          n === null ? "opacity-0 pointer-events-none" : "hover:bg-black/10",
                          n === selectedDay ? "bg-black text-white hover:bg-black" : "bg-white/30",
                        ].join(" ")}
                      >
                        {n ?? ""}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-2 w-full rounded-sm bg-[#0c120b] py-3 text-white text-sm font-medium hover:opacity-95"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}