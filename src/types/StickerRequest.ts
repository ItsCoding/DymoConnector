import { expectString, objectMapper } from "@daniel-faber/json-ts";

export class StickerRequest {
    constructor(
        public name: string,
        public subline: string,
        public position: string,
        public id: string,
        public requestID: string
    ) {
    }

    public static fromJson = objectMapper(accessor => new StickerRequest(
        accessor.get("name",expectString),
        accessor.get("subline",expectString),
        accessor.get("position",expectString),
        accessor.get("id",expectString),
        accessor.get("requestID",expectString)
    ));
}