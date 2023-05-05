import type { Primitive } from './Primitive';

export type QueryParamKey = string;
export type QueryParamValue = Primitive | Primitive[];
export type QueryParams = Record<QueryParamKey, QueryParamValue>;
