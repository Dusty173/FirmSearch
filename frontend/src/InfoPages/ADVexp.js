import React from "react";
import "./ADVexp.css";

function ExpPage() {
  return (
    <>
      <div className="ADV-expo-container">
        <h1 className="ADVexpo-title">Understanding A Form ADV</h1>
        <div className="ADVexpo">
          <div className="AER">
            <h3>Advisory Evaluator Report:</h3>
            <p>
              After populating the information for the advisory firm, the report
              header will display basic information such as:
            </p>
            <ul className="example-ul">
              <li className="example-li">- Business Name and Location</li>
              <li className="example-li">- Contact Information</li>
              <li className="example-li">- Type of Organization</li>
              <li className="example-li">
                - Alternate Offices <br />
                <small>
                  (A DBA, or 'doing business as,' is used when an individual or
                  corporation operates under a name different from its legal
                  name. This is common for companies who want to share in
                  business operations but function mostly independently.)
                </small>
              </li>
              <li className="example-li">
                - Number of individual Investment Accounts under management
              </li>
              <li className="example-li">
                - Firm Size - relative to total investable assets under
                management
              </li>
            </ul>
            <div className="example-img">
              <img
                className="example-img"
                src="Example.PNG"
                alt="Picture of example firm return"
              ></img>
            </div>
          </div>
          <div className="CA">
            <h3>Compensation Agreement:</h3>
            <p>
              One of the most important aspects of an advisor is having a clear
              understanding of how they charge for their services.
            </p>
            <p>Common practice is to bill their fees based on:</p>
            <ul className="example-ul">
              <li className="example-li">
                - Takes percentage of assets under management (ie $500k at 1%
                fee is $5,000 annually)
              </li>
              <li className="example-li">- Charges Hourly</li>
              <li className="example-li">
                - Fixed Fees (ie “project-based financial planning,” no
                recurring charges)
              </li>
            </ul>
          </div>
          <div className="ASO">
            <h3>Advisory Services Offered</h3>
            <ul className="example-ul">
              <li className="example-li">
                - Financial Planning Services: This may include Investments,
                Retirement, Estate Planning, Insurance, and Tax Planning (not to
                be confused with “legal tax advice”)
              </li>
              <li className="example-li">
                - Portfolio Management for Individuals and/or Businesses
              </li>
              <li className="example-li">
                - Educational seminars/workshops: This firm likely offers adult
                education seminars on matters related to Financial Planning
              </li>
              <li className="example-li">
                - Other Services (Specified by Firm): This may include Estate
                Planning, General Consulting Services, etc.
              </li>
            </ul>
          </div>
          <div className="FPSR">
            <h3>FP Services Review</h3>
            <h4 className="coming soon">Coming Soon...</h4>
          </div>
          <div className="Disclosures">
            <h3>Disclosures</h3>
            <h4 className="coming soon">Coming Soon...</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpPage;
