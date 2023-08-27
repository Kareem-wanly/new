import React, { useState } from "react";
import {
  Drawer,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
  createTheme,
} from "@mui/material";
import Image from "next/image";
import { styled, ThemeProvider } from "@mui/system";
import AqqarLogo from "../../assets/مفرغ.png";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const drawerWidth = 300;

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: "18px",
          fontFamily: "Tajawal, Arial, sans-serif",
        },
      },
    },
  },
});

const Root = styled("div")(({ theme }) => ({
  display: "flex",
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
}));

const DrawerPaper = styled("div")(({ theme }) => ({
  width: drawerWidth,
}));

const Content = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const CustomListItem = styled(ListItem)(({ theme, isActive, hasSubList }) => ({
  height: 65,
  padding: "8px 36px",
  color: "var(--green-color)",
  cursor: "pointer",
  backgroundColor: isActive ? "#cffecf" : "inherit",
  "&.no-hover:hover": {
    backgroundColor: "inherit",
  },
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));
const RightNav = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [isSubListOpen, setSubListOpen] = useState(false);
  const [activeSubItem, setActiveSubItem] = useState(null);

  const handleListItemClick = (index, subIndex) => {
    setActiveItem(index);

    // Toggle the sublist open/close state
    if (index === 2) {
      setSubListOpen((prevState) => !prevState);
      setActiveSubItem(null); // Reset active subitem when toggling sublist
    } else {
      setSubListOpen(false); // Close the sublist for other list items
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <StyledDrawer variant="permanent" anchor="right">
          <DrawerPaper>
            <List>
              <CustomListItem className="no-hover">
                <Link href="#">
                  <Image
                    src={AqqarLogo}
                    alt="Image Description"
                    layout="fill"
                    objectFit="contain"
                  />
                </Link>
              </CustomListItem>
              <CustomListItem className="no-hover">
                <Link href="/addads" sx={{ height: "100%", width: "100%" }}>
                  <Button
                    sx={{
                      color: "var(--green-color)",
                      borderRadius: "30px",
                      width: "100%",
                      height: "100%",
                      border: "1px solid",
                    }}
                  >
                    <AddIcon sx={{ marginLeft: "5px" }} />
                    <Typography>أضافة إعلان</Typography>
                  </Button>
                </Link>
              </CustomListItem>
              <CustomListItem
                sx={{
                  backgroundColor: activeItem === 0 ? "#cffecf" : "inherit",
                }}
                onClick={() => handleListItemClick(0)}
              >
                <Box>
                  <Typography>ملف شخصي</Typography>
                </Box>
              </CustomListItem>
              <CustomListItem
                sx={{
                  backgroundColor: activeItem === 1 ? "#cffecf" : "inherit",
                }}
                onClick={() => handleListItemClick(1)}
              >
                <Box>
                  <Typography>إعلاناتي</Typography>
                </Box>
              </CustomListItem>
              <CustomListItem
                sx={{
                  backgroundColor: activeItem === 2 ? "#cffecf" : "inherit",
                }}
                onClick={() => handleListItemClick(2)}
              >
                <Box>
                  <Typography>طلبات</Typography>
                </Box>

                <KeyboardArrowDownIcon
                  style={{
                    transform: isSubListOpen ? "rotate(0deg)" : "rotate(90deg)",
                  }}
                />
              </CustomListItem>
              {activeItem === 2 && isSubListOpen && (
                <div style={{ cursor: "pointer" }}>
                  <ListItem
                    sx={{
                      height: "65px",
                      color: "gray",
                      padding: "8px 36px",
                      backgroundColor:
                        activeSubItem === 0 ? "#cffecf" : "inherit",
                    }}
                    onClick={() => handleListItemClick(2, 0)}
                  >
                    <Typography>طلبات جديدة</Typography>
                  </ListItem>
                  <ListItem
                    sx={{
                      height: "65px",
                      color: "gray",
                      padding: "8px 36px",
                      backgroundColor:
                        activeSubItem === 1 ? "#cffecf" : "inherit",
                    }}
                    onClick={() => handleListItemClick(2, 1)}
                  >
                    <Typography>طلبات واردة</Typography>
                  </ListItem>
                  <ListItem
                    sx={{
                      height: "65px",
                      color: "gray",
                      padding: "8px 36px",
                      backgroundColor:
                        activeSubItem === 2 ? "#cffecf" : "inherit",
                    }}
                    onClick={() => handleListItemClick(2, 2)}
                  >
                    <Typography>طلبات صادرة</Typography>
                  </ListItem>
                </div>
              )}
              <CustomListItem
                sx={{
                  backgroundColor: activeItem === 3 ? "#cffecf" : "inherit",
                }}
                onClick={() => handleListItemClick(3)}
              >
                <Box>
                  <Typography>إعلانات مفضلة</Typography>
                </Box>
              </CustomListItem>
            </List>
          </DrawerPaper>
        </StyledDrawer>
      </Root>
    </ThemeProvider>
  );
};

export default RightNav;
