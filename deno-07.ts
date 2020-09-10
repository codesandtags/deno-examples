import { desc, run, task, sh } from "https://deno.land/x/drake@v1.2.6/mod.ts";

desc("Minimal Drake task");
task("hello", [], async function () {
  console.log("Hello from drake!");
  await sh("deno run --allow-env deno-06.js");
});

run();
