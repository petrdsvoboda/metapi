import {
  readJsonSync,
  walkSync,
  writeFileStrSync,
} from "https://deno.land/std/fs/mod.ts";
import dataExpanders from "../expanders/data/index.ts";

function run() {
  console.log("Expanding data");

  const files = walkSync("./playground/data");
  for (const f of files) {
    if ((f as any).isDirectory) continue;

    const data = readJsonSync("./" + f.path);
    for (const exp of dataExpanders) {
      writeFileStrSync("./out/" + f.path, exp(data as any));
    }
  }
}

export default run;
