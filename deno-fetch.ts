// https://docs.spacexdata.com/
import * as log from "https://deno.land/std/log/mod.ts";

// custom configuration with 2 loggers (the default and `tasks` loggers)
await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG"),

    // file: new log.handlers.FileHandler("WARNING", {
    //   filename: "./log.txt",
    //   // you can change format of output message using any keys in `LogRecord`
    //   formatter: "{levelName} {msg}",
    // }),
  },

  loggers: {
    // configure default logger available via short-hand methods above
    default: {
      level: "DEBUG",
      handlers: ["console"],
    },

    tasks: {
      level: "ERROR",
      handlers: ["console"],
    },
  },
});

const downloadData = async () => {
  log.info("Downloading data...");
  const response = await fetch("https://api.spacexdata.com/v3/launches", {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();
    log.info("Data downloaded");
  } else {
    log.error("There is a problem, getting the data");
  }
};

const sendData = async () => {
  const body = {
    name: "Elon Musk",
    job: "billionaire",
  };
  const response = await fetch("https://reqres.in/api/users", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();

  console.log(data);
};

await downloadData();
// await sendData();
