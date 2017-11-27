import { CronJob } from 'cron';
import sendSurcharge from './sendSurcharge';

export const setCron = props => new CronJob(props);

export const sendSurchargeJob = () =>
  setCron({
    cronTime: '05 17 * * 1-7',
    onTick: sendSurcharge,
    timeZone: 'Africa/Lagos',
    start: true
  });

if (require.main === module) {
  sendSurchargeJob();
}

