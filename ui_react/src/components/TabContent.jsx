import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

const TabContent = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Tabs value={activeTab} onChange={handleChange} >
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.label} sx={{color:'#00796b', height:'30px'}}/>
        ))}
      </Tabs>
      <Box>{tabs[activeTab].component}</Box>
    </Box>
  );
};

export default TabContent;
