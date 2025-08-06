import React from "react";
import "./Custodians.css";
import handleOutput from "../common/handleOutput";

function Participation({ partTransactions, miscInfo }) {
  const info = partTransactions;
  const misc = miscInfo;

  // console.log("Info:", info);

  return (
    <>
      <h3>----Things To Know----</h3>
      <h4>Proprietary Interest in Client Transactions:</h4>
      {info.Item8A.Q8A1 === "Y" ||
      info.Item8A.Q8A2 === "Y" ||
      info.Item8A.Q8A3 === "Y" ? (
        <ul>
          <li className={handleOutput(info.Item8A.Q8A1)}>
            Buys Securities for Self from Advisory Clients, or Sell Securities
            you own to Advisory Clients
          </li>
          <li className={handleOutput(info.Item8A.Q8A2)}>
            Buys or Sells for Self: Securities (other than shares of mutual
            funds) that are also recommended to Advisory Clients.
          </li>
          <li className={handleOutput(info.Item8A.Q8A3)}>
            Recommends Securities (or other Investment Products) to advisory
            clients in which they or any related person has some other
            proprietary (ownership) interest (other than those mentioned in
            Items 8.A(1) or (2)).
          </li>
        </ul>
      ) : (
        <p>None Reported</p>
      )}

      <h4>Sales Interest in Client Transactions:</h4>
      {info.Item8B.Q8B1 === "Y" ||
      info.Item8B.Q8B2 === "Y" ||
      info.Item8B.Q8B3 === "Y" ? (
        <ul>
          <li className={handleOutput(info.Item8B.Q8B1)}>
            A Broker-dealer or Registered Representative of a Broker-dealer,
            executes Securities Trades for Brokerage Customers in which Advisory
            Client Securities are sold to or bought from the Brokerage Customer
            (agency cross transactions).
          </li>
          <li className={handleOutput(info.Item8B.Q8B2)}>
            Recommends Purchase of Securities to Advisory Clients for which this
            Firm or any related person serves as underwriter, general or
            managing partner, or purchaser representative
          </li>
          <li className={handleOutput(info.Item8B.Q8B3)}>
            Recommends Purchase or Sale of Securities to Advisory Clients for
            which this Firm or any related person(s) has any other Sales
            interest (other than the receipt of Sales commissions as a broker or
            Registered Representative of a Broker-dealer).
          </li>
        </ul>
      ) : (
        <p>None Reported</p>
      )}
      <h4>Investment or Brokerage Discretion:</h4>
      {info.Item8C.Q8C1 === "Y" ||
      info.Item8C.Q8C2 === "Y" ||
      info.Item8C.Q8C3 === "Y" ||
      info.Item8C.Q8C4 === "Y" ? (
        <ul>
          <li className={handleOutput(info.Item8C.Q8C1)}>
            Securities to be Bought or Sold for a Clients Account
          </li>
          <li className={handleOutput(info.Item8C.Q8C2)}>
            Amount of Securities to be Bought or Sold for a Clients Account
          </li>
          <li className={handleOutput(info.Item8C.Q8C3)}>
            Broker or Dealer for a Purchase or Sale of Securities for a Clients
            account
          </li>
          <li className={handleOutput(info.Item8C.Q8C4)}>
            Commission Rates to be paid to a Broker or Dealer for a Clients
            Account
          </li>
        </ul>
      ) : (
        <p>None Reported</p>
      )}
      {info.Item8C.Q8C3 === "Y" ? (
        <ul>
          <li className={handleOutput(info.Item8C.Q8C3)}>
            Are any of the Brokers or Dealers related persons?{" "}
            {info.Item8D.Q8D === "Y" ? "Yes" : "No"}
          </li>
        </ul>
      ) : (
        <span></span>
      )}

      {info.Item9D.Q9D1 ? (
        <ul>
          <li className={handleOutput(info.Item9D.Q9D1)}>
            This Firm acts as Qualified Custodian
          </li>
          <li className={handleOutput(info.Item9D.Q9D2)}>
            This Firm OR ANY Related Persons act as Qualified Custodians for
            their clients in connection with Advisory Services they provide to
            clients, that the related persons act as Qualified Custodians.
          </li>
        </ul>
      ) : (
        <span></span>
      )}

      <h4>Wrap Fee Program Participation:</h4>
      <p className="WFP">
        {info.Item5I.Q5I1 === "Y"
          ? "Participates in Wrap Fee Program"
          : "Does not Participate."}
      </p>

      <h4>Investment or Brokerage Discretion</h4>
      {info.Item8G.Q8G1 === "Y" ||
      info.Item8H.Q8H1 === "Y" ||
      info.Item8I.Q8I === "Y" ? (
        <ul>
          <li className={handleOutput(info.Item8G.Q8G1)}>
            This Firm or any related person(s) receives Research or other
            Products or Services other than Execution from a Broker-dealer or a
            Third party ("Soft Dollar Benefits") in connection with Client
            Securities Transactions.
          </li>
          <li className={handleOutput(info.Item8H.Q8H1)}>
            This Firm or any related person(s), Directly or Indirectly,
            Compensates any person(s) for Client Referrals in 10/2012 version.
          </li>
          <li className={handleOutput(info.Item8I.Q8I)}>
            This Firm or any related person(s), Directly or Indirectly, receive
            Compensation from any person(s) for Client Referrals.
          </li>
        </ul>
      ) : (
        <p>None reported</p>
      )}

      {misc.b.other !== "" ? (
        <div>
          <h4>Miscellaneous</h4>
          <p>{misc.b.other}</p>
        </div>
      ) : (
        <span></span>
      )}

      <h3>----Disclosures----</h3>
      {info.Item11.Q11 === "Y" ? (
        <>
          <h4>Criminal Disclosures:</h4>
          <ul>
            <li className={handleOutput(info.Item11A.Q11A1)}>
              This Firm has been convicted of or Plead Guilty or Nolo Contendere
              ("No Contest") in a Domestic, Foreign, or Military Court to
              any&nbsp;<i>Felony</i>.
            </li>
            <li className={handleOutput(info.Item11A.Q11A2)}>
              This Firm has been charged with a&nbsp;<i>Felony</i>.
            </li>
            <li className={handleOutput(info.Item11B.Q11B1)}>
              This Firm has been Convicted of or Plead Guilty or Nolo Contendere
              ("No Contest") in a domestic, Foreign, or military Court to
              a&nbsp;
              <i>Misdemeanor</i>&nbsp;Involving: Investments or an
              Investment-related Business, or any Fraud, False Statements, or
              Omissions, Wrongful taking of property, Bribery, Perjury, Forgery,
              Counterfeiting, Extortion, or a Conspiracy to Commit any of these
              Offenses.
            </li>
            <li className={handleOutput(info.Item11B.Q11B2)}>
              This Firm has been Charged with a&nbsp;<i>Misdemeanor</i>
            </li>

            <h4>
              Item11C -- The S.E.C. or the Commodity Futures Trading Commission
              (C.F.T.C.) has ever:
            </h4>
            <li className={handleOutput(info.Item11C.Q11C1)}>
              Found this Firm or any advisory affiliate to have made a false
              statement or omission.
            </li>
            <li className={handleOutput(info.Item11C.Q11C2)}>
              Found this firm or any advisory affiliate to have been involved in
              a violation of S.E.C. or C.F.T.C. regulations or statutes.
            </li>
            <li className={handleOutput(info.Item11C.Q11C3)}>
              Found this firm or any advisory affiliate to have been a cause of
              an investment-related business having its authorization to do
              business denied, suspended, revoked, or restricted.
            </li>
            <li className={handleOutput(info.Item11C.Q11C4)}>
              Entered an order against this firm or any advisory affiliate in
              connection with investment-related activity.
            </li>
            <li className={handleOutput(info.Item11C.Q11C5)}>
              Imposed a civil money penalty on this firm or any advisory
              affiliate, or ordered this firm or any advisory affiliate to cease
              and desist from any activity.
            </li>

            <li className={handleOutput(info.Item11F.Q11F)}>
              This Firms or any advisory affiliates authorization to act as an
              attorney, accountant, or federal contractor granted to you has
              been revoked or suspended.
            </li>
            <li className={handleOutput(info.Item11G.Q11G)}>
              This Firm or any advisory affiliate is now the subject of a
              regulatory proceeding that could result in a "yes" answer to any
              part of Item 11.C., 11.D., or 11.E.
            </li>

            <h4>
              Item11D -- Other Federal Regulatory Agencies, State Regulatory
              Agencies, or any Foreign Financial Regulatory Authorities have:
            </h4>
            <li className={handleOutput(info.Item11D.Q11D1)}>
              Found this Firm or any advisory affiliate to have made a false
              statement or omission, or been dishonest, unfair, or unethical.
            </li>
            <li className={handleOutput(info.Item11D.Q11D2)}>
              Found this Firm or any advisory affiliate to have been involved in
              a violation of investment-related regulations or statutes.
            </li>
            <li className={handleOutput(info.Item11D.Q11D3)}>
              Found this Firm or any advisory affiliate to have been a cause of
              an investment-related business having its authorization to do
              business denied, suspended, revoked, or restricted.
            </li>
            <li className={handleOutput(info.Item11D.Q11D4)}>
              In the past ten years, entered an order against this Firm or any
              advisory affiliate in connection with an investment-related
              activity.
            </li>
            <li className={handleOutput(info.Item11D.Q11D5)}>
              Ever denied, suspended, or revoked this Firms or any advisory
              affiliate's registration or license, or otherwise prevented this
              Firm or any advisory affiliate, by order, from associating with an
              investment-related business or restricted this Firms or any
              advisory affiliate's activity.
            </li>
          </ul>

          <h4>
            Item11E -- Another Self-Regulatory Organization or Commodities
            Exchange has ever:
          </h4>
          <li className={handleOutput(info.Item11E.Q11E1)}>
            Found this Firm or any advisory affiliate to have made a false
            statement or omission.
          </li>
          <li className={handleOutput(info.Item11E.Q11E2)}>
            Found this or any advisory affiliate to have been involved in a
            violation of its rules (other than a violation designated as a
            "minor rule violation" under a plan approved by the S.E.C.).
          </li>
          <li className={handleOutput(info.Item11E.Q11E3)}>
            Found this Firm or any advisory affiliate to have been the cause of
            an investment-related business having its authorization to do
            business denied, suspended, revoked, or restricted.
          </li>
          <li className={handleOutput(info.Item11E.Q11E4)}>
            Disciplined this Firm or any advisory affiliate by expelling or
            suspending this Firm or the advisory affiliate from membership,
            barring or suspending this Firm or the advisory affiliate from
            association with other members, or otherwise restricting this Firms
            or the advisory affiliate's activities.
          </li>

          <h4>Item11H -- Civil Judicial Action:</h4>
          <ul>
            <li className={handleOutput(info.Item11H.Q11H1A)}>
              In the past ten years, enjoined this Firm or any advisory
              affiliate in connection with any investment-related activity.
            </li>
            <li className={handleOutput(info.Item11H.Q11H1B)}>
              Ever found that this Firm or any advisory affiliate were involved
              in a violation of investment-related statutes or regulations.
            </li>
            <li className={handleOutput(info.Item11H.Q11H1C)}>
              Ever dismissed, pursuant to a settlement agreement, an
              investment-related civil action brought against this Firm or any
              advisory affiliate by a state or foreign financial regulatory
              authority.
            </li>
            <li className={handleOutput(info.Item11H.Q11H2)}>
              This firm or any advisory affiliate is now the subject of a civil
              proceeding that could result in a "yes" answer to any part of Item
              11.H(1).
            </li>
          </ul>
        </>
      ) : (
        <h3 className="good-to-go">No Criminal Disclosures Found</h3>
      )}
    </>
  );
}

export default Participation;
