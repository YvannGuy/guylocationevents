import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState, MouseEvent, FC } from "react";
import { Menu, MenuItem, Button, Box } from "@mui/material";
import Image from "next/image";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { useTransition } from "react";
import { useLocale } from "next-intl";
import { Fragment } from "react";
interface LanguageProps {
  className?: string;
}
const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "France" },
];

const LanguageFooter: FC<LanguageProps> = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const currentLocale = useLocale();
  const open = Boolean(anchorEl);
  const [isPending, startTransition] = useTransition();

  const locale = useLocale();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickChangeLanguage = (lang: string) => {
    const locale = lang as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Button
        onClick={handleClick}
        disabled={isPending}
        sx={{
          color: "#fff",
          border: "1px solid #fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 20px",
          borderRadius: "8px",
          marginTop: "30px",
        }}
        disableFocusRipple
        disableRipple
        fullWidth
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src={`/images/flags/${
              languages.find((item) => item.code == currentLocale)?.code
            }.svg`}
            width={25}
            height={15}
            alt={
              languages.find((item) => item.code == currentLocale)?.label ?? ""
            }
            style={{ marginRight: "10px" }}
          />
          {languages.find((item) => item.code == currentLocale)?.label}
        </Box>
        <KeyboardArrowDownIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {languages.map((item) => (
          <MenuItem
            key={item.code}
            onClick={() => handleClickChangeLanguage(item.code)}
            selected={locale == item.code}
          >
            <Image
              src={`/images/flags/${item.code}.svg`}
              width={20}
              height={18}
              alt={item.label}
              style={{
                marginRight: "7px",
              }}
            />
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};
export default LanguageFooter;
