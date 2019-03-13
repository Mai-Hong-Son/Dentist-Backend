// fetch question list

export const fetchQuestionStatuses = (...etc) => ({
  type: 'question/status',
  args: [...etc]
});

export const fetchSummaryQuestions = (
  { filters: { status = -1, service_id }, limit = 4 },
  ...etc
) => ({
  type: 'question/all',
  args: [
    {
      filters: {
        status,
        service_id
      },
      sorts: {
        created_at: -1,
        id: -1
      },
      page_size: limit
    },
    ...etc
  ]
});

export const fetchQuestions = (
  { filters: { status = -1, service_id }, page = 1 },
  ...etc
) => ({
  type: 'question/all',
  args: [
    {
      filters: {
        status,
        service_id
      },
      sorts: {
        created_at: -1,
        id: -1
      },
      page
    },
    ...etc
  ]
});

export const fetchDetailOfQuestion = ({ id }, ...etc) => ({
  type: 'question/detail',
  args: [id, ...etc]
});

export const fetchAnswerByQuestion = ({ question_id }, ...etc) => ({
  type: 'answer/by_question',
  args: [{ question_id }, ...etc]
});
