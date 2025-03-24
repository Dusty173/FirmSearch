import React, { useEffect, useState } from "react";

function AUM({ totalAssets }) {
  function checkSize(totalAssets) {
    if (totalAssets <= 250000000) return "Less than $250 million (Small)";
    if (totalAssets <= 500000000) return "$250-$500m (Small-Medium)";
    if (totalAssets <= 750000000) return "$500-$750m (Medium)";
    if (totalAssets <= 1000000000) return "$750m-$1b (Medium-Large)";
    if (totalAssets <= 5000000000) return "$1b-$5b (Large)";
    if (totalAssets <= 15000000000) return "$5b-$15b (Giant)";
    if (totalAssets >= 15000000000) return "$15billion+ (Mega)";
    if (!totalAssets) return "No Regulatory Assets Under Management Reported";
  }

  return (
    <>
      <li>
        Firm size by U.S. dollar mount of Assets Under Management:{" "}
        <b>{checkSize(totalAssets)}</b>
      </li>
    </>
  );
}

export default AUM;
