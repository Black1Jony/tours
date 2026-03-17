import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');

      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          // Магия центрирования здесь:
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center', // Элемент будет по центру экрана
            inline: 'nearest'
          });
          return true;
        }
        return false;
      };

      // Пробуем скроллить сразу
      const found = scrollToElement();


      if (!found) {
        const observer = new MutationObserver(() => {
          if (scrollToElement()) {
            observer.disconnect();
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });

        return () => observer.disconnect();
      }
    }
  }, [hash, pathname]); 
};