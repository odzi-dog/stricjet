// Importing types
import { GraphQLError } from "graphql";

// Exporting IExecutionResult interface (only needed fields)
export interface IExecutionResult<
  TData = { [key: string]: any },
> {
  errors?: ReadonlyArray<GraphQLError>;
  data?: TData | null;
}