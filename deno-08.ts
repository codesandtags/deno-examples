import { join } from "https://deno.land/std/path/mod.ts";

const readFile = async () => {
  const path = join("assets", "file.txt");
  const data = await Deno.readTextFile(path);
  console.log(data);
};

await readFile();
