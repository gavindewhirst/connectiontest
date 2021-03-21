import { stdin } from "node:process";
import { CrisisManager } from "./CrisisManager";

let cm = new CrisisManager(5, 5)
console.log(cm.IsCrisis);

