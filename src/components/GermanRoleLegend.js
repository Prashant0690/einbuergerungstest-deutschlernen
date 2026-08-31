import React from "react";

function GermanRoleLegend({ className = "" }) {
  return (
    <div className={`role-legend ${className}`.trim()} aria-label="German sentence role colour scheme">
      <span className="role-chip case-nom">Blue: subject / nominative</span>
      <span className="role-chip case-verb">Teal: verb / action</span>
      <span className="role-chip case-dat">Purple: receiver / dative</span>
      <span className="role-chip case-acc">Green: direct object / accusative</span>
      <span className="role-chip case-gen">Maroon: possession / genitive</span>
    </div>
  );
}

export default GermanRoleLegend;
