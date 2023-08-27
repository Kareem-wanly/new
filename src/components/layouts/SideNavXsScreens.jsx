import React, { forwardRef } from "react";
import { Box, Button, List, ListItem, Typography, Link } from "@mui/material";
import { Chalets, Special, Camps, Chair, Farms } from "../../assets";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LanguageIcon from "@mui/icons-material/Language";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageButton from "../selectnav/LanguageButton";
const socialMediaLinksSmall = [
  {
    icon: <FacebookIcon sx={{ fontSize: "2.3rem", marginX: "7px" }} />,
    url: "",
  },
  {
    icon: <TwitterIcon sx={{ fontSize: "2.3rem", marginX: "7px" }} />,
    url: "",
  },

  {
    icon: <InstagramIcon sx={{ fontSize: "2.3rem", marginX: "7px" }} />,
    url: "",
  },
  {
    icon: <YouTubeIcon sx={{ fontSize: "2.3rem", marginX: "7px" }} />,
    url: "",
  },
];
const SideNavXsScreens = forwardRef((props, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        position: "absolute",
        top: "80px",
        right: "0px",
        left: "0px",
        height: "100%",
        width: "100%",
        display: "flex",
        zIndex: "999",
        transition: "top 0.45s ease-in-out 0s",
        opacity: "1",
      }}
    >
      <Box
        sx={{
          height: "1px",
          width: "100%",
          position: "absolute",
          //   top: "80px",
          zIndex: "2",
          display: "block",
          backgroundColor: "rgb(242, 242, 242)",
        }}
      ></Box>
      <Box
        sx={{
          height: "508px",
          width: "100%",
          backgroundColor: "rgb(255, 255, 255)",
          position: "absolute",
          zIndex: "1",
          maxHeight: "90vh",
          top: "0px",
        }}
      >
        <Box sx={{ paddingX: "12px" }}>
          <List sx={{ paddingY: "32px" }}>
            <ListItem
              sx={{
                paddinY: "6px",
                paddingX: "16px",
                whiteSpace: "nowrap",
                minHeight: "48px",
              }}
            >
              <Box sx={{ display: "inline-flex", minWidth: "56px" }}>
                <img src={Chalets} alt="chalet" />
              </Box>
              <Typography>شاليهات، منتجعات، أستراحات</Typography>
            </ListItem>
            <ListItem
              sx={{
                paddinY: "6px",
                paddingX: "16px",
                whiteSpace: "nowrap",
                minHeight: "48px",
              }}
            >
              <Box sx={{ display: "inline-flex", minWidth: "56px" }}>
                <img src={Chair} alt="chair" />
              </Box>
              <Typography>شقق وبيوت خاصة </Typography>
            </ListItem>
            <ListItem
              sx={{
                paddinY: "6px",
                paddingX: "16px",
                whiteSpace: "nowrap",
                minHeight: "48px",
              }}
            >
              <Box sx={{ display: "inline-flex", minWidth: "56px" }}>
                <img src={Farms} alt="farms" />
              </Box>
              <Typography> مزارع</Typography>
            </ListItem>
            <ListItem
              sx={{
                paddinY: "6px",
                paddingX: "16px",
                whiteSpace: "nowrap",
                minHeight: "48px",
              }}
            >
              <Box sx={{ display: "inline-flex", minWidth: "56px" }}>
                <img src={Camps} alt="camp" />
              </Box>
              <Typography> مخيّمات</Typography>
            </ListItem>
            <ListItem
              sx={{
                paddinY: "6px",
                paddingX: "16px",
                whiteSpace: "nowrap",
                minHeight: "48px",
              }}
            >
              <Box sx={{ display: "inline-flex", minWidth: "56px" }}>
                <img src={Special} alt="specail" />
              </Box>
              <Typography> العروض</Typography>
            </ListItem>
          </List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 25px",
              borderTop: "1px solid #eaedf2",
            }}
          >
            <ChevronRightIcon sx={{ fontSize: "2.5rem" }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              <LanguageIcon sx={{ color: "gray" }} />
              {/* added language button comonent and give it a prop to let the component show on small screens  */}
              <LanguageButton isMenuButton={true} />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "50px",
              borderTop: "1px solid #eaedf2",
            }}
          >
            {socialMediaLinksSmall.map((social, index) => (
              <Link key={index} href={social.url} sx={{ color: "black" }}>
                <Box>{social.icon}</Box>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default SideNavXsScreens;
