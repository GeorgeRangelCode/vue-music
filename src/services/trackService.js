import serviceMusic from './service-music';

const trackSevice = {};

trackSevice.search = q => {
  const type = 'track';
  return serviceMusic
    .get('/search', {
      params: { q, type },
    })
    .then(response => response.data);
};

export default trackSevice;
