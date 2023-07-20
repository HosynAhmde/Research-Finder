import d from 'dayjs';

export class Time {
  static remainedTime(t: number) {
    return d(t * 1000).diff(d(), 'second');
  }
}
