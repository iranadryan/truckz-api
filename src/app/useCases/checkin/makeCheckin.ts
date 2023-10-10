import { z } from 'zod';
import CheckinRepository from '../../repositories/CheckinRepository';
import { checkinStoreSchema } from '../../schemas/checkinSchemas';
import DriverRepository from '../../repositories/DriverRepository';
import { APPError } from '../../errors/APPError';
import { prisma } from '../../../libs/prisma';

export async function makeCheckin(
  userId: string,
  payload: z.infer<typeof checkinStoreSchema>,
) {
  const driver = await DriverRepository.findFirst({
    where: {
      userId,
    },
  });

  if (!driver) {
    throw new APPError('driver not found');
  }

  await CheckinRepository.disableAll(driver.id);

  // const checkin = await CheckinRepository.create({
  //   driverId: driver.id,
  //   city: payload.city,
  //   state: payload.state,
  //   latitude: payload.latitude,
  //   longitude: payload.longitude,
  // });

  const mappedCheckin = {
    ...checkin,
    latitude: checkin.latitude.toNumber(),
    longitude: checkin.longitude.toNumber(),
  };

  return mappedCheckin;
  const checkinHour = await prisma.checkin.findFirst({
    where: {
      id: userId,
    },
    select: {
      checkinAt: true,
    },
  });

  console.log(checkinHour);

  return checkinHour;
}
