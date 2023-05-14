const origin = [
  {
    path: "hello",
    children: [
      {
        path: "world",
      },
      {
        path: "javascript",
        children: [
          {
            path: "github",
          },
        ],
      },
    ],
  },
  {
    path: "nihao",
    children: [{ path: "shijie" }],
  },
];

const after = [
  {
    path: "hello/world",
  },
  {
    path: "hello/javascript/github",
  },
  {
    path: "nihao/shijie",
  },
];
