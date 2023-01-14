"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "db", {
    enumerable: true,
    get: ()=>db
});
const _client = _exportStar(require("@prisma/client"), exports);
function _exportStar(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) Object.defineProperty(to, k, {
            enumerable: true,
            get: function() {
                return from[k];
            }
        });
    });
    return from;
}
let db;
if (process.env.NODE_ENV === "production") {
    db = new _client.PrismaClient({
        log: [
            "error",
            "warn"
        ]
    });
} else {
    if (!global.__globalPrisma__) {
        global.__globalPrisma__ = new _client.PrismaClient({
            log: [
                "query",
                "error",
                "warn"
            ]
        });
    }
    db = global.__globalPrisma__;
}
