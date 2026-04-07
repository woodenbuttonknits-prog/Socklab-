import { buildInstructions } from "./src/patterns/instructionBuilder.js";

const sock = generateSock();

const instructions = buildInstructions(sock);

console.log(instructions);