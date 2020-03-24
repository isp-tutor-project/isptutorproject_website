
export const FONT_SIZES = {
    xxs: "10px",
    xs: "12px",
    sm: "14px",
    md: "16px",
    default: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "36px"
};

const FONT_SIZE_RE = /^\d+px$/;

export const FONT_STYLES = {
    plain: "",
    bold: "bold",
    italic: "italic"
};


export const COLORS = {
    text_default: "#000000",
    text_primary: "blue",
    text_secondary: "yellow",
    text_success: "green",
    text_danger: "red",
    text_warn: "orange",
    text_info: "gray",
    bg_default: "#FFFFFF",
    bg_primary: "lightblue",
    bg_secondary: "lightyellow",
    bg_success: "lightgreen",
    bg_danger: "lightred",
    bg_warn: "pink",
    bg_info: "lightgray",
    btn_default: "gray",
    btn_primary: "blue",
    btn_secondary: "yellow",
    btn_success: "green",
    btn_danger: "red",
    btn_warn: "pink",
    bg_info: "gray"
};

function lookupPrefixedColor(colorType, requestedColor, prefixedColor, defaultColor) {
     if (!COLORS.hasOwnProperty(prefixedColor)) {
        console.warn(
            `${colorType} color "${requestedColor}" not in style guide. ` +
            `Using default ${colorType} color`);
        return COLORS[defaultColor];
    } 
    return COLORS[prefixedColor];
}

export function getFontColor(colorName) {
    return lookupPrefixedColor(
        "font", colorName, `text_${colorName}`, 'text_default'
    );
}

export function getButtonColor(colorName) {
    return lookupPrefixedColor(
        "button", colorName, `btn_${colorName}`, 'btn_default'
    );
}


export function getFont(size, style = "", face = "Arial") {
    if (!FONT_SIZES.hasOwnProperty(size)) {
        if (!FONT_SIZE_RE.test(size)) {
            console.error(`font size (${size}) should be in format <num>px. using default font size`);
            size = FONT_SIZES.default;
        } else {
            console.log(`WARNING: using font size not in style guide: ${size}`);
        }
    } else {
        size = FONT_SIZES[size];
    }
    if ("" !== style) {
        if (!FONT_STYLES.hasOwnProperty(style)) {
            console.log(`WARNING: ignoring invalid font style ${style}`);
            style = "";
        } else {
            style = FONT_STYLES[style];
        }
    }
    return `${style} ${size} ${face}`;
}
