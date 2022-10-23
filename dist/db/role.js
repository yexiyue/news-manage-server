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
exports.updateRight = exports.deleteRole = exports.getRoles = void 0;
const right_js_1 = require("./right.js");
const getRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.role.findMany({
            include: {
                rights: {
                    select: {
                        key: true,
                    }
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.getRoles = getRoles;
const deleteRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteRole = right_js_1.prisma.role.delete({
            where: { id },
        });
        const deleteUser = right_js_1.prisma.user.deleteMany({
            where: {
                roleId: id
            }
        });
        return yield right_js_1.prisma.$transaction([deleteUser, deleteRole]);
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.deleteRole = deleteRole;
const updateRight = (id, rights) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oldRole = yield right_js_1.prisma.role.findUnique({
            where: {
                id
            },
            include: {
                rights: {
                    select: {
                        key: true
                    }
                }
            }
        });
        const oldKeys = oldRole === null || oldRole === void 0 ? void 0 : oldRole.rights;
        yield right_js_1.prisma.role.update({
            where: {
                id: id
            },
            data: {
                rights: {
                    disconnect: oldKeys
                }
            }
        });
        const keys = rights.map(i => ({ key: i }));
        return yield right_js_1.prisma.role.update({
            where: {
                id: id
            },
            data: {
                rights: {
                    connect: keys
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.updateRight = updateRight;
