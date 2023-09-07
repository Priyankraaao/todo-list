import Image from "next/image";
import React from "react";

function CalendarComponenet() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Image
        src={"/homeScreen.svg"}
        alt="Vercel Logo"
        className="logo"
        width={500}
        height={500}
      />
    </div>
  );
}

export default CalendarComponenet;
