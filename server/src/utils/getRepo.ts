import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { dataSource } from "../dataSource";

export const getRepo = <T extends ObjectLiteral>(
    target: EntityTarget<T>
): Repository<T> => {
    return dataSource.getRepository(target);
};