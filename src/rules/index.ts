import { reactRules } from "./frontend/react";
import { flutterRules } from "./frontend/flutter";
import { goRules } from "./backend/go";
import { nodeRules } from "./backend/nodejs";
import { javaRules } from "./backend/java";
import { cppRules } from "./backend/cpp";

export const allRules = [
  ...reactRules,
  ...flutterRules,
  ...goRules,
  ...nodeRules,
  ...javaRules,
  ...cppRules,
];
