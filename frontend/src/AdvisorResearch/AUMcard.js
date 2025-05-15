import React, { useEffect, useState } from "react";

function AUMCard({ totalAssets }) {
  function checkSize(totalAssets) {
    if (totalAssets <= 250000000) return "Less than $250 million (Small)";
    if (totalAssets <= 500000000) return "$250m-$500m (Small-Medium)";
    if (totalAssets <= 750000000) return "$500m-$750m (Medium)";
    if (totalAssets <= 1000000000) return "$750m-$1b (Medium-Large)";
    if (totalAssets <= 5000000000) return "$1b-$5b (Large)";
    if (totalAssets <= 15000000000) return "$5b-$15b (Giant)";
    if (totalAssets >= 15000000000) return "$15billion+ (Mega)";
    if (!totalAssets) return "Not Reported by Firm";
  }

  return (
    <>
      <li>
        Firm size by $ of Assets Under Management:&nbsp;
        <b>{checkSize(totalAssets)}</b>
      </li>
    </>
  );
}

export default AUMCard;
