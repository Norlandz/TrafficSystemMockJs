import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';

import { Point } from '../shape/Point';
import { LocationGeneric } from './LocationGeneric';

class VehicleInfoTrafficDetectorDto {
  idSql: number;
  @Type(() => Date)
  detectionCreationTime: Date;
  @Type(() => Date)
  detectionCodeInsCreationTime: Date;

         
  idBsiOfDetection: string;
  idBsiOfVehicle: string;
  @Type(() => Date)
  vehicleCreationTime: Date | null;

  vehicleNum: string | null;

         
         
  @Type(() => Point)
  posMeasuredByTrafficDetector: Point;

         

  speedMeasuredByTrafficDetector: number | null;

         
         

  locationDestination: string | null;                           

  locationOriginate: string | null;                           

         

  vehicleType: string | null;                       

  brandVehicle: string | null;                        

  amountPplActual: number | null;

  amountLimitMaxPpl: number | null;

  amountWeightActual: number | null;

  amountLimitMaxWeight: number | null;
  @Type(() => Date)
  dateIntegrityVerifiedLastTime: Date | null;

  constructor(idSql: number, detectionCreationTime: Date, detectionCodeInsCreationTime: Date, idBsiOfDetection: string, idBsiOfVehicle: string, vehicleCreationTime: Date, vehicleNum: string, posMeasuredByTrafficDetector: Point, speedMeasuredByTrafficDetector: number, locationDestination: string, locationOriginate: string, vehicleType: string, brandVehicle: string, amountPplActual: number, amountLimitMaxPpl: number, amountWeightActual: number, amountLimitMaxWeight: number, dateIntegrityVerifiedLastTime: Date) {
    this.idSql = idSql;
    this.detectionCreationTime = detectionCreationTime;
    this.detectionCodeInsCreationTime = detectionCodeInsCreationTime;
    this.idBsiOfDetection = idBsiOfDetection;
    this.idBsiOfVehicle = idBsiOfVehicle;
    this.vehicleCreationTime = vehicleCreationTime;
    this.vehicleNum = vehicleNum;
    this.posMeasuredByTrafficDetector = posMeasuredByTrafficDetector;
    this.speedMeasuredByTrafficDetector = speedMeasuredByTrafficDetector;
    this.locationDestination = locationDestination;
    this.locationOriginate = locationOriginate;
    this.vehicleType = vehicleType;
    this.brandVehicle = brandVehicle;
    this.amountPplActual = amountPplActual;
    this.amountLimitMaxPpl = amountLimitMaxPpl;
    this.amountWeightActual = amountWeightActual;
    this.amountLimitMaxWeight = amountLimitMaxWeight;
    this.dateIntegrityVerifiedLastTime = dateIntegrityVerifiedLastTime;
  }


}

export { VehicleInfoTrafficDetectorDto };
