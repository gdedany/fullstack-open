import { sum } from "lodash";
interface output {
  periodLength: number;
  trainingDays: number;
  average: number;
  success: boolean;
  target: number;
  rating: number;
  ratingDescription: string;
}
const getRating = (average: number, target: number): number => {
  if (average / target < 0.5) {
    return 1;
  }
  if (average / target < 1 && target / average >= 0.5) {
    return 2;
  }
  if (average / target >= 1) {
    return 3;
  } else {
    return -1;
  }
};
const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 1: {
      return "you should really try harder";
    }
    case 2: {
      return "not too bad but could be better";
    }
    case 3: {
      return "someone is on fire";
    }
    default: {
      return "malformatted parameters";
    }
  }
};

const exerciseCalculator = (target: number, days: number[]): output => {
  if (
    isNaN(target) ||
    !Array.isArray(days) ||
    days.some((item) => isNaN(item))
  ) {
    throw new Error("malformatted parameters");
  }
  const trainingDays = days.filter((d) => d > 0).length;
  const average = sum(days) / days.length;
  const rating = getRating(average, target);
  const ratingDescription = getRatingDescription(rating);
  const a = {
    periodLength: days.length,
    trainingDays,
    average,
    target,
    success: sum(days) / days.length >= target,
    ratingDescription,
    rating,
  };
  return a;
};

if (require.main === module) {
  const target = Number(process.argv[2]);
  const days = process.argv.slice(3).map((n) => Number(n));

  console.log(exerciseCalculator(target, days));
}

export default exerciseCalculator;
