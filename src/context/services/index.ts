type Services = {
  // TODO
};

declare global {
  interface AppContext {
    services: Services;
  }
}

export default async function initialize(
  config: AppConfig,
): Promise<[TeardownFn, Services]> {
  // TODO

  return [
    async () => {
      // TODO
    },
    {
      // TODO
    },
  ];
}
