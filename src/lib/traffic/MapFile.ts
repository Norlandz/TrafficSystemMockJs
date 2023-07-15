import { Transform, Type, plainToInstance } from 'class-transformer';
import 'reflect-metadata';

import { Point } from '../shape/Point';
import { Vehicle } from './Vehicle';
import { TrafficDetector } from './TrafficDetector';
import { JsonReplacer } from './JsonUtil';

class MapFile {
                   

                                 
                                      
                                                                                                              
  @Transform((tinfo) => new Set(plainToInstance(TrafficDetector, tinfo.value)))
  gpTrafficDetector: Set<TrafficDetector>;

  mppVehicleInMap: Map<number, Vehicle>;

  @Type(() => Date)
                                                                                                           
  firstCreationTime: Date;

  @Type(() => Date)
                                                                      
  lastModificationTime: Date;

  constructor(gpTrafficDetector: Set<TrafficDetector>, mppVehicleInMap: Map<number, Vehicle>, firstCreationTime: Date, lastModificationTime: Date) {
                          
    this.gpTrafficDetector = gpTrafficDetector;
    this.mppVehicleInMap = mppVehicleInMap;
    this.firstCreationTime = firstCreationTime;
    this.lastModificationTime = lastModificationTime;
  }

  toString() {
    return JSON.stringify(this, JsonReplacer, 2);
  }
}


export { MapFile };
