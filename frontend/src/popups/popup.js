import React from "react";
import { useNavigate } from "react-router-dom";
import "popup.css";

function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="popup-overlay">
        <button onClick={togglePopup}>{isOpen ? "Close" : "?"}</button>
        <div className="popup-content">
          <p>
            Retirement planning: Retirement planning involves preparing
            financially for life after work by utilizing all available resources
            to ensure a comfortable, secure future. Key aspects include
            determining retirement goals, such as when to retire, cashflow
            needs, and selecting appropriate savings and investment strategies.
            It also includes understanding tax implications, managing risks (ie
            inflation, health risks).
          </p>
          <p>
            Investment Mgt.: Investment management is the process of overseeing
            and making decisions about an investment portfolio to achieve an
            investors financial goals. It is guided by a firms overarching
            investment philosophy, which aligns the investors risk tolerance and
            capacity with an appropriate investment allocation.
          </p>
          <p>
            Tax planning: Tax planning is the process of strategically
            minimizing one's tax burden over a lifetime through careful
            financial decisions. Unlike tax advice from a licensed tax
            professional, which focuses on specific legal guidance, tax planning
            is centered around broader financial strategies and how taxes
            intersect with overall financial goals.
          </p>
        </div>
      </div>
    </>
  );
}

export default Popup;
