import React, { useEffect, useState } from "react";
import "./Custodians.css";
import Gather from "../common/Gather";
import axios from "axios";
import handleOutput from "../common/handleOutput";

function Participation({ partTransactions }) {
  const info = partTransactions;
  return (
    <>
      <h3>----Things To Know----</h3>
      <h4>Proprietary Interest in Client Transactions:</h4>
      {info.Item8A.Q8A1 === "Y" || info.Item8A.Q8A2 === "Y" ? (
        <ul>
          <li className={handleOutput(info.Item8A.Q8A1)}>
            Buys Securities for Self from Advisory Clients, or Sell Securities
            you own to Advisory Clients
          </li>
          <li className={handleOutput(info.Item8A.Q8A2)}>
            Buys or Sells for Self: Securities (other than shares of mutual
            funds) that are also recommended to Advisory Clients.
          </li>
        </ul>
      ) : (
        <p>None Reported</p>
      )}

      <h4>Sales Interest in Client Transactions:</h4>
      {info.Item8B.Q8B1 == "Y" ||
      info.Item8B.Q8B2 == "Y" ||
      info.Item8B.Q8B3 == "Y" ? (
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
      {info.Item8C.Q8C1 == "Y" ||
      info.Item8C.Q8C2 == "Y" ||
      info.Item8C.Q8C3 == "Y" ||
      info.Item8C.Q8C4 == "Y" ? (
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

      <h4>Investment or Brokerage Discretion</h4>
      {info.Item8G.Q8G1 == "Y" ||
      info.Item8H.Q8H1 == "Y" ||
      info.Item8I.Q8I == "Y" ? (
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
      <h3>----Disclosures----</h3>
      {info.Item11A.Q11A1 == "Y" ||
      info.Item11A.Q11A2 == "Y" ||
      info.Item11B.Q11B1 == "Y" ||
      info.Item11B.Q11B2 == "Y" ? (
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
          </ul>
        </>
      ) : (
        <h3 className="good-to-go">No Criminal Disclosures Found</h3>
      )}
    </>
  );
}

export default Participation;
