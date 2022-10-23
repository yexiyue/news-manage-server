"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.touristNews = exports.mostNewsStar = exports.mostNewsView = exports.publishList = exports.waitAuditList = exports.auditList = exports.updateDraftNews = exports.draftPreviewNews = exports.deleteNews = exports.draftNews = exports.createNews = void 0;
const right_js_1 = require("./right.js");
const createNews = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.new.create({
            data,
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.createNews = createNews;
const draftNews = (author) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.new.findMany({
            where: {
                author,
                auditState: 0
            },
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.draftNews = draftNews;
const deleteNews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.new.delete({
            where: {
                id
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.deleteNews = deleteNews;
const draftPreviewNews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.new.findUnique({
            where: {
                id,
            },
            include: {
                Category: true
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.draftPreviewNews = draftPreviewNews;
const updateDraftNews = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.new.update({
            where: {
                id,
            },
            include: {
                Category: true
            },
            data
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.updateDraftNews = updateDraftNews;
const auditList = (author) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.new.findMany({
            where: {
                author,
                auditState: {
                    not: 0
                },
                publishState: {
                    lt: 2
                }
            },
            include: {
                Category: true
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.auditList = auditList;
const waitAuditList = (roleId, region) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.new.findMany({
            where: {
                roleId,
                region,
                auditState: 1,
                publishState: {
                    lt: 2
                }
            },
            include: {
                Category: true
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.waitAuditList = waitAuditList;
const publishList = (author, publishState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.new.findMany({
            where: {
                author,
                publishState
            },
            include: {
                Category: true
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.publishList = publishList;
const mostNewsView = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.new.findMany({
            where: {
                publishState: 2
            },
            orderBy: {
                view: 'desc'
            },
            include: {
                Category: true
            },
            take: 7
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.mostNewsView = mostNewsView;
const mostNewsStar = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.new.findMany({
            where: {
                publishState: 2
            },
            orderBy: {
                star: 'desc'
            },
            include: {
                Category: true
            },
            take: 7
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.mostNewsStar = mostNewsStar;
const touristNews = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.new.findMany({
            where: {
                publishState: 2
            },
            orderBy: {
                view: 'desc',
            },
            include: {
                Category: true
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.touristNews = touristNews;
