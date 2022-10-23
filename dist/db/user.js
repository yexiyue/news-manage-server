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
exports.getUsersByRoleId = exports.userInfo = exports.loginUser = exports.putUser = exports.postUser = exports.patchUser = exports.deleteUser = exports.getUsers = void 0;
const right_js_1 = require("./right.js");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.user.findMany({
            include: {
                Role: true
            },
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.getUsers = getUsers;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.user.delete({
            where: {
                id,
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.deleteUser = deleteUser;
const patchUser = (id, roleState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.user.update({
            where: {
                id,
            },
            data: {
                roleState
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.patchUser = patchUser;
const postUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.user.create({
            data,
            include: {
                Role: true
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.postUser = postUser;
const putUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.user.update({
            where: { id },
            data,
            include: {
                Role: true
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.putUser = putUser;
const loginUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.user.findFirst({
            where: {
                username
            }
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.loginUser = loginUser;
const userInfo = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.user.findFirst({
            where: {
                username,
                password
            },
            include: {
                Role: {
                    include: {
                        rights: {
                            where: {
                                OR: [
                                    {
                                        pagepermission: 1
                                    },
                                    {
                                        routerpermission: 1
                                    }
                                ]
                            },
                            select: {
                                key: true
                            }
                        }
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
exports.userInfo = userInfo;
const getUsersByRoleId = (region) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield right_js_1.prisma.user.findMany({
            where: {
                roleId: 3,
                region
            },
            include: {
                Role: true
            },
        });
    }
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});
exports.getUsersByRoleId = getUsersByRoleId;
