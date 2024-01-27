/* eslint-disable react/prop-types */
import { useState } from 'react';
import './style.scss';

export default function SwitchTabs({ data, onTabChange }) {


  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100); // width : 100 is fixed so multiplying by 100
    setTimeout(() => {
      setSelectedTab(index)
    }, 3000)
    onTabChange(tab, index);
  }

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {
          data.map((tab, index) => {
            return (
              <span
                className={`tabItem ${selectedTab === index ? 'active' : ''}`}
                key={index}
                onClick={() => activeTab(tab, index)}
              >
                {tab}
              </span>
            )
          }
          )
        }
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  )
}
