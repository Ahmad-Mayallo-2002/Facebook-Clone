"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploaderContext = void 0;
class UploaderContext {
    constructor(uploaderStrategy) {
        this.uploaderStrategy = uploaderStrategy;
        this.uploaderStrategy = uploaderStrategy;
    }
    setStrategy(uploaderStrategy) {
        this.uploaderStrategy = uploaderStrategy;
    }
    async performStrategy(file) {
        return await this.uploaderStrategy.upload(file);
    }
}
exports.UploaderContext = UploaderContext;
