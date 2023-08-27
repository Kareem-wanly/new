import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Container,
  Button,
  TextField,
  InputLabel,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";

const Usersmangament = () => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const handleInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, "");
  };
  const handleAddOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAddCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDeleteOpenModal = () => {
    setIsModalDeleteOpen(true);
  };

  const handleDeleteCloseModal = () => {
    setIsModalDeleteOpen(false);
  };

  return (
    <>
      <Typography
        sx={{
          fontSize: { xs: "20px", md: "25px" },
          fontWeight: "700",
          marginBottom: "2rem",
        }}
      >
        {t("user_dashboard.users_manage.title")}
      </Typography>
      <Paper
        sx={{
          maxWidth: { xs: "100%", lg: "90%" },
          padding: "2rem",
          margin: "auto",
          boxShadow: "2",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box>
            <InputLabel sx={{ marginBottom: "15px" }}>
              {t("user_dashboard.users_manage.label")}
            </InputLabel>
            <TextField
              sx={{ width: "20rem" }}
              inputProps={{
                onInput: handleInput,
              }}
            />
          </Box>
          <Button
            sx={{
              backgroundColor: "var(--green-color)",
              color: "white",
              borderRadius: "6px",
              marginTop: "37px",
              padding: { xs: "10px 3rem", md: "16px 3rem" },
              marginRight: "20px",
              "&:hover": {
                backgroundColor: "var(--green-color)",
                color: "white",
              },
            }}
          >
            {t("user_dashboard.users_manage.button")}
          </Button>
        </Box>
        <Box
          sx={{
            width: "80%",
            height: "0.5px",
            backgroundColor: "#e9e7e7;",
            marginY: "3rem",
            marginX: "auto",
          }}
        ></Box>
        <Box>
          <Typography sx={{ fontSize: "22px", color: "var(--green-color)" }}>
            {t("user_dashboard.users_manage.title2")}
          </Typography>
          <Box sx={{ display: "flex", marginY: "1rem" }}>
            <Typography sx={{ marginLeft: "10px" }}>
              {" "}
              {t("user_dashboard.users_manage.user_info.name")}:
            </Typography>
            <Typography sx={{ color: "gray" }}>محمد محمد رامي</Typography>
          </Box>
          <Box sx={{ display: "flex", marginY: "1rem" }}>
            <Typography sx={{ marginLeft: "10px" }}>
              {t("user_dashboard.users_manage.user_info.phonenumber")}:
            </Typography>
            <Typography sx={{ color: "gray" }}>0000000000000 </Typography>
          </Box>
          <Button
            sx={{ color: "var(--green-color)" }}
            onClick={handleAddOpenModal}
          >
            {t("user_dashboard.users_manage.add_btn")}
          </Button>
        </Box>
        <Box
          sx={{
            width: "80%",
            height: "0.5px",
            backgroundColor: "#e9e7e7;",
            marginY: "3rem",
            marginX: "auto",
          }}
        ></Box>
        <Box>
          <Typography sx={{ fontSize: "22px", color: "var(--green-color)" }}>
            {t("user_dashboard.users_manage.title3")}
          </Typography>
          <Box
            sx={{ width: "100%", border: "1px solid #eee", padding: "1rem" }}
          >
            <Box
              sx={{
                display: "flex",
                marginY: "1rem",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                paddingBottom: "1rem",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  display: { xs: "block", md: "flex" },
                  marginBottom: { xs: "15px", md: "0px" },
                }}
              >
                <Typography sx={{ marginLeft: "10px" }}>
                  {t("user_dashboard.users_manage.user_info.name")}:
                </Typography>
                <Typography sx={{ color: "gray", minWidth: "12rem" }}>
                  لامتال لكبنلا للانللا
                </Typography>
              </Box>
              <Box
                sx={{
                  display: { xs: "block", md: "flex" },
                  marginBottom: { xs: "15px", md: "0px" },
                }}
              >
                <Typography sx={{ marginLeft: "10px" }}>
                  {t("user_dashboard.users_manage.user_info.phonenumber")}:
                </Typography>
                <Typography sx={{ color: "gray", minWidth: "12rem" }}>
                  000000000
                </Typography>
              </Box>

              <DeleteIcon
                sx={{ color: "red", cursor: "pointer" }}
                onClick={handleDeleteOpenModal}
              ></DeleteIcon>
            </Box>
            <Box
              sx={{
                display: "flex",
                marginY: "1rem",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                paddingBottom: "1rem",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  display: { xs: "block", md: "flex" },
                  marginBottom: { xs: "15px", md: "0px" },
                }}
              >
                <Typography sx={{ marginLeft: "10px" }}>
                  اسم المستخدم:
                </Typography>
                <Typography sx={{ color: "gray", minWidth: "12rem" }}>
                  لامتال لكبنلا للانللا
                </Typography>
              </Box>
              <Box
                sx={{
                  display: { xs: "block", md: "flex" },
                  marginBottom: { xs: "15px", md: "0px" },
                }}
              >
                <Typography sx={{ marginLeft: "10px" }}>رقم الجوال:</Typography>
                <Typography sx={{ color: "gray", minWidth: "12rem" }}>
                  000000000
                </Typography>
              </Box>

              <DeleteIcon
                sx={{ color: "red", cursor: "pointer" }}
                onClick={handleDeleteOpenModal}
              ></DeleteIcon>
            </Box>
          </Box>
        </Box>
        <Modal open={isModalOpen} onClose={handleAddCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              width: 350,
              borderRadius: "20px",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {t("user_dashboard.users_manage.add_confirm_title")}
            </Typography>
            <Box
              sx={{
                marginTop: "2rem",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Button
                sx={{
                  backgroundColor: "var(--green-color)",
                  color: "white",
                  paddingX: "2rem",
                  marginX: "10px",
                }}
              >
                {t("user_dashboard.users_manage.yes_btn")}
              </Button>
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "var(--green-color)",
                  border: "1px solid var(--green-color)",
                  paddingX: "2rem",
                  marginX: "10px",
                }}
                onClick={handleAddCloseModal}
              >
                {t("user_dashboard.users_manage.cancel_btn")}
              </Button>
            </Box>
          </Box>
        </Modal>
        <Modal open={isModalDeleteOpen} onClose={handleDeleteCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              width: 350,
              borderRadius: "20px",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {t("user_dashboard.users_manage.delete_confirm_title")}
            </Typography>
            <Box
              sx={{
                marginTop: "2rem",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Button
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  paddingX: "2rem",
                  marginX: "10px",
                  "&:hover": {
                    backgroundColor: "red",
                    color: "white",
                  },
                }}
              >
                {t("user_dashboard.users_manage.delete_btn")}
              </Button>
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "gray",
                  border: "1px solid gray",
                  paddingX: "2rem",
                  marginX: "10px",
                }}
                onClick={handleDeleteCloseModal}
              >
                {t("user_dashboard.users_manage.cancel_btn")}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Paper>
    </>
  );
};
export default Usersmangament;
