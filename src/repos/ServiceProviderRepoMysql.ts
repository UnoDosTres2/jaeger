// This is a class
// Imports ServiceProvider
// Exports class

import ServiceProvider from "../core/entities/ServiceProvider";
import type ServiceProviderRepo from "../core/repos/ServiceProviderRepo";
import fs from "fs";

export default class ServiceProviderRepoMysql implements ServiceProviderRepo {
  save(entity: Omit<ServiceProvider, "id">) {
    return true;
  }

  async findByCoordinates(
    latitude: number,
    longitude: number,
    radius: number,
  ): Promise<Array<ServiceProvider>> {
    const response = await fs.promises.readFile(
      "../../../serviceProviders.json",
    );
    const serviceProviders: Array<ServiceProvider> = JSON.parse(
      response.toString(),
    );

    return serviceProviders;
  }
}
