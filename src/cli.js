#!/usr/bin/env node

import { displayUserEnvInfos } from "./utils/env.js";
import { argumentManager } from "./commands/args.js";

displayUserEnvInfos();
argumentManager();