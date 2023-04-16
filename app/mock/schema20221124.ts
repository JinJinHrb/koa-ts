export default {
  type: 'object',
  title: 'xxx配置',
  properties: {
    string: {
      type: 'string',
      title: 'string',
      maxLength: 5,
      required: true,
    },
    number: {
      type: 'number',
      title: 'number',
      required: true,
    },
    url: {
      type: 'string',
      title: 'url',
      format: 'url',
    },
    arr: {
      type: 'array',
      title: 'array',
      maxItems: 2,
      required: true,
      items: {
        type: 'object',
        properties: {
          string: {
            type: 'string',
            title: 'string',
            required: true,
          },
        },
      },
    },
  },
}
