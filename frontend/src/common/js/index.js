import '../styles/index.scss';
import throttle from 'lodash-es/throttle';

const stickyHeader = () => {
  const header = document.querySelector('.header');

  const checkScroll = (e) => {
    if (window.scrollY) {
      header.classList.add('stuck');
    } else {
      header.classList.remove('stuck');
    }
  };

  document.addEventListener('scroll', throttle(checkScroll, 200));
};

stickyHeader();
