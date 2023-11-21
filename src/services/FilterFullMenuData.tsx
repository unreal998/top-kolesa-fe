type FilterFullMenuDataType = {
  [key: string]: {
    headerTitle: string;
    asideHeader: string;
    text1?: string;
    text2?: string;
    text3?: string;
    parametr?: string;
    textForParametr?: string;
  };
};

export const FilterFullMenuData: FilterFullMenuDataType = {
  Width: {
    headerTitle: "CHOOSE WIDTH",
    asideHeader: "How finding the the tire width?",
    text1:
      "Look at the markings on the already installed tires or in the manual for the car.",
    parametr: "205",
    textForParametr: " is the width value in millimeters.",
  },
  Profile: {
    headerTitle: "CHOOSE PROFILE",
    asideHeader: "How finding the tire profile height?",
    text1:
      "Look at the markings on the already installed tires or in the manual for the car.",
    parametr: "75",
    textForParametr: " is the value of the profile height in percent.",
  },
  Diametr: {
    headerTitle: "CHOOSE DIAMETR",
    asideHeader: "How finding the tire diametr?",
    text1:
      "Look at the markings on the already installed tires or in the manual for the car.",
    parametr: "16",
    textForParametr: " is the diameter value in inches",
  },
  Price: {
    headerTitle: "INDICATE THE PRICE",
    asideHeader: "Do you know how much you are willing to pay for new tires?",
    text1: `Set this parameter with the help of two "sliders" and you will see suitable options.`,
  },
  Season: {
    headerTitle: "CHOOSE SEASON",
    asideHeader:
      "What are the differences between tires for different seasons?",
    text1:
      "Winter tires are intended for use at air temperatures below +5 degrees Celsius.",
    text2:
      "Summer tires are effective in the period when the average daily temperature exceeds +5 degrees Celsius. ",
    text3:
      "All-season tires will be able to provide safety at temperatures not lower than -5 degrees Celsius.",
  },
  Brand: {
    headerTitle: "CHOOSE BRAND",
    asideHeader: "We have products from several hundred brands.",
    text1: "We have products from several hundred brands.",
    text2:
      "All products are certified, covered by an official manufacturer's warranty.",
  },
};
