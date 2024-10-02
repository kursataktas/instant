import { i } from "@instantdb/core";

const graph = i.graph(
  {
    authors: i.entity({
      name: i.any(),
      userId: i.any(),
    }),
    posts: i.entity({
      content: i.any(),
      name: i.any(),
    }),
    tags: i.entity({
      label: i.any(),
    }),
  },
  {
    authorsPosts: {
      forward: {
        on: "authors",
        has: "many",
        label: "posts",
      },
      reverse: {
        on: "posts",
        has: "one",
        label: "author",
      },
    },
    postsTags: {
      forward: {
        on: "tags",
        has: "many",
        label: "posts",
      },
      reverse: {
        on: "posts",
        has: "many",
        label: "tags",
      },
    },
    posts$users: {
      forward: {
        on: "posts",
        has: "many",
        label: "owners",
      },
      reverse: {
        // @ts-expect-error
        on: "$users",
        has: "many",
        label: "posts",
      },
    },
  },
);

export default graph;
