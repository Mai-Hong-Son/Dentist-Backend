export const fetchAdvisoryTemplate = ({ service_id }, ...etc) => ({
  type: 'advisory/result_template',
  args: [
    {
      service_id
    },
    ...etc
  ]
});

export const submitConclusion = (data, ...etc) => ({
  type: 'advisory/submit',
  args: [data, ...etc]
});
