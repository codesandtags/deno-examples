import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std@0.68.0/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";

import pick from "https://deno.land/x/lodash@4.17.15-es/pick.js";

interface Planet {
  [key: string]: string;
}

const loadPlanetsData = async () => {
  const path = join("assets", "kepler_exoplanets_nasa.csv");

  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    header: true,
    comment: "#",
  });
  Deno.close(file.rid);

  const planets = (result as Array<Planet>)
    .filter((planet) => {
      const planetaryRadius = Number(planet["koi_prad"]);
      const stellarMasss = Number(planet["koi_smass"]);
      const stellarRadius = Number(planet["koi_srad"]);

      return (
        planet["koi_disposition"] === "CONFIRMED" &&
        planetaryRadius > 0.5 &&
        planetaryRadius < 1.5 &&
        stellarMasss > 0.78 &&
        stellarMasss < 1.04 &&
        stellarRadius > 0.99 &&
        stellarRadius < 1.01
      );
    })
    .map((planet) => {
      return pick(planet, [
        "koi_prad",
        "koi_smass",
        "koi_srad",
        "kepler_name",
        "koi_count",
        "koi_steff",
      ]);
    });

  return planets;
};

const newEarths = await loadPlanetsData();
console.log(`The habitable planets are ${newEarths.length}`);

for (let earth of newEarths) {
  console.log(earth);
}
