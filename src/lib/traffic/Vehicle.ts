import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';

import { Point } from '../shape/Point';

class Vehicle {
  idSql: number;
  idBsi: string;
  @Type(() => Date)
  vehicleCreationTime: Date;
  vehicleNum: string;
  @Type(() => Point)
  posActual: Point | null = null;
  speedActual: number;

  constructor(idSql: number, idBsi: string, vehicleCreationTime: Date, vehicleNum: string, speedActual: number) {
    this.idSql = idSql;
    this.idBsi = idBsi;
    this.vehicleCreationTime = vehicleCreationTime;
    this.vehicleNum = vehicleNum;
                                  
    this.speedActual = speedActual;
  }

  vehicleType: string | null = null;

  brandVehicle: string | null = null;

  initMore(vehicleType: string, brandVehicle: string) {
    this.vehicleType = vehicleType;
    this.brandVehicle = brandVehicle;
  }

  amountPplActual: number | null = null;

  amountLimitMaxPpl: number | null = null;

  amountWeightActual: number | null = null;

  amountLimitMaxWeight: number | null = null;
  @Type(() => Date)
  dateIntegrityVerifiedLastTime: Date | null = null;

             

  posSelf: Point | null = null;
  posGoto: Point | null = null;
                                
                                
}

export { Vehicle };
