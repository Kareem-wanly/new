import React, { useState } from "react";
import { Button, Modal, Box, Backdrop, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useTranslation } from "react-i18next";

const ShowHomeSatusModal = ({ onClose }) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{
        onClick: onClose,
      }}
    >
      <Box
        sx={{
          padding: "1rem",
          background: "rgb(255, 255, 255)",
          width: "350px",
          minHeight: "200px",
          borderRadius: "16px",
          position: "absolute",
          top: "50%",
          right: "50%",
          transform: "translate(50%, -50%)",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <ReportProblemIcon
            sx={{ color: "var(--green-color)", marginInlineEnd: "0.5rem" }}
          />
          <Typography sx={{ fontSize: "1.25rem", lineHeight: "1.1" }}>
            {t("user_dashboard.outgoing_requests.change_status_title")}
          </Typography>
        </Box>
        <Typography sx={{ marginY: "1.5rem" }}>
          {t("user_dashboard.outgoing_requests.change_status_desc")}
        </Typography>

        <Typography>
          {t("user_dashboard.outgoing_requests.change_status_confirm_msg")}
        </Typography>
        <Box
          sx={{
            height: "min-content",
            display: "flex",
            marginBlockStart: "0.5rem",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              backgroundColor: "var(--green-color) ",
              color: "white",
              borderRadius: "400px",
              padding: "12px 24px",
              "&:hover": {
                backgroundColor: "#0b7b5a",
                color: "white",
              },
            }}
          >
            {t("user_dashboard.outgoing_requests.change_status_confirm_btn")}
          </Button>
          <Button
            sx={{
              color: "var(--green-color)",
              backgroundColor: "white",
              border: "1px solid var(--green-color)",
              borderRadius: "400px",
              padding: "12px 24px",
            }}
            onClick={onClose}
          >
            {t("user_dashboard.outgoing_requests.change_status_cancel_btn")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShowHomeSatusModal;
