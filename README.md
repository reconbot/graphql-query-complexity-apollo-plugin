# Graphql Query Complexity Apollo Plugin

[![Release](https://github.com/reconbot/graphql-query-complexity-apollo-plugin/actions/workflows/test.yml/badge.svg)](https://github.com/reconbot/graphql-query-complexity-apollo-plugin/actions/workflows/test.yml)

This is a plugin for Apollo Server 3 that throws if a query is too complex.

## Example

```ts
import { ApolloServer } from 'apollo-server-lambda'
import { schema } from './schema'
import { context } from './context'
import { SystemConfigOptions } from '../lib/SystemConfig'
import { fieldExtensionsEstimator, simpleEstimator } from 'graphql-query-complexity'
import { createComplexityPlugin } from './createComplexityPlugin'

return new ApolloServer({
  schema,
  context,
  plugins: [
    createComplexityPlugin({
      schema,
      estimators: [
        fieldExtensionsEstimator(),
        simpleEstimator({ defaultComplexity: 1 }),
      ],
      maximumComplexity: 1000,
      onComplete: (complexity) => {
        console.log('Query Complexity:', complexity)
      },
    }),
  ],
})
```

## API

```ts
export const createComplexityPlugin: ({ schema, maximumComplexity, estimators, onComplete, createError }: {
    schema: GraphQLSchema
    maximumComplexity: number
    estimators: Array<ComplexityEstimator>
    onComplete?: ((complexity: number) => Promise<void> | void)
    createError?: ((max: number, actual: number) => Promise<GraphQLError> | GraphQLError)
}) => PluginDefinition
```

- `createError` should return an error to be thrown if the actual complexity is more than the maximum complexity.
