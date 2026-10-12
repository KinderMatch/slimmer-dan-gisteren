type RuntimeEnv = Record<string, any>;

export function getRuntimeEnv(): RuntimeEnv {
  const globalEnv = (globalThis as { env?: RuntimeEnv }).env ?? {};
  const processEnv = typeof process !== "undefined" ? process.env : {};

  return {
    ...processEnv,
    ...globalEnv,
  };
}
