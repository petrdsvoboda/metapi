import { readFileStrSync, readJsonSync } from "https://deno.land/std/fs/mod.ts";
import { Data } from "../../../types.ts";

function expand(json: Data): string {
  let file: string = readFileStrSync("./src/expanders/data/db/template.metapi");
  const mappings: any = readJsonSync("./src/expanders/data/db/mappings.json");
  const tokens = file.match(/@\w*/gm) ?? [];
  for (const token of tokens) {
    if (token === "@name") {
      file = file.replace(token, json.name);
    } else if (token === "@props") {
      file = file.replace(
        token,
        "\n\t\t\t\t" +
          json.props
            .map(
              (prop) =>
                prop.name +
                ": { type: '" +
                mappings.prop.type[prop.type].target +
                "' }"
            )
            .join(",\n\t\t\t\t") +
          "\n\t\t\t"
      );
    }
  }
  return file;
}

export default expand;
