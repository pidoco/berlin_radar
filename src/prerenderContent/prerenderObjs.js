/* eslint no-console: "off" */
import * as Scrivito from "scrivito";
import fileNameFromUrl from "./fileNameFromUrl";
import prerenderObj from "./prerenderObj";

export default async function prerenderObjs(blacklistObjClasses) {
  console.time("[prerenderObjs]");

  console.time("Loading all objs");
  const objs = await Scrivito.load(() => allObjs(blacklistObjClasses));
  console.timeEnd("Loading all objs");
  console.log(`Loaded ${objs.length} objs`);

  let failedCount = 0;

  const prerenderedObjs = await Promise.all(
    objs.map(async obj => {
      try {
        const prerenderedObj = await prerenderObj(obj);
        const fileName = fileNameFromUrl(Scrivito.urlFor(obj));
        console.log(`Exported "${fileName}" (${obj.id()})"`);
        return prerenderedObj;
      } catch (e) {
        failedCount += 1;
        console.log(
          `❌  Error while processing obj ${obj.id()}. Skipping file.`,
          e,
          e.message
        );
        return new Promise(resolve => resolve([]));
      }
    })
  );

  const flattenResults = [].concat(...prerenderedObjs);
  console.log(
    `Exporting ${
      flattenResults.length
    } files (skipped ${failedCount} objs due to failures)`
  );
  console.timeEnd("[prerenderObjs]");
  return flattenResults;
}

function allObjs(blacklistObjClasses) {
  return [
    ...Scrivito.Obj.all().andNot("_objClass", "equals", blacklistObjClasses),
  ];
}
