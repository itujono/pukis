const validate = (input: string) => (input.startsWith("#") ? true : "Color must start with '#'.");

interface InputResponse {
  componentsDir: string;
  primaryColor: string;
  secondaryColor: string;
}

export async function askInputs(): Promise<InputResponse> {
  const inquirer = (await import("inquirer")).default;

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "primaryColor",
      message: "What is the primary color of your project?",
      default: "#000000",
      validate,
    },
    {
      type: "input",
      name: "secondaryColor",
      message: "What is the secondary color of your project?",
      default: "#000000",
      validate,
    },
    {
      type: "input",
      name: "componentsDir",
      message: "Where should we put the components?",
      default: "/src/components/ui",
    },
  ]);

  return answers;
}
