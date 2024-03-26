import { app } from "./app";
import { PORT } from "./utils/config";
import chalk from "chalk";

app.listen(PORT, () => {
  console.log("--------------------");
  console.log(chalk.magentaBright(`ENV = '${process.env.NODE_ENV}'`));
  console.log(chalk.cyanBright(`Server on port ${PORT}`));
  console.log("--------------------");
});
