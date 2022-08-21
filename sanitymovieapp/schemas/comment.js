export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'approved',
        title: 'Approved',
        type: 'boolean',
        description: 'comment wont show on site until approve'
      },
      {
        name: 'comment',
        type: 'text'
      },
      {
        name: 'movie',
        type: 'reference',
        to: [{ type: "movie"}]
      },
    ],

};
  