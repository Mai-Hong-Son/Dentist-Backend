

export default (screen, payload = {}) => ({
    type: 'screen/payload',
    payload,
    screen,
});

