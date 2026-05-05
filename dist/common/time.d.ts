import { DateTime } from 'luxon';
export declare const timeService: {
    now: () => DateTime<true>;
    formatForUser: (isoString: string, userTimeZone: string, format?: Intl.DateTimeFormatOptions) => string;
};
//# sourceMappingURL=time.d.ts.map