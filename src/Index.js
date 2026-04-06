import { generateSock } from "./generator/generator.js";
import { buildPattern } from "./builder/patternBuilder.js";

const sock = generateSock();
const output = buildPattern(sock);

console.log(output);
