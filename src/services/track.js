import serviceMusic from './service-music';

const trackSevice = {};

return (trackSevice.search = q => {
  const type = 'track';
  serviceMusic
    .get('/search', {
      params: { q, type },
    })
    .then(response => response.data);
});

export default trackSevice;
