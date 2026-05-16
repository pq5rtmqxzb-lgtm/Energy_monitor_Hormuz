/* eslint-disable no-undef */
export const BUILD_TIME = typeof __BUILD_TIME__ === "string" ? __BUILD_TIME__ : new Date().toISOString();
export const GIT_SHA = typeof __GIT_SHA__ === "string" ? __GIT_SHA__ : "dev";
export const GIT_SHA_SHORT = GIT_SHA.slice(0, 7);
export const REPO_URL = "https://github.com/pq5rtmqxzb-lgtm/Energy_monitor_Hormuz";
export const COMMIT_URL = `${REPO_URL}/commit/${GIT_SHA}`;
