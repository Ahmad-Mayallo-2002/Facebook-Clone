"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentLoader = exports.postLoader = exports.userLoader = void 0;
const react_loader_1 = require("../loader/commentLoader/react.loader");
const comment_loader_1 = require("../loader/postLoader/comment.loader");
const react_loader_2 = require("../loader/postLoader/react.loader");
const comment_loader_2 = require("../loader/userLoader/comment.loader");
const id_loader_1 = require("../loader/userLoader/id.loader");
const post_loader_1 = require("../loader/userLoader/post.loader");
exports.userLoader = {
    postsByUserLoader: (0, post_loader_1.createPostsByUserLoader)(),
    commentsByUserLoader: (0, comment_loader_2.createCommentByUserLoader)(),
    idByUserLoader: (0, id_loader_1.createIdsByUserLoader)(),
};
exports.postLoader = {
    commentsByPostLoader: (0, comment_loader_1.createCommentsByPostLoader)(),
    reactsByPostLoader: (0, react_loader_2.createReactsByPostLoader)(),
};
exports.commentLoader = {
    reactsByCommentLoader: (0, react_loader_1.createReactsByCommentLoader)(),
};
