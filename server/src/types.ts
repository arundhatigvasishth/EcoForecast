export type Quarter = "Q1" | "Q2" | "Q3" | "Q4";

export type QuarterlyLine = {
  q: Quarter;
  usage: number;
  cost: number;
};

export type QuarterlyInputs = {
  electricity: QuarterlyLine[];
  water: QuarterlyLine[];
  fuel: QuarterlyLine[];
};