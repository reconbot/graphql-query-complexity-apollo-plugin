import { ComplexityEstimator, getComplexity } from 'graphql-query-complexity'
import { GraphQLError, GraphQLSchema, separateOperations } from 'graphql'
import { PluginDefinition } from 'apollo-server-core'

export const createComplexityPlugin = ({
  schema,
  maximumComplexity,
  estimators,
  onComplete,
  createError = (max, actual) => new GraphQLError(`Query too complex. Value of ${actual} is over the maximum ${max}.`),
}: {
  schema: GraphQLSchema;
  maximumComplexity: number;
  estimators: Array<ComplexityEstimator>;
  onComplete?: (complexity: number) => Promise<void> | void;
  createError?: (max: number, actual: number) => Promise<GraphQLError> | GraphQLError;
}): PluginDefinition => {
  return {
    async requestDidStart() {
      return ({
        async didResolveOperation({ request, document }) {
          const query = request.operationName
            ? separateOperations(document)[request.operationName]
            : document

          const complexity = getComplexity({
            schema,
            query,
            variables: request.variables,
            estimators,
          })

          if (complexity >= maximumComplexity) {
            throw await createError(maximumComplexity, complexity)
          }

          if (onComplete) {
            await onComplete(complexity)
          }
        },
      })
    },
  }
}
