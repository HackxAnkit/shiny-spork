import React from 'react';
import { getTranslation } from '../utils/translations';

function Modal({ type, onClose, currentLanguage }) {
  const getContent = () => {
    if (type === 'about') {
      return {
        title: getTranslation(currentLanguage, 'aboutTitle'),
        content: (
          <div>
            <p>{getTranslation(currentLanguage, 'aboutText1')}</p>
            <p>{getTranslation(currentLanguage, 'aboutText2')}</p>
            <h4>{getTranslation(currentLanguage, 'features')}</h4>
            <ul>
              <li>{getTranslation(currentLanguage, 'feature1')}</li>
              <li>{getTranslation(currentLanguage, 'feature2')}</li>
              <li>{getTranslation(currentLanguage, 'feature3')}</li>
              <li>{getTranslation(currentLanguage, 'feature4')}</li>
              <li>{getTranslation(currentLanguage, 'feature5')}</li>
              <li>{getTranslation(currentLanguage, 'feature6')}</li>
            </ul>
          </div>
        )
      };
    } else if (type === 'contact') {
      return {
        title: getTranslation(currentLanguage, 'contactTitle'),
        content: (
          <div>
            <p>{getTranslation(currentLanguage, 'contactText')}</p>
            <p>Email: contact@cashflow.com</p>
          </div>
        )
      };
    }
  };

  const data = getContent();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{data.title}</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          {data.content}
        </div>
      </div>
    </div>
  );
}

export default Modal;
