"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeService = void 0;
const luxon_1 = require("luxon");
exports.timeService = {
    now: () => luxon_1.DateTime.now().toUTC(),
    formatForUser: (isoString, userTimeZone, format = luxon_1.DateTime.DATETIME_MED) => {
        return luxon_1.DateTime.fromISO(isoString).setZone(userTimeZone).toLocaleString(format);
    }
};
//# sourceMappingURL=time.js.map