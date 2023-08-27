import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const categories = [
  {
    id: 1,
    ar_name: "فيلا",
    en_name: "Villa",
  },
  {
    id: 2,
    ar_name: "أرض",
    en_name: "Land",
  },
  {
    id: 3,
    ar_name: "عمارة",
    en_name: "Building",
  },
  {
    id: 4,
    ar_name: "بيت للبيع",
    en_name: "House for sale",
  },
  {
    id: 5,
    ar_name: "استراحة",
    en_name: "Chalet",
  },
  {
    id: 6,
    ar_name: "مزرعة",
    en_name: "Farm",
  },
  {
    id: 7,
    ar_name: "مستودع",
    en_name: "Warehouse",
  },
  {
    id: 8,
    ar_name: "شقة",
    en_name: "Apartment",
  },
  {
    id: 20,
    ar_name: "مخيم للإيجار",
    en_name: "Camp for rent",
  },
  {
    id: 21,
    ar_name: "محل للتقبيل",
    en_name: "Shop for sale",
  },
];

const main_array = [
  {
    id: 1,
    ar_name: "فيلا للبيع",
    en_name: "Villa for sale",
  },
  {
    id: 2,
    ar_name: "أرض للبيع",
    en_name: "Land for sale",
  },
  {
    id: 3,
    ar_name: "عمارة للبيع",
    en_name: "Building for sale",
  },
  {
    id: 4,
    ar_name: "بيت للبيع",
    en_name: "House for sale",
  },
  {
    id: 5,
    ar_name: "استراحة للبيع",
    en_name: "Chalet for sale",
  },
  {
    id: 6,
    ar_name: "مزرعة للبيع",
    en_name: "Farm for sale",
  },
  {
    id: 7,
    ar_name: "مستودع للبيع",
    en_name: "Warehouse for sale",
  },
  {
    id: 8,
    ar_name: "شقة للبيع",
    en_name: "Apartment for sale",
  },
  {
    id: 9,
    ar_name: "فيلا للإيجار",
    en_name: "Villa for rent",
  },
  {
    id: 10,
    ar_name: "أرض للإيجار",
    en_name: "Land for rent",
  },
  {
    id: 11,
    ar_name: "عمارة للإيجار",
    en_name: "Building for rent",
  },
  {
    id: 12,
    ar_name: "استراحة للإيجار",
    en_name: "Chalet for rent",
  },
  {
    id: 13,
    ar_name: "مزرعة للإيجار",
    en_name: "Farm for rent",
  },
  {
    id: 14,
    ar_name: "شقة للإيجار",
    en_name: "Apartment for rent",
  },
  {
    id: 15,
    ar_name: "دور للإيجار",
    en_name: "Floor for rent",
  },
  {
    id: 16,
    ar_name: "مكتب للإيجار",
    en_name: "Office for rent",
  },
  {
    id: 17,
    ar_name: "غرفة للإيجار",
    en_name: "Room for rent",
  },
  {
    id: 18,
    ar_name: "محل للإيجار",
    en_name: "Shop for rent",
  },
  {
    id: 19,
    ar_name: "مستودع للإيجار",
    en_name: "Warehouse for rent",
  },
  {
    id: 20,
    ar_name: "مخيم للإيجار",
    en_name: "Camp for rent",
  },
  {
    id: 21,
    ar_name: "محل للتقبيل",
    en_name: "Shop for sale",
  },
];

