import React from "react";
import "./ADVexp.css";

function ExpPage() {
  return (
    <>
      <div className="ADV-expo-container">
        <h1>Informative Notes:</h1>
        <div className="ADVexpo">
          <p>
            According to the Envestnet | MoneyGuide 2024 State of Financial
            Planning & Fees Study: The average fixed percentage fee for a
            financial advisor is 1.05% on total Assets Under Management.
          </p>
          <ul>
            <li>The average flat fee is $2,554</li>
            <li>The average hourly rate is $268</li>
            <li>The average annual/retainer fee is $4,484</li>
            <li>The average subscription fee is $215/month</li>
          </ul>
        </div>

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
          <div className="AER">
            <h3>
              Everything that follows on the page is generated and run through
              logic to make it easier to understand, as well as only displaying
              the relevant information for said Firm
            </h3>
            <ul className="list-ul">
              <li className="list-li">
                <b>- Sites:</b>&nbsp; Websites Listed for this firm
              </li>
              <li className="list-li">
                <b>- Other Business Names:</b>&nbsp; Displays any other Business
                names and Jurisdictions for this firm
              </li>
              <li className="list-li">
                <b>- Staff Brakedown:</b>&nbsp; A breakdown of the Total number
                of staff and how many staff are performing any relevant roles,
                keeping in mind some staff may perform multiple roles.
              </li>
              <li className="list-li">
                <b>- Client Type:</b>&nbsp; Shows how many of each type of
                client (Individual vs High Net Worth Individual) that this firm
                Manages Assets for. As well as other relevant Assets Under
                Management.
              </li>
              <li className="list-li">
                <b>- Direct Owners:</b>&nbsp; People or entities that directly
                own this firm, as well as their type of ownership.
              </li>
              <li className="list-li">
                <b>- Indirect Owners:</b>&nbsp; This is a list of indirect
                owners and the Relevant Entity they own.
              </li>
              <li className="list-li">
                <b>- Compensation Agreements:</b>&nbsp; The agreements this Firm
                allows between the Client and this Firm to receive payment in
                return for its services
              </li>
              <li className="list-li">
                <b>- Advisory Services Offered:</b>&nbsp; Lists all the services
                that this Firm provides, including any other non-standard
                services that the firm provides.
              </li>
              <li className="list-li">
                <b>- Investing Practices:</b>&nbsp; Lists relevant investment
                information that this Firm uses to conduct business, including
                additional information about their advisory business.{" "}
              </li>
              <li className="list-li">
                <b>- Marketing Activities:</b>&nbsp; Lists the type of marketing
                this Firm practices or pays for.
              </li>
              <li className="list-li">
                <b>- Financial Industry Affiliations and/or Related Persons:</b>
                &nbsp; Lists the type of Affiliations this firm has as well as
                any Related people to any person/ this firm.
              </li>
              <li className="list-li">
                <b>- FP Services Review</b>&nbsp;
                <p>
                  Judged by Industry Experts this shows any related information
                  that you may want to consider when doing business with this
                  firm, sub-categories include:
                  <i>Custodians for Separately Managed Accounts</i>,&nbsp;
                  <i>Standing Letter of Instruction</i>,&nbsp;
                  <i>Other Business Activities</i>
                </p>
              </li>
              <li className="list-li">
                <b>- Things to Know:</b>&nbsp;Items under things to know are for
                your consideration as a potential client, this information is
                more for transparency so you can see more about how a Firm
                operates.
              </li>
              <li className="list-li">
                <b>- Disclosures:</b>
                <p>
                  &nbsp;Go on Green! This part of the form is very important.
                  This is a Firms disclosure section and shows disciplinary
                  actions brought against this firm or any related persons to
                  this firm.&nbsp;
                  <i>
                    We filter out any disciplined firms,{" "}
                    <b>UNLESS you search for a Firm by their CRD Number.</b>
                  </i>
                </p>
              </li>
              <li className="list-li">
                <b>- Brochures:</b>&nbsp;Lists all the Brochures related to this
                firm.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpPage;
