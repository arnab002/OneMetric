'use client'
import React, { useEffect } from "react";

const ViralLoopsWidget = () => {
  useEffect(() => {
    // Create the script element for Viral Loops
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://app.viral-loops.com/widgetsV2/core/loader.js";
    script.setAttribute("data-campaign-id", "hQstDmSyd6z5emjtu1IuxZWGctY");
    script.id = "viral-loops-loader";

    // Append the script to the document
    document.body.appendChild(script);

    // Inject the custom widgets
    const widgetContainer = document.getElementById("viral-loops-widget");
    if (widgetContainer) {
      // Add form-widget
      const formWidget = document.createElement("form-widget");
      formWidget.setAttribute("ucid", "hQstDmSyd6z5emjtu1IuxZWGctY");
      widgetContainer.appendChild(formWidget);

      // Add milestone-widget
      const milestoneWidget = document.createElement("milestone-widget");
      milestoneWidget.setAttribute("ucid", "hQstDmSyd6z5emjtu1IuxZWGctY");
      widgetContainer.appendChild(milestoneWidget);

      // Add referral-count-widget
      const referralCountWidget = document.createElement("referral-count-widget");
      referralCountWidget.setAttribute("ucid", "hQstDmSyd6z5emjtu1IuxZWGctY");
      widgetContainer.appendChild(referralCountWidget);
    }

    // Clean up the script and widgets when the component unmounts
    return () => {
      const loaderScript = document.getElementById("viral-loops-loader");
      if (loaderScript) {
        document.body.removeChild(loaderScript);
      }

      // Clean up the widgets
      if (widgetContainer) {
        widgetContainer.innerHTML = ""; // Removes all child nodes
      }
    };
  }, []);

  return (
    <div>
      {/* Container for the Viral Loops widgets */}
      <div id="viral-loops-widget"></div>
    </div>
  );
};

export default ViralLoopsWidget;
