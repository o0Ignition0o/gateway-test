## SETUP:

run subgraph-a:

```bash
cd subgraph-a; npm i; npm run start
```

run subgraph-b:

```bash
cd subgraph-b; npm i; npm run start
```

## GATEWAY SETUP:

run the gateway:

```bash
cd gateway; npm i; npm run start
```

## ROUTER SETUP:

Download the last router release for your machine https://github.com/apollographql/router/releases

put it into this project directory

run the router:

```bash
./router -s supergraph.graphql -c router.yaml
```

Refer to the open github issue to reproduce the difference: https://github.com/apollographql/router/issues/2422#issuecomment-1557328917
