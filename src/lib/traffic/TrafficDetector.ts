import { Transform, Type, plainToInstance } from 'class-transformer';
import 'reflect-metadata';

import { Point } from '../shape/Point';
import { VehicleInfoTrafficDetectorDto } from './VehicleInfoTrafficDetectorDto';

class TrafficDetector {
  idBsi: string;
  @Type(() => Date)
  trafficDetectorCreationTime: Date;
  @Type(() => Point)
  pointLocation: Point;
  radiusDetection: number;
  @Type(() => VehicleInfoTrafficDetectorDto)                   
                                                                                                  
                                                      
                                                                                       
  arrVehicleInfoTrafficDetectorDtoHistory: VehicleInfoTrafficDetectorDto[];
                                                                                              

  constructor(idBsi: string, trafficDetectorCreationTime: Date, pointLocation: Point, radiusDetection: number, arrVehicleInfoTrafficDetectorDtoHistory: VehicleInfoTrafficDetectorDto[]) {
    this.idBsi = idBsi;
    this.trafficDetectorCreationTime = trafficDetectorCreationTime;
    this.pointLocation = pointLocation;
    this.radiusDetection = radiusDetection;
    this.arrVehicleInfoTrafficDetectorDtoHistory = arrVehicleInfoTrafficDetectorDtoHistory;
  }
}

export { TrafficDetector };
