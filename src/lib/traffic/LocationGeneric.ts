import { Transform, Type, plainToInstance } from 'class-transformer';
import 'reflect-metadata';

import { Point } from '../shape/Point';

class LocationGeneric {
  nameLocation: string;
  @Type(() => Point)
  pointLocation: Point;
  constructor(nameLocation: string, pointLocation: Point) {
    this.nameLocation = nameLocation;
    this.pointLocation = pointLocation;
  }
}

export { LocationGeneric };
