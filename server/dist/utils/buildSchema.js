"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalMiddlewares = exports.resolvers = void 0;
const auth_resolver_1 = require("../resolvers/auth.resolver");
const user_resolver_1 = require("../resolvers/user.resolver");
const post_resolver_1 = require("../resolvers/post.resolver");
const comment_resolver_1 = require("../resolvers/comment.resolver");
const react_resolver_1 = require("../resolvers/react.resolver");
const page_resolver_1 = require("../resolvers/page.resolver");
const follow_resolver_1 = require("../resolvers/follow.resolver");
const resolveTime_middleware_1 = require("../middlewares/resolveTime.middleware");
const notification_resolver_1 = require("../resolvers/notification.resolver");
exports.resolvers = [
    user_resolver_1.UserResolver,
    auth_resolver_1.AuthResolver,
    post_resolver_1.PostResolver,
    comment_resolver_1.CommentResolver,
    react_resolver_1.ReactResolver,
    page_resolver_1.PageResolver,
    follow_resolver_1.FollowResolver,
    notification_resolver_1.NotificationResolver,
];
exports.globalMiddlewares = [resolveTime_middleware_1.ResolveTime];
