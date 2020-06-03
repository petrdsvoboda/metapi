import { readFileStrSync, readJsonSync } from "https://deno.land/std/fs/mod.ts";
import { Data } from "../../../types.ts";

function expand(json: Data): string {
  let file: string = readFileStrSync(
    "./src/expanders/data/sql/template.metapi"
  );
  const mappings: any = readJsonSync("./src/expanders/data/sql/mappings.json");
  const tokens = file.match(/@\w*/gm) ?? [];
  for (const token of tokens) {
    if (token === "@name") {
      file = file.replace(token, json.name);
    } else if (token === "@props") {
      file = file.replace(
        token,
        json.props
          .map(
            (prop) =>
              "\n\t" + prop.name + " " + mappings.prop.type[prop.type].target
          )
          .join("") + "\n"
      );
    }
  }
  return file;
}

export default expand;
