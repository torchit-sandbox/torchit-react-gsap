import React from 'react';
import { MOBILE_PROCESS_DATA } from '../../data';

export function ProcessMobile() {
  return (
    <div className="process-mobile">
      <div className="process-mobile__list">
        {MOBILE_PROCESS_DATA.map((item) => (
          <div key={item.id} className="process-mobile__card">
            <div className="process-mobile__card-header">
              <div className="process-mobile__card-icon">
                {item.icon && (
                  <img src={item.icon} alt={item.title} />
                )}
              </div>
              <h3 className="process-mobile__card-title">{item.title}</h3>
            </div>
            <p className="process-mobile__card-description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
