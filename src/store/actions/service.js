export const fetchServices = (...etc) => ({
  type: 'service/all',
  args: [...etc]
});

export const fetchServiceIssueDetail = (id, ...etc) => ({
  type: 'service/issue_detail',
  args: [{ id }, ...etc]
});
