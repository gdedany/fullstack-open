const calculateBmi = (height: number, weight: number): string => {
  const heightM = height / 100;
  const bmi = weight / Math.pow(heightM, 2);
  let response;

  if (bmi < 16) {
    response = "Underweight (Severe thinness)";
  } else if (bmi >= 16 && bmi <= 16.9) {
    response = "Underweight (Moderate thinness)";
  } else if (bmi > 16.9 && bmi <= 18.4) {
    response = "Underweight (Mild thinness)";
  } else if (bmi > 18.4 && bmi <= 24.9) {
    response = "Normal range";
  } else if (bmi > 24.9 && bmi <= 29.9) {
    response = "Overweight (Pre-obese)";
  } else if (bmi > 29.9 && bmi <= 34.9) {
    response = "Obese (Class I)";
  } else if (bmi > 34.9 && bmi <= 39.9) {
    response = "Obese (Class II)";
  } else if (bmi > 39.9) {
    response = "Obese (Class III)";
  } else {
    return "Could not find a matching description";
  }
  return response;
};
if (require.main === module) {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Expected height and weight as string parameters");
  }
  try {
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;
