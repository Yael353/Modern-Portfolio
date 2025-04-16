import React from "react";
import { Carousel } from "./ui/Carousel";

function LatestProject() {
  const slides = [
    {
      title: "Log in",
      src: "/login.png",
      dec: "This  login page is a secure and responsive, it features username and password inputs. The authentication system uses access tokens and localStorage to maintain user sessions and enable automatic login after reloads or returning visits.",
    },
    {
      title: "Overview",
      src: "/overview.png",
      dec: "This is the property overview page, where each card represents a building with relevant data. The data is fetched dynamically using Redux and presented in a paginated layout. The UI features a modern, responsive design with animated hover effects and alternating background images for visual appeal.",
    },
    {
      title: "Dashboard - Sensor cards",
      src: "/dashboard1.png",
      dec: "This is a clean and informative sensor overview dashboard that presents individual cards for each sensor category, such as indoor/outdoor temperature and radiator systems. Each card displays the latest recorded timestamp along with the total number of connected sensors.",
    },
    {
      title: "Dashboard - Line chart",
      src: "/dashboard2.png",
      dec: "This interactive chart visualizes indoor and outdoor temperatures where users can select different time intervals. Additionally, there is a carousel where the second chart displays the supply temperature and its inverse, providing a deeper insight into the building's temperature regulation system.",
    },
    {
      title: "Dashboard - Statistics",
      src: "/dashboard3.png",
      dec: "This section presents apartment statistics, such as electricity consumption, water usage, and indoor temperature, in a table organized by apartment size. It also allows users to click on individual apartments to view specific data for each one.",
    },

    {
      title: "Apartment - Chart",
      src: "/apartment.png",
      dec: "This section displays a dashboard with charts for outdoor temperature, electricity consumption, and hot water usage. Users can select different time intervals, and the data updates dynamically based on the selected period and apartment details, offering an interactive overview of resource usage.",
    },
    {
      title: "Apartment - Table",
      src: "/apartment1.png",
      dec: "",
    },
  ];
  return (
    <div className="flex justify-center items-center py-20" id="recentProject">
      <h1 className="heading">
        My most recent work — and the one{" "}
        <span className="text-purple"> I&apos;m most proud of.</span>
        <div className="py-10">
          <Carousel slides={slides} />
        </div>
      </h1>
    </div>
  );
}

export default LatestProject;
