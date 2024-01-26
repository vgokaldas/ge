/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
/// <reference types="mongoose-aggregate-paginate-v2" />
import { JackPortRecordInterface } from "../interfaces/jp-record.interface";
declare const JpRecordModel: import("mongoose").Model<JackPortRecordInterface, {}, {}, {}>;
export default JpRecordModel;