const CatgouryAds = ({
  formData,
  setFormData,
  selectedCategoryId,
  setSelectedCategoryId,
  selectedType,
  setSelectedType,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [nameError, setNameError] = useState();

  const [selectedCatName, setSelectedCatName] = useState();
  const [selectedCatId, setSelectedCatId] = useState();

  const handleNameChange = (event) => {
    const inputValue = event.target.value;

    // Check if the input value contains only Arabic and English letters
    const pattern = /^[\u0600-\u06FF\sA-Za-z]+$/;
    const isValidInput = pattern.test(inputValue);

    // Check if the input value is empty or contains invalid characters
    if (inputValue.trim() !== "" && isValidInput) {
      setNameError(false);
    } else {
      setNameError(true);
    }

    setFormData((prevFormData) => ({ ...prevFormData, title: inputValue }));
  };

  const handleCategoryChange = (selectedCategory, selectedName) => {
    setSelectedCatName(selectedName);
    if (selectedCategoryId === selectedCategory) {
      setSelectedCategoryId(null); // Unselect the category if it's already selected
    } else {
      setSelectedCategoryId(selectedCategory);
    }

    setSelectedType(""); // Reset the type when a new category is selected
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  useEffect(() => {
    if (!formData.categort_aqar) {
      if (selectedCatName && !selectedType) {
        const filtered = main_array.filter((item) => {
          return selectedCatName === item.en_name;
        });

        if (filtered.length > 0) {
          if (filtered.length > 0) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              category_aqar: filtered["0"],
            }));
          }
        }
      } else if (selectedCatName && selectedType) {
        const filtered = main_array.filter((item) => {
          const [categoryName, forText, itemType] = item.en_name.split(" ");

          if (selectedType) {
            return (
              categoryName === selectedCatName.trim() &&
              forText.toLowerCase() === "for" &&
              itemType.toLowerCase() === selectedType.toLowerCase()
            );
          }

          return (
            categoryName === selectedCatName.trim() &&
            forText.toLowerCase() === "for"
          );
        });

        if (filtered.length > 0) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            category_aqar: filtered["0"],
          }));
        }
      }
    }
  }, [selectedCatName, selectedType]);

  useEffect(() => {
    if (formData.category_aqar) {
      const selectedCatFullName = formData.category_aqar.en_name
        .toLowerCase()
        .split(" ");
      setSelectedCatId(
        categories.filter((item) =>
          item.en_name.toLowerCase().includes(selectedCatFullName["0"])
        )
      );
    }
  }, [formData]);
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          marginBottom: "16px",
          marginTop: "8px",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
        }}
      >
        {t("user_dashboard.new_order.order_info.main_title")}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <label
          htmlFor="my-text-field"
          style={{ fontWeight: "500", marginBottom: "4px" }}
        >
          {t("user_dashboard.new_order.order_info.label1")}
        </label>
        <TextField
          id="my-text-field"
          type="text"
          value={formData.title || ""}
          onChange={handleNameChange}
          size="small"
          error={nameError}
          helperText={nameError ? "الرجاء ادخال اسم عقار صحيح" : ""}
          placeholder={t("user_dashboard.new_order.order_info.placeholder1")}
          sx={{
            width: "100%",
            borderRadius: "12px",
            textAlign: lang === "ar" ? "right" : "left",
            "&[readonly]": {
              backgroundColor: "lightgray",
              color: "darkgray",
            },
          }}
        />
      </Box>
      <Typography sx={{ fontWeight: "500", marginTop: "18px" }}>
        {t("user_dashboard.new_order.order_info.title")}
      </Typography>
      <Typography sx={{ color: "gray", marginTop: "4px" }}>
        {t("user_dashboard.new_order.order_info.desc")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          alignContent: "flex-start",
          gap: "16px",
          flexWrap: "wrap",
          height: "auto",
          marginTop: "16px",
        }}
      >
        {categories.map((category) => (
          <div key={category.id}>
            <Box
              key={category.id}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
                borderRadius: "5px",
                minWidth: "6rem",
                maxWidth: "9rem",
                cursor: "pointer",
                height: "2.5rem",
                backgroundColor:
                  selectedCatId && selectedCatId["0"]?.id === category.id
                    ? "var(--green-color)"
                    : "transparent",
                color:
                  selectedCatId && selectedCatId["0"]?.id === category.id
                    ? "white"
                    : "black",
                border:
                  selectedCatId && selectedCatId["0"]?.id === category.id
                    ? ""
                    : "1px solid gray",
              }}
              onClick={() =>
                handleCategoryChange(category.id, category.en_name)
              }
            >
              <input type="hidden" value={category.id} onChange={() => {}} />
              <Typography sx={{ margin: "auto" }}>
                {i18n.language === "ar" ? category.ar_name : category.en_name}
              </Typography>
            </Box>
            {category.en_name === "Camp for rent" ||
            category.en_name === "Shop for sale" ||
            category.en_name === "House for sale"
              ? ""
              : selectedCategoryId === category.id && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      minWidth: "6rem",
                      maxWidth: "9rem",
                    }}
                  >
                    <Box
                      sx={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "5px",
                        display: "flex",
                        placeItems: "center",
                        cursor: "pointer",
                        backgroundColor: selectedType.includes("sale")
                          ? "var(--green-color)"
                          : "transparent",
                        border: selectedType.includes("sale")
                          ? "0px"
                          : "1px solid gray",
                        transition: "background-color 0.3s, color 0.3s",
                      }}
                      onClick={() => handleTypeChange("sale")}
                    >
                      <input type="hidden" value={1} onChange={() => {}} />

                      <span
                        style={{
                          flex: 1,
                          textAlign: "center",
                          color: selectedType.includes("sale")
                            ? "white"
                            : "black",
                        }}
                      >
                        {lang === "ar" ? "بيع" : "sale"}
                      </span>
                    </Box>
                    <Box
                      sx={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "5px",
                        display: "flex",
                        placeItems: "center",
                        cursor: "pointer",
                        backgroundColor: selectedType.includes("rent")
                          ? "var(--green-color)"
                          : "transparent",
                        border: selectedType.includes("rent")
                          ? "0px"
                          : "1px solid gray",
                        transition: "background-color 0.3s, color 0.3s",
                      }}
                      onClick={() => handleTypeChange("rent")}
                    >
                      <input type="hidden" value={2} onChange={() => {}} />
                      <span
                        style={{
                          flex: 1,
                          textAlign: "center",
                          color: selectedType.includes("rent")
                            ? "white"
                            : "black",
                        }}
                      >
                        {lang === "ar" ? "إيجار" : "Rent"}
                      </span>
                    </Box>
                  </div>
                )}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default CatgouryAds;
